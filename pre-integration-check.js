#!/usr/bin/env node

/**
 * Pre-Integration Validation Script
 * Run this before starting Tavus CVI integration
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const REQUIRED_ENV_VARS = [
  'TAVUS_API_KEY',
  'TAVUS_PERSONA_ID_GENERAL',
  'TAVUS_REPLICA_ID_GENERAL',
  'STRIPE_SECRET_KEY',
  'SENDGRID_API_KEY'
];

const REQUIRED_FILES = [
  'app/api/tavus/create-conversation/route.ts',
  'components/VideoChatWidget.tsx',
  'components/cvi/conversation.tsx'
];

const MIN_NODE_VERSION = '20.0.0';

class IntegrationValidator {
  constructor() {
    this.errors = [];
    this.warnings = [];
    this.info = [];
  }

  checkNodeVersion() {
    const currentVersion = process.version.replace('v', '');
    if (this.compareVersions(currentVersion, MIN_NODE_VERSION) < 0) {
      this.errors.push(`Node.js version ${currentVersion} is below minimum ${MIN_NODE_VERSION}`);
    } else {
      this.info.push(`✓ Node.js version ${currentVersion} meets requirements`);
    }
  }

  checkEnvironmentVariables() {
    const envPath = path.join(process.cwd(), '.env.local');
    const envExamplePath = path.join(process.cwd(), '.env.example');
    
    if (!fs.existsSync(envPath) && !fs.existsSync('.env')) {
      this.warnings.push('No .env.local file found - using example for reference');
    }

    const envContent = fs.existsSync(envPath) 
      ? fs.readFileSync(envPath, 'utf8')
      : fs.existsSync('.env') 
        ? fs.readFileSync('.env', 'utf8')
        : '';

    REQUIRED_ENV_VARS.forEach(varName => {
      if (!envContent.includes(varName)) {
        this.errors.push(`Missing required environment variable: ${varName}`);
      } else {
        this.info.push(`✓ ${varName} configured`);
      }
    });
  }

  checkRequiredFiles() {
    REQUIRED_FILES.forEach(file => {
      const filePath = path.join(process.cwd(), file);
      if (!fs.existsSync(filePath)) {
        this.errors.push(`Missing required file: ${file}`);
      } else {
        this.info.push(`✓ Found ${file}`);
      }
    });
  }

  checkDependencies() {
    try {
      const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
      const deps = { ...packageJson.dependencies, ...packageJson.devDependencies };
      
      // Check for conflicting packages
      if (deps['@daily-co/daily-js'] && !deps['@tavus/cvi-ui']) {
        this.warnings.push('Daily.js installed but @tavus/cvi-ui not found - will be added');
      }
      
      // Check Next.js version
      if (deps['next']) {
        const nextVersion = deps['next'].replace(/[\^~]/, '');
        this.info.push(`✓ Next.js version: ${nextVersion}`);
      }
      
      // Check for TypeScript
      if (!deps['typescript']) {
        this.errors.push('TypeScript not installed');
      } else {
        this.info.push('✓ TypeScript configured');
      }
    } catch (error) {
      this.errors.push(`Failed to read package.json: ${error.message}`);
    }
  }

  checkBuildStatus() {
    try {
      console.log('Running build check (this may take a moment)...');
      execSync('npm run typecheck', { stdio: 'pipe' });
      this.info.push('✓ TypeScript compilation successful');
    } catch (error) {
      this.warnings.push('TypeScript errors detected - will be fixed during integration');
    }
  }

  compareVersions(v1, v2) {
    const parts1 = v1.split('.').map(Number);
    const parts2 = v2.split('.').map(Number);
    
    for (let i = 0; i < Math.max(parts1.length, parts2.length); i++) {
      const part1 = parts1[i] || 0;
      const part2 = parts2[i] || 0;
      
      if (part1 > part2) return 1;
      if (part1 < part2) return -1;
    }
    
    return 0;
  }

  async testTavusAPI() {
    const envPath = path.join(process.cwd(), '.env.local');
    if (!fs.existsSync(envPath)) {
      this.warnings.push('Cannot test Tavus API - no .env.local file');
      return;
    }

    const envContent = fs.readFileSync(envPath, 'utf8');
    const apiKeyMatch = envContent.match(/TAVUS_API_KEY=(.+)/);
    
    if (!apiKeyMatch) {
      this.warnings.push('Cannot test Tavus API - API key not found');
      return;
    }

    const apiKey = apiKeyMatch[1].trim();
    
    try {
      const response = await fetch('https://tavusapi.com/v2/personas', {
        headers: { 'x-api-key': apiKey }
      });
      
      if (response.ok) {
        this.info.push('✓ Tavus API key is valid');
      } else {
        this.errors.push(`Tavus API key validation failed: ${response.status}`);
      }
    } catch (error) {
      this.warnings.push('Could not validate Tavus API key - check network connection');
    }
  }

  generateReport() {
    console.log('\n' + '='.repeat(60));
    console.log('TAVUS CVI INTEGRATION PRE-CHECK REPORT');
    console.log('='.repeat(60));
    
    if (this.info.length > 0) {
      console.log('\n✅ PASSED CHECKS:');
      this.info.forEach(msg => console.log(`  ${msg}`));
    }
    
    if (this.warnings.length > 0) {
      console.log('\n⚠️  WARNINGS:');
      this.warnings.forEach(msg => console.log(`  ${msg}`));
    }
    
    if (this.errors.length > 0) {
      console.log('\n❌ ERRORS (must fix before integration):');
      this.errors.forEach(msg => console.log(`  ${msg}`));
    }
    
    console.log('\n' + '='.repeat(60));
    
    if (this.errors.length === 0) {
      console.log('✅ READY FOR INTEGRATION');
      console.log('\nNext steps:');
      console.log('1. Run: npx @tavus/cvi-ui@latest init');
      console.log('2. Run: npx @tavus/cvi-ui@latest add conversation');
      console.log('3. Apply the integration changes');
    } else {
      console.log('❌ NOT READY - Fix errors above first');
      process.exit(1);
    }
  }

  async run() {
    console.log('Starting pre-integration validation...\n');
    
    this.checkNodeVersion();
    this.checkEnvironmentVariables();
    this.checkRequiredFiles();
    this.checkDependencies();
    this.checkBuildStatus();
    await this.testTavusAPI();
    
    this.generateReport();
  }
}

// Run validation
const validator = new IntegrationValidator();
validator.run().catch(console.error);
