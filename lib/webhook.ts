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
 * Verify Tavus webhook signature
 * Tavus sends the signature in the 'x-tavus-signature' header
 * @param payload - Raw request body
 * @param signature - Signature from x-tavus-signature header
 * @returns Boolean indicating if signature is valid
 */
export function verifyTavusWebhook(
  payload: string,
  signature: string | null
): boolean {
  const secret = process.env.TAVUS_WEBHOOK_SECRET;
  
  if (!secret) {
    console.warn('TAVUS_WEBHOOK_SECRET not configured - webhook verification disabled');
    return true; // Allow in development if secret not set
  }

  if (!signature) {
    console.error('No signature provided in webhook request');
    return false;
  }

  // Remove any 'sha256=' prefix if present
  const cleanSignature = signature.replace(/^sha256=/, '');
  
  return verifyWebhookSignature(payload, cleanSignature, secret);
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
  UTTERANCE = 'utterance',
  PERCEPTION_TOOL_CALL = 'perception_tool_call',
  RECORDING_READY = 'recording.ready',
  ERROR = 'error',
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
