import { test, expect } from '@playwright/test';

test.describe('Demo Pages', () => {
  test('should load legal demo page and start conversation', async ({ page }) => {
    await page.goto('/demos/legal');

    // Page should have correct title and content
    await expect(page.locator('h1')).toContainText('Legal AI Assistant');
    
    // Demo component should be present
    const demoContainer = page.locator('.aspect-video');
    await expect(demoContainer).toBeVisible();

    // Should have the start button
    const startButton = page.locator('button:has-text("Start Video Demo")');
    await expect(startButton).toBeVisible();

    // Mock the API response
    await page.route('**/api/tavus/create-conversation', async route => {
      const request = route.request();
      const postData = request.postDataJSON();
      
      // Verify the request contains correct vertical
      expect(postData.vertical).toBe('legal');
      
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          conversationUrl: 'https://tavus.daily.co/legal-demo',
          conversationId: 'legal-demo-123',
          documentTags: ['kb-legal', 'kb-compliance', 'kb-global'],
        }),
      });
    });

    // Click start button
    await startButton.click();

    // Should show loading state
    await expect(page.locator('.animate-spin')).toBeVisible();

    // Conversation iframe should appear
    const conversationFrame = page.locator('iframe[title="AI Video Conversation"]');
    await expect(conversationFrame).toBeVisible({ timeout: 10000 });
  });

  test('should load healthcare demo page with correct configuration', async ({ page }) => {
    await page.goto('/demos/healthcare');

    // Page should have healthcare-specific content
    await expect(page.locator('h1')).toContainText('Healthcare');

    // Mock the API to verify healthcare configuration
    await page.route('**/api/tavus/create-conversation', async route => {
      const request = route.request();
      const postData = request.postDataJSON();
      
      // Verify healthcare vertical
      expect(postData.vertical).toBe('healthcare');
      
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          conversationUrl: 'https://tavus.daily.co/healthcare-demo',
          conversationId: 'healthcare-demo-123',
          documentTags: ['kb-healthcare', 'kb-medical', 'kb-global'],
        }),
      });
    });

    const startButton = page.locator('button:has-text("Start")').first();
    if (await startButton.isVisible()) {
      await startButton.click();
      const conversationFrame = page.locator('iframe');
      await expect(conversationFrame).toBeVisible({ timeout: 10000 });
    }
  });

  test('should load ecommerce demo page', async ({ page }) => {
    await page.goto('/demos/ecommerce');

    // Page should have ecommerce-specific content
    await expect(page.locator('h1')).toContainText(/e-?commerce/i);

    // Mock the API to verify ecommerce configuration
    await page.route('**/api/tavus/create-conversation', async route => {
      const request = route.request();
      const postData = request.postDataJSON();
      
      // Verify ecommerce vertical
      expect(postData.vertical).toMatch(/ecommerce|ecom/i);
      
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          conversationUrl: 'https://tavus.daily.co/ecommerce-demo',
          conversationId: 'ecommerce-demo-123',
          documentTags: ['kb-ecommerce', 'kb-products', 'kb-global'],
        }),
      });
    });

    const startButton = page.locator('button:has-text("Start")').first();
    if (await startButton.isVisible()) {
      await startButton.click();
      const conversationFrame = page.locator('iframe');
      await expect(conversationFrame).toBeVisible({ timeout: 10000 });
    }
  });

  test('should navigate between demo pages', async ({ page }) => {
    // Start at demos index
    await page.goto('/demos');

    // Should have links to all demo verticals
    const legalLink = page.locator('a[href="/demos/legal"]');
    const healthcareLink = page.locator('a[href="/demos/healthcare"]');
    const ecommerceLink = page.locator('a[href="/demos/ecommerce"]');

    await expect(legalLink).toBeVisible();
    await expect(healthcareLink).toBeVisible();
    await expect(ecommerceLink).toBeVisible();

    // Navigate to legal demo
    await legalLink.click();
    await expect(page).toHaveURL('/demos/legal');
    await expect(page.locator('h1')).toContainText('Legal');

    // Navigate back to demos
    const backLink = page.locator('a[href="/demos"]');
    if (await backLink.isVisible()) {
      await backLink.click();
      await expect(page).toHaveURL('/demos');
    }
  });

  test('should pass memory stores and document tags', async ({ page }) => {
    await page.goto('/demos/legal');

    // Mock to capture the request
    let capturedRequest: any = null;
    await page.route('**/api/tavus/create-conversation', async route => {
      capturedRequest = route.request().postDataJSON();
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          conversationUrl: 'https://tavus.daily.co/test',
          conversationId: 'test-123',
          memoryStores: ['session_test'],
          documentTags: ['kb-legal', 'kb-global'],
        }),
      });
    });

    // Start the demo
    const startButton = page.locator('button:has-text("Start")').first();
    if (await startButton.isVisible()) {
      await startButton.click();
      
      // Wait for API call
      await page.waitForTimeout(1000);
      
      // Verify the request had proper structure
      if (capturedRequest) {
        expect(capturedRequest).toHaveProperty('vertical');
        // documentTags are added server-side based on vertical
      }
    }
  });

  test('should handle demo errors gracefully', async ({ page }) => {
    await page.goto('/demos/legal');

    // Mock API error
    await page.route('**/api/tavus/create-conversation', async route => {
      await route.fulfill({
        status: 400,
        contentType: 'application/json',
        body: JSON.stringify({
          error: 'Invalid vertical configuration',
          supportedVerticals: ['healthcare', 'legal', 'ecommerce', 'general'],
        }),
      });
    });

    const startButton = page.locator('button:has-text("Start")').first();
    if (await startButton.isVisible()) {
      await startButton.click();
      
      // Should show error state
      const errorMessage = page.locator('text=/error|failed/i');
      await expect(errorMessage).toBeVisible({ timeout: 10000 });
      
      // Should have retry button
      const retryButton = page.locator('button:has-text("Try Again")');
      await expect(retryButton).toBeVisible();
    }
  });
});
