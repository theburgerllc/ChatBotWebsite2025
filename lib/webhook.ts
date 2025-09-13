import crypto from 'crypto';

/**
 * Webhook Signature Verification
 * Provides secure verification of incoming webhook payloads
 */

/**
 * Verify webhook signature using HMAC-SHA256
 * @param payload - Raw request body as string
 * @param signature - Signature from webhook header
 * @param secret - Webhook secret key
 * @returns Boolean indicating if signature is valid
 */
export function verifyWebhookSignature(
  payload: string,
  signature: string,
  secret: string
): boolean {
  if (!payload || !signature || !secret) {
    return false;
  }

  try {
    // Calculate expected signature
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(payload, 'utf8')
      .digest('hex');

    // Use timing-safe comparison to prevent timing attacks
    return crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSignature)
    );
  } catch (error) {
    console.error('Webhook signature verification error:', error);
    return false;
  }
}

/**
 * Verify Tavus webhook signature with enhanced security
 * Tavus sends the signature in the 'x-tavus-signature' header
 * @param payload - Raw request body
 * @param signature - Signature from x-tavus-signature header
 * @param timestamp - Optional timestamp from webhook headers
 * @returns Object with verification result and details
 */
export function verifyTavusWebhook(
  payload: string,
  signature: string | null,
  timestamp?: string | null
): {
  valid: boolean;
  reason?: string;
  details?: any;
} {
  const secret = process.env.TAVUS_WEBHOOK_SECRET;

  if (!secret) {
    if (process.env.NODE_ENV === 'production') {
      console.error('TAVUS_WEBHOOK_SECRET not configured in production');
      return { valid: false, reason: 'webhook_secret_not_configured' };
    }
    console.warn('TAVUS_WEBHOOK_SECRET not configured - webhook verification disabled in development');
    return { valid: true, reason: 'development_mode' };
  }

  if (!signature) {
    console.error('No signature provided in webhook request');
    return { valid: false, reason: 'missing_signature' };
  }

  // Verify timestamp to prevent replay attacks (if provided)
  if (timestamp) {
    const isValidTimestamp = verifyWebhookTimestamp(timestamp, 300); // 5 minutes tolerance
    if (!isValidTimestamp) {
      console.error('Webhook timestamp validation failed', { timestamp });
      return { valid: false, reason: 'invalid_timestamp', details: { timestamp } };
    }
  }

  // Remove any 'sha256=' prefix if present
  const cleanSignature = signature.replace(/^sha256=/, '');

  const isValidSignature = verifyWebhookSignature(payload, cleanSignature, secret);

  if (!isValidSignature) {
    console.error('Webhook signature verification failed');
    return { valid: false, reason: 'invalid_signature' };
  }

  return { valid: true };
}

/**
 * Extract and verify webhook timestamp to prevent replay attacks
 * @param timestamp - Timestamp from webhook headers or payload
 * @param maxAgeSeconds - Maximum age of webhook in seconds (default 5 minutes)
 * @returns Boolean indicating if timestamp is valid
 */
export function verifyWebhookTimestamp(
  timestamp: string | number,
  maxAgeSeconds: number = 300
): boolean {
  try {
    const webhookTime = typeof timestamp === 'string' 
      ? parseInt(timestamp, 10) 
      : timestamp;
    
    if (isNaN(webhookTime)) {
      return false;
    }

    const currentTime = Math.floor(Date.now() / 1000);
    const timeDiff = Math.abs(currentTime - webhookTime);

    return timeDiff <= maxAgeSeconds;
  } catch (error) {
    console.error('Webhook timestamp verification error:', error);
    return false;
  }
}

/**
 * Webhook event types we handle
 */
export enum WebhookEventType {
  CONVERSATION_STARTED = 'conversation.started',
  CONVERSATION_ENDED = 'conversation.ended',
  CONVERSATION_JOINED = 'conversation.joined',
  CONVERSATION_LEFT = 'conversation.left',
  CONVERSATION_TRANSCRIPT_READY = 'conversation.transcript_ready',
  CONVERSATION_RECORDING_READY = 'conversation.recording_ready',
  CONVERSATION_SUMMARY_READY = 'conversation.summary_ready',
  UTTERANCE = 'utterance',
  PERCEPTION_TOOL_CALL = 'perception_tool_call',
  RECORDING_READY = 'recording.ready',
  ERROR = 'error',
  // Legacy event types without prefix
  JOINED = 'joined',
  LEFT = 'left',
  TRANSCRIPT_READY = 'transcript_ready',
  RECORDING_READY_LEGACY = 'recording_ready',
  SUMMARY_READY = 'summary_ready',
}

/**
 * Parse and validate webhook payload
 * @param payload - Raw webhook payload
 * @returns Parsed and validated payload or null if invalid
 */
export function parseWebhookPayload(payload: any): {
  event_type: WebhookEventType;
  conversation_id: string;
  timestamp: string;
  data: any;
} | null {
  try {
    // Validate required fields
    if (!payload.event_type || !payload.conversation_id) {
      console.error('Invalid webhook payload: missing required fields');
      return null;
    }

    // Ensure event_type is valid
    const validEventTypes = Object.values(WebhookEventType);
    if (!validEventTypes.includes(payload.event_type)) {
      console.warn(`Unknown webhook event type: ${payload.event_type}`);
    }

    return {
      event_type: payload.event_type,
      conversation_id: payload.conversation_id,
      timestamp: payload.timestamp || new Date().toISOString(),
      data: payload,
    };
  } catch (error) {
    console.error('Failed to parse webhook payload:', error);
    return null;
  }
}

/**
 * Generate a webhook signature for testing
 * @param payload - Payload to sign
 * @param secret - Secret key
 * @returns Signature string
 */
export function generateWebhookSignature(
  payload: string,
  secret: string
): string {
  return crypto
    .createHmac('sha256', secret)
    .update(payload, 'utf8')
    .digest('hex');
}
