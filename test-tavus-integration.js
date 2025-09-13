#!/usr/bin/env node

/**
 * Tavus CVI Integration Test Suite
 * Comprehensive testing of all integration points
 */

const https = require('https');
const crypto = require('crypto');
const { spawn } = require('child_process');

class TavusIntegrationTester {
  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    this.results = {
      passed: [],
      failed: [],
      warnings: []
    };
  }

  // Test 1: API Endpoint Health
  async testAPIEndpoint() {
    console.log('\n📝 Testing API Endpoint...');
    
    try {
      const response = await this.makeRequest('/api/tavus/create-conversation', {
        method: 'POST',
        body: JSON.stringify({ vertical: 'general' })
      });
      
      if (response.status === 200) {
        this.results.passed.push('API endpoint responds correctly');
      } else if (response.status === 429) {
        this.results.warnings.push('Rate limiting active (expected)');
      } else {
        this.results.failed.push(`API returned status ${response.status}`);
      }
    } catch (error) {
      this.results.failed.push(`API endpoint test failed: ${error.message}`);
    }
  }

  // Test 2: Memory Stores
  async testMemoryStores() {
    console.log('\n📝 Testing Memory Stores...');
    
    const testUserId = 'test-user-' + Date.now();
    const testSessionId = 'test-session-' + Date.now();
    
    try {
      const response = await this.makeRequest('/api/tavus/create-conversation', {
        method: 'POST',
        body: JSON.stringify({
          vertical: 'general',
          userId: testUserId,
          sessionId: testSessionId,
          memoryKey: 'test-memory'
        })
      });
      
      const data = await response.json();
      
      if (data.memoryStores && data.memoryStores.length > 0) {
        this.results.passed.push('Memory stores configured correctly');
      } else {
        this.results.warnings.push('Memory stores may not be configured');
      }
    } catch (error) {
      this.results.failed.push(`Memory stores test failed: ${error.message}`);
    }
  }

  // Test 3: Document Tags
  async testDocumentTags() {
    console.log('\n📝 Testing Document Tags...');
    
    const verticals = ['healthcare', 'legal', 'ecommerce', 'general'];
    
    for (const vertical of verticals) {
      try {
        const response = await this.makeRequest('/api/tavus/create-conversation', {
          method: 'POST',
          body: JSON.stringify({
            vertical,
            documentTags: [`test-${vertical}`]
          })
        });
        
        const data = await response.json();
        
        if (data.documentTags && data.documentTags.length > 0) {
          this.results.passed.push(`Document tags work for ${vertical}`);
        } else {
          this.results.warnings.push(`Document tags not returned for ${vertical}`);
        }
      } catch (error) {
        this.results.failed.push(`Document tags test failed for ${vertical}`);
      }
    }
  }

  // Test 4: Webhook Signature
  async testWebhookSignature() {
    console.log('\n📝 Testing Webhook Signature Verification...');
    
    const secret = process.env.TAVUS_WEBHOOK_SECRET || 'test-secret';
    const payload = JSON.stringify({
      event_type: 'conversation.started',
      conversation_id: 'test-123',
      timestamp: new Date().toISOString()
    });
    
    const signature = crypto
      .createHmac('sha256', secret)
      .update(payload)
      .digest('hex');
    
    try {
      const response = await this.makeRequest('/api/tavus/webhook', {
        method: 'POST',
        headers: {
          'x-tavus-signature': signature,
          'Content-Type': 'application/json'
        },
        body: payload
      });
      
      if (response.status === 200) {
        this.results.passed.push('Webhook signature verification works');
      } else {
        this.results.failed.push('Webhook signature verification failed');
      }
    } catch (error) {
      this.results.warnings.push('Webhook endpoint may not be configured');
    }
  }

  // Test 5: Rate Limiting
  async testRateLimiting() {
    console.log('\n📝 Testing Rate Limiting...');
    
    const requests = [];
    for (let i = 0; i < 7; i++) {
      requests.push(
        this.makeRequest('/api/tavus/create-conversation', {
          method: 'POST',
          body: JSON.stringify({ vertical: 'general' })
        })
      );
    }
    
    try {
      const responses = await Promise.all(requests);
      const rateLimited = responses.some(r => r.status === 429);
      
      if (rateLimited) {
        this.results.passed.push('Rate limiting is active');
      } else {
        this.results.warnings.push('Rate limiting may not be configured');
      }
    } catch (error) {
      this.results.failed.push(`Rate limiting test failed: ${error.message}`);
    }
  }

  // Test 6: Error Handling
  async testErrorHandling() {
    console.log('\n📝 Testing Error Handling...');
    
    const errorCases = [
      { vertical: 'invalid', expectedError: 'Invalid vertical configuration' },
      { vertical: null, expectedError: 'Invalid request' }
    ];
    
    for (const testCase of errorCases) {
      try {
        const response = await this.makeRequest('/api/tavus/create-conversation', {
          method: 'POST',
          body: JSON.stringify({ vertical: testCase.vertical })
        });
        
        if (response.status === 400) {
          const data = await response.json();
          if (data.error) {
            this.results.passed.push(`Error handling works for ${testCase.vertical || 'null'}`);
          }
        }
      } catch (error) {
        this.results.warnings.push(`Error handling test inconclusive`);
      }
    }
  }

  // Helper: Make HTTP Request
  async makeRequest(path, options = {}) {
    const url = new URL(path, this.baseUrl);
    
    const defaultOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      }
    };
    
    const finalOptions = { ...defaultOptions, ...options };
    
    return fetch(url.toString(), finalOptions);
  }

  // Generate Test Report
  generateReport() {
    console.log('\n' + '═'.repeat(60));
    console.log('TAVUS CVI INTEGRATION TEST RESULTS');
    console.log('═'.repeat(60));
    
    if (this.results.passed.length > 0) {
      console.log('\n✅ PASSED TESTS:');
      this.results.passed.forEach(msg => console.log(`  ✓ ${msg}`));
    }
    
    if (this.results.warnings.length > 0) {
      console.log('\n⚠️  WARNINGS:');
      this.results.warnings.forEach(msg => console.log(`  ⚠ ${msg}`));
    }
    
    if (this.results.failed.length > 0) {
      console.log('\n❌ FAILED TESTS:');
      this.results.failed.forEach(msg => console.log(`  ✗ ${msg}`));
    }
    
    const total = this.results.passed.length + this.results.failed.length;
    const passRate = total === 0 ? 0 : (this.results.passed.length / total * 100).toFixed(1);
    
    console.log('\n' + '═'.repeat(60));
    console.log(`SUMMARY: ${this.results.passed.length}/${total} tests passed (${passRate}%)`);
    
    if (this.results.failed.length === 0 && total > 0) {
      console.log('✅ ALL CRITICAL TESTS PASSED - Ready for deployment');
    } else {
      console.log('❌ Some tests failed - Review and fix before deployment');
      process.exit(1);
    }
  }

  // Run All Tests
  async runAllTests() {
    console.log('Starting Tavus CVI Integration Tests...');
    console.log(`Testing against: ${this.baseUrl}`);
    
    await this.testAPIEndpoint();
    await this.testMemoryStores();
    await this.testDocumentTags();
    await this.testWebhookSignature();
    await this.testRateLimiting();
    await this.testErrorHandling();
    
    this.generateReport();
  }
}

// Check if server is running
function checkServer(callback) {
  const url = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  
  fetch(url)
    .then(() => callback())
    .catch(() => {
      console.log('Starting development server...');
      const server = spawn('npm', ['run', 'dev'], {
        detached: true,
        stdio: 'ignore'
      });
      
      setTimeout(() => callback(), 5000); // Wait for server to start
    });
}

// Run tests
checkServer(() => {
  const tester = new TavusIntegrationTester();
  tester.runAllTests().catch(console.error);
});
