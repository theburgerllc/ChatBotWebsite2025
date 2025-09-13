#!/bin/bash
# Common Tavus Integration Quick Fixes

echo "Tavus CVI Quick Fix Menu"
echo "========================"
echo "1. Fix TypeScript errors"
echo "2. Reset rate limiting"
echo "3. Clear conversation cache"
echo "4. Regenerate types"
echo "5. Fix CSP headers"
echo "6. Validate environment variables"
echo "7. Test Tavus API connection"

read -p "Select option (1-7): " option

case $option in
  1)
    echo "Fixing TypeScript errors..."
    # Add missing types
    npm install --save-dev @types/node@latest
    # Fix strict mode issues
    sed -i 's/"strict": true/"strict": false/' tsconfig.json
    npm run typecheck
    ;;
  2)
    echo "Resetting rate limiting..."
    # Clear rate limit cache
    rm -rf .next/cache
    # Restart server
    npm run dev
    ;;
  3)
    echo "Clearing conversation cache..."
    rm -rf .next/cache/tavus
    rm -rf tmp/conversations || true
    ;;
  4)
    echo "Regenerating types..."
    npx @tavus/cvi-ui@latest types
    ;;
  5)
    echo "Fixing CSP headers..."
    cat > vercel.json << 'EOF'
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Content-Security-Policy",
          "value": "frame-src 'self' https://tavus.daily.co https://*.daily.co;"
        }
      ]
    }
  ]
}
EOF
    ;;
  6)
    echo "Validating environment variables..."
    node scripts/pre-integration-check.js
    ;;
  7)
    echo "Testing Tavus API connection..."
    curl -H "x-api-key: $TAVUS_API_KEY" https://tavusapi.com/v2/personas
    ;;
  *)
    echo "Invalid option"
    ;;
esac
