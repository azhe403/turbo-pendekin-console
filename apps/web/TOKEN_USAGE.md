# Access Token Creation

This project provides multiple ways to create access tokens using the OTP endpoint.

## Web Interface

### 1. Manual OTP Input
Navigate to `/auth/otp` to manually enter a 6-digit OTP code.

### 2. Direct OTP URL
Navigate directly to `/auth/otp/{otp_number}` to auto-create a token:
- Example: `/auth/otp/372117`

### 3. Navigation
The auth pages integrate with the main application layout and theme.

## Usage

### 1. Web Interface (Recommended)
```bash
# Start the development server
npm run dev

# Navigate to:
http://localhost:23000/auth/otp          # Manual input
http://localhost:23000/auth/otp/372117   # Direct OTP
```

### 2. NPM Script
```bash
# Using the Node.js script
npm run token <otp>

# Example:
npm run token 372117
```

### 3. Direct Curl Script
```bash
# Using the bash script
npm run token:curl <otp>

# Example:
npm run token:curl 372117
```

### 4. Programmatic Usage
```typescript
import { createAccessToken } from '@/lib/auth';

// Create token
const result = await createAccessToken(372117);

if (result.token) {
  console.log('Token:', result.token);
} else {
  console.error('Error:', result.error);
}
```

### 5. Direct Curl Command
```bash
curl --location --request POST 'https://engine-stg.zizibot.nf.azhe.my.id/api/user/session/otp' \
--header 'User-Agent: Apidog/1.0.0 (https://apidog.com)' \
--header 'Content-Type: application/json' \
--header 'Accept: */*' \
--header 'Cache-Control: no-cache' \
--header 'Host: engine-stg.zizibot.nf.azhe.my.id' \
--header 'Connection: keep-alive' \
--data-raw '{
    "otp": 372117
}'
```

## Web Interface Features

- **Theme Integration**: Uses the main application's design system with shadcn/ui components
- **Sidebar Layout**: Integrates with the main app's sidebar navigation
- **Dark/Light Mode**: Supports theme switching via the theme provider
- **Manual Input**: Clean form with 6-digit OTP validation
- **Direct URL**: Auto-process OTP from URL parameters
- **Token Storage**: Automatically stores tokens in localStorage
- **Copy Function**: One-click token copying with visual feedback
- **Error Handling**: Clear error messages and validation
- **Navigation**: Easy switching between input methods

## API Response

The endpoint returns a JSON response with the access token:

```json
{
  "transaction_id": "0HNJP6LLDIU5I:00000003",
  "execution_time": "00:00:00.7059229",
  "message": "Success",
  "result": {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "access_expire_in": 900,
    "refresh_expire_in": 0
  }
}
```

## Files Created

- `src/lib/auth.ts` - Core authentication functions
- `src/app/auth/otp/page.tsx` - Manual OTP input page (theme-compliant)
- `src/app/auth/otp/[otp]/page.tsx` - Direct OTP URL page (theme-compliant)
- `scripts/create-token.js` - Node.js script for token creation
- `scripts/create-token.sh` - Bash script using curl directly
