#!/bin/bash

# Tavus CVI Integration Helper Script
# Automates the integration process with safety checks

set -e

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${GREEN}Starting Tavus CVI Integration Helper${NC}"

# Step 1: Create backup branch
echo -e "\n${YELLOW}Step 1: Creating backup branch${NC}"
BRANCH_NAME="tavus-integration-$(date +%Y%m%d-%H%M%S)"
git checkout -b $BRANCH_NAME
echo -e "${GREEN}✓ Created backup branch: $BRANCH_NAME${NC}"

# Step 2: Create required directories
echo -e "\n${YELLOW}Step 2: Creating required directories${NC}"
mkdir -p app/providers
mkdir -p components/cvi/components
mkdir -p lib/tavus
mkdir -p scripts/testing
echo -e "${GREEN}✓ Directories created${NC}"

# Step 3: Backup critical files
echo -e "\n${YELLOW}Step 3: Backing up critical files${NC}"
mkdir -p .backup
[ -d app/api/tavus ] && cp -r app/api/tavus .backup/tavus-api-backup || true
[ -d components/cvi ] && cp -r components/cvi .backup/cvi-components-backup || true
[ -f package.json ] && cp package.json .backup/package.json.backup || true
echo -e "${GREEN}✓ Backup created in .backup directory${NC}"

# Step 4: Initialize Tavus CVI
echo -e "\n${YELLOW}Step 4: Initializing Tavus CVI Library${NC}"
if command -v npx &> /dev/null; then
    npx @tavus/cvi-ui@latest init
    echo -e "${GREEN}✓ Tavus CVI initialized${NC}"
    
    echo -e "\n${YELLOW}Adding Conversation component${NC}"
    npx @tavus/cvi-ui@latest add conversation
    echo -e "${GREEN}✓ Conversation component added${NC}"
else
    echo -e "${RED}Error: npx not found. Please install Node.js${NC}"
    exit 1
fi

# Step 5: Create integration config file
echo -e "\n${YELLOW}Step 5: Creating integration config${NC}"
cat > tavus-integration.config.json << EOF
{
  "version": "1.0.0",
  "integration_date": "$(date -Iseconds)",
  "verticals": {
    "healthcare": {
      "enabled": true,
      "document_tags": ["kb-healthcare", "kb-medical", "kb-global"],
      "memory_retention_days": 30
    },
    "legal": {
      "enabled": true,
      "document_tags": ["kb-legal", "kb-compliance", "kb-global"],
      "memory_retention_days": 90
    },
    "ecommerce": {
      "enabled": true,
      "document_tags": ["kb-ecommerce", "kb-products", "kb-global"],
      "memory_retention_days": 7
    },
    "general": {
      "enabled": true,
      "document_tags": ["kb-global"],
      "memory_retention_days": 14
    }
  },
  "features": {
    "memory_stores": true,
    "document_tags": true,
    "webhook_verification": true,
    "rate_limiting": {
      "enabled": true,
      "requests_per_minute": 5,
      "burst_size": 10
    }
  },
  "testing": {
    "mock_mode": false,
    "verbose_logging": true
  }
}
EOF
echo -e "${GREEN}✓ Configuration created${NC}"

# Step 6: Generate TypeScript types
echo -e "\n${YELLOW}Step 6: Generating TypeScript types${NC}"
cat > lib/tavus/types.ts << 'EOF'
// Tavus CVI Type Definitions
export interface TavusConversationConfig {
  vertical: 'healthcare' | 'legal' | 'ecommerce' | 'general';
  memoryKey?: string;
  sessionId?: string;
  userId?: string;
  documentTags?: string[];
  customTags?: string[];
  metadata?: Record<string, any>;
}

export interface TavusConversationResponse {
  conversationUrl: string;
  conversationId: string;
  requestId: string;
  memoryStores?: string[];
  documentTags?: string[];
}

export interface TavusWebhookPayload {
  event_type: 'conversation.started' | 'conversation.ended' | 'utterance' | 'perception_tool_call' | 'recording.ready' | 'error';
  conversation_id: string;
  timestamp: string;
  data: any;
  signature?: string;
}

export interface TavusError {
  error: string;
  requestId?: string;
  status?: number;
  retryAfter?: number;
  supportedVerticals?: string[];
}
EOF
echo -e "${GREEN}✓ TypeScript types generated${NC}"

echo -e "\n${GREEN}═══════════════════════════════════════${NC}"
echo -e "${GREEN}Integration helper completed!${NC}"
echo -e "${GREEN}═══════════════════════════════════════${NC}"
echo -e "\nNext steps:"
echo -e "1. Review changes with: git status"
echo -e "2. Test locally with: npm run dev"
echo -e "3. Run integration tests: npm run test:integration"
echo -e "4. Deploy when ready: npm run deploy"
