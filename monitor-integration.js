#!/usr/bin/env node

/**
 * Real-time Tavus Integration Monitor
 * Tracks conversation metrics and health
 */

const EventSource = require('eventsource');

class TavusMonitor {
  constructor() {
    this.stats = {
      conversationsStarted: 0,
      conversationsEnded: 0,
      errors: 0,
      avgDuration: 0,
      activeConversations: new Set()
    };
  }

  startMonitoring() {
    console.log('Starting Tavus Integration Monitor...');
    console.log('Press Ctrl+C to stop\n');
    
    // Monitor API endpoint
    setInterval(() => this.checkHealth(), 30000);
    
    // Display stats
    setInterval(() => this.displayStats(), 5000);
    
    // Initial check
    this.checkHealth();
  }

  async checkHealth() {
    try {
      const response = await fetch('http://localhost:3000/api/health');
      if (response.ok) {
        console.log('✅ API Health: OK');
      } else {
        console.log('⚠️  API Health: Degraded');
        this.stats.errors++;
      }
    } catch (error) {
      console.log('❌ API Health: Failed');
      this.stats.errors++;
    }
  }

  displayStats() {
    console.clear();
    console.log('TAVUS INTEGRATION MONITOR');
    console.log('═'.repeat(40));
    console.log(`Conversations Started:  ${this.stats.conversationsStarted}`);
    console.log(`Conversations Ended:    ${this.stats.conversationsEnded}`);
    console.log(`Currently Active:       ${this.stats.activeConversations.size}`);
    console.log(`Errors:                 ${this.stats.errors}`);
    console.log(`Avg Duration:           ${this.stats.avgDuration}s`);
    console.log('═'.repeat(40));
    console.log('Last Update:', new Date().toLocaleTimeString());
  }
}

const monitor = new TavusMonitor();
monitor.startMonitoring();
