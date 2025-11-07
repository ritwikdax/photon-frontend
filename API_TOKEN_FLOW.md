# API Authentication Token Flow

## Overview

The authentication system now automatically attaches the Google OAuth token to every axios request made to your backend API.

## How It Works

### 1. **User Signs In**
- User authenticates with Google OAuth
- NextAuth receives the access token and ID token from Google
- These tokens are stored in the session

### 2. **Token Storage**
Tokens are stored in the session via callbacks in `auth.config.ts`:

```typescript
jwt callback: Stores tokens in JWT
  └─> accessToken (Google API access)
  └─> idToken (User identity verification)
  
session callback: Makes tokens available to client
  └─> session.accessToken
  └─> session.idToken
```

### 3. **Automatic Token Attachment**
Every axios request automatically gets the token via interceptor in `http.ts`:

```typescript
axios request
  ↓
interceptor gets session
  ↓
extracts token from session
  ↓
adds Authorization header
  ↓
request sent to backend with token
```

## Token Priority

The system tries to attach tokens in this order:

1. **Google Access Token** (`session.accessToken`)
   - Primary token for API access
   - Used for Google API calls
   - Format: `Authorization: Bearer <access_token>`

2. **Google ID Token** (`session.idToken`)
   - Contains user identity information
   - Can be verified by your backend
   - Format: `Authorization: Bearer <id_token>`

3. **User Email** (fallback)
   - If no tokens available
   - Sent as custom header
   - Format: `X-User-Email: user@example.com`

## Backend Integration

Your backend should expect one of these headers:

### Option 1: Authorization Header (Recommended)
```
Authorization: Bearer <token>
```

The token will be either the Google access token or ID token.

### Option 2: Custom Header (Fallback)
```
X-User-Email: user@example.com
```

## Verify Token on Backend

### For ID Token (Recommended for User Authentication)

**Node.js Example:**
```javascript
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

async function verify(token) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: GOOGLE_CLIENT_ID,
  });
  const payload = ticket.getPayload();
  return payload; // Contains user info
}
```

**Python Example:**
```python
from google.oauth2 import id_token
from google.auth.transport import requests

def verify(token):
    idinfo = id_token.verify_oauth2_token(
        token, 
        requests.Request(), 
        GOOGLE_CLIENT_ID
    )
    return idinfo  # Contains user info
```

### For Access Token

You can use the access token to make calls to Google APIs on behalf of the user.

## Configuration Files

### 1. `src/app/auth.config.ts`
- Configures token storage in session
- JWT and session callbacks handle token flow

### 2. `src/app/utils/http.ts`
- Axios interceptor adds token to requests
- Handles 401 errors for expired tokens

### 3. `src/types/next-auth.d.ts`
- TypeScript type definitions
- Extends NextAuth types to include tokens

## Testing Token Flow

### Check if Token is Being Sent

1. Open browser DevTools (F12)
2. Go to Network tab
3. Make a request (e.g., load projects)
4. Click on the request
5. Check "Request Headers"
6. Look for `Authorization: Bearer ...`

### Debug Token in Code

```typescript
import { getSession } from "next-auth/react";

// In a component or API route
const session = await getSession();
console.log("Access Token:", session?.accessToken);
console.log("ID Token:", session?.idToken);
console.log("User:", session?.user);
```

## Token Lifecycle

```
1. Sign In
   └─> Google OAuth flow
   └─> Receive access_token & id_token
   
2. Store in Session
   └─> JWT callback saves to token
   └─> Session callback exposes to client
   
3. Automatic Attachment
   └─> Every axios request gets token
   └─> Interceptor adds Authorization header
   
4. Backend Verification
   └─> Backend receives token
   └─> Verifies with Google
   └─> Authenticates user
   
5. Token Expiry
   └─> Session expires (default: 30 days)
   └─> User needs to sign in again
```

## Error Handling

### 401 Unauthorized

If backend returns 401:
- Token might be expired
- Token might be invalid
- Backend verification failed

The interceptor logs this error:
```typescript
// In http.ts response interceptor
if (error.response?.status === 401) {
  console.error("Unauthorized - session expired");
  // Optionally redirect to /signin
}
```

### Token Missing

If no token is attached:
- User might not be signed in
- Session might have expired
- Check that user authenticated successfully

## Customization

### Send Different Headers

Edit `src/app/utils/http.ts`:

```typescript
// Example: Send user ID instead
if (session?.user?.id) {
  config.headers["X-User-ID"] = session.user.id;
}

// Example: Send multiple headers
config.headers.Authorization = `Bearer ${session.accessToken}`;
config.headers["X-User-Email"] = session.user.email;
config.headers["X-User-Name"] = session.user.name;
```

### Use Custom Backend Token

If your backend generates its own JWT after verifying Google token:

1. Create an API route to exchange Google token for your token
2. Store your token in the session
3. Use your token in the interceptor

```typescript
// In auth.config.ts session callback
async session({ session, token }) {
  // Exchange Google token for your backend token
  const response = await fetch('your-backend/auth/exchange', {
    headers: { 'Authorization': `Bearer ${token.accessToken}` }
  });
  const { backendToken } = await response.json();
  session.backendToken = backendToken;
  return session;
}

// In http.ts interceptor
if (session?.backendToken) {
  config.headers.Authorization = `Bearer ${session.backendToken}`;
}
```

## Security Best Practices

1. **Always Use HTTPS in Production**
   - Tokens should never be sent over HTTP
   - Use secure cookies

2. **Validate Tokens on Backend**
   - Never trust tokens without verification
   - Verify with Google's servers

3. **Set Appropriate Token Expiry**
   - Configure session maxAge in auth.config.ts
   - Implement token refresh if needed

4. **Don't Log Tokens**
   - Remove console.logs with tokens in production
   - Tokens are sensitive credentials

5. **Handle Token Expiry Gracefully**
   - Show clear error messages
   - Redirect to sign-in when expired

## Troubleshooting

### Token Not Appearing in Requests

1. Check user is signed in: `session?.user` exists
2. Check token is in session: Log `session.accessToken`
3. Check interceptor is running: Add console.log in interceptor
4. Clear browser cache and sign in again

### Backend Can't Verify Token

1. Ensure backend has correct GOOGLE_CLIENT_ID
2. Check token format is correct (Bearer prefix)
3. Verify token hasn't expired
4. Check network isn't modifying headers

### Token Expiring Too Quickly

Edit `auth.config.ts`:
```typescript
session: {
  maxAge: 30 * 24 * 60 * 60, // 30 days in seconds
}
```

## Summary

✅ Tokens automatically attached to all axios requests  
✅ Google access token and ID token available  
✅ Backend receives Authorization header  
✅ Error handling for expired tokens  
✅ TypeScript support included  
✅ Easy to customize for your backend  

Your API requests now include authentication automatically! 🎉
