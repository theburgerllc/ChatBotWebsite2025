import { test, expect } from '@playwright/test';

test.describe('Video Chat Widget', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the video chat widget on homepage', async ({ page }) => {
    // Wait for the widget to appear
    const widget = page.locator('[aria-label="Open video chat"]');
    await expect(widget).toBeVisible({ timeout: 10000 });
    
    // Check widget has correct styling (floating button)
    await expect(widget).toHaveClass(/fixed bottom-6 right-6/);
  });

  test('should open video chat modal when widget is clicked', async ({ page }) => {
    // Mock the API response
    await page.route('**/api/tavus/create-conversation', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          conversationUrl: 'https://tavus.daily.co/test-conversation',
          conversationId: 'test-conversation-123',
          requestId: 'req-123',
        }),
      });
    });

    // Click the widget
    const widget = page.locator('[aria-label="Open video chat"]');
    await widget.click();

    // Wait for loading state
    await expect(widget.locator('.animate-spin')).toBeVisible();

    // Check that modal opens
    const modal = page.locator('.fixed.inset-0');
    await expect(modal).toBeVisible({ timeout: 10000 });

    // Check modal contains conversation iframe
    const conversationFrame = modal.locator('iframe[title="AI Video Conversation"]');
    await expect(conversationFrame).toBeVisible();
    await expect(conversationFrame).toHaveAttribute('src', 'https://tavus.daily.co/test-conversation');
  });

  test('should close modal when close button is clicked', async ({ page }) => {
    // Mock the API response
    await page.route('**/api/tavus/create-conversation', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          conversationUrl: 'https://tavus.daily.co/test-conversation',
          conversationId: 'test-conversation-123',
        }),
      });
    });

    // Open the modal
    const widget = page.locator('[aria-label="Open video chat"]');
    await widget.click();

    // Wait for modal to open
    const modal = page.locator('.fixed.inset-0');
    await expect(modal).toBeVisible();

    // Click close button
    const closeButton = modal.locator('[aria-label="Close"]');
    await closeButton.click();

    // Modal should be hidden
    await expect(modal).not.toBeVisible();
    
    // Widget should be visible again
    await expect(widget).toBeVisible();
  });

  test('should handle API errors gracefully', async ({ page }) => {
    // Mock API failure
    await page.route('**/api/tavus/create-conversation', async route => {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({
          error: 'Internal Server Error',
          requestId: 'req-failed-123',
        }),
      });
    });

    // Click the widget
    const widget = page.locator('[aria-label="Open video chat"]');
    await widget.click();

    // Wait for error message
    const errorMessage = page.locator('.fixed.bottom-24.right-6');
    await expect(errorMessage).toBeVisible({ timeout: 10000 });
    await expect(errorMessage).toContainText('Unable to start video chat');

    // Check retry button is present
    const retryButton = errorMessage.locator('button:has-text("Try Again")');
    await expect(retryButton).toBeVisible();
  });

  test('should handle rate limiting with appropriate message', async ({ page }) => {
    // Mock rate limit response
    await page.route('**/api/tavus/create-conversation', async route => {
      await route.fulfill({
        status: 429,
        contentType: 'application/json',
        body: JSON.stringify({
          error: 'Too Many Requests',
          retryAfter: 60,
        }),
      });
    });

    // Click the widget
    const widget = page.locator('[aria-label="Open video chat"]');
    await widget.click();

    // Check for rate limit error message
    const errorMessage = page.locator('.fixed.bottom-24.right-6');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('Too many requests');
  });

  test('should be accessible with keyboard navigation', async ({ page }) => {
    // Tab to the widget
    await page.keyboard.press('Tab');
    
    // The widget should be focused
    const widget = page.locator('[aria-label="Open video chat"]');
    await expect(widget).toBeFocused();

    // Press Enter to open
    await page.keyboard.press('Enter');

    // Mock the API response
    await page.route('**/api/tavus/create-conversation', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          conversationUrl: 'https://tavus.daily.co/test-conversation',
          conversationId: 'test-conversation-123',
        }),
      });
    });

    // Modal should open
    const modal = page.locator('.fixed.inset-0');
    await expect(modal).toBeVisible({ timeout: 10000 });
  });
});
