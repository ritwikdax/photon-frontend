# Authentication Setup Quick Reference

## Already Set Up? Skip This!

If you've already configured Google OAuth, you can ignore this file. The authentication system is ready to use.

## Quick Setup (5 minutes)

### 1. Install Package
```bash
npm install next-auth@beta
```

### 2. Get Google Credentials
- Visit: https://console.cloud.google.com/apis/credentials
- Create OAuth 2.0 Client ID
- Add redirect URI: `http://localhost:3000/api/auth/callback/google`
- Copy Client ID and Secret

### 3. Create .env.local
```env
GOOGLE_CLIENT_ID=your_client_id_here
GOOGLE_CLIENT_SECRET=your_client_secret_here
AUTH_SECRET=run_openssl_rand_base64_32
NEXTAUTH_URL=http://localhost:3000
```

### 4. Restart Server
```bash
npm run dev
```

## That's it! 🎉

See `GOOGLE_AUTH_SETUP.md` for detailed instructions.
