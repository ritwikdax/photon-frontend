# Authentication Troubleshooting Guide

## Common Issues and Solutions

### 1. Package Installation Failed

**Error**: `npm install next-auth@beta` fails with cache or permission errors

**Solutions**:
```bash
# Option 1: Clear npm cache
npm cache clean --force
npm install next-auth@beta

# Option 2: Use yarn instead
yarn add next-auth@beta

# Option 3: Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm install next-auth@beta
```

---

### 2. "Module not found: Can't resolve 'next-auth'"

**Cause**: Package not installed or build cache issue

**Solutions**:
```bash
# Install the package
npm install next-auth@beta

# Clear Next.js cache
rm -rf .next
npm run dev
```

---

### 3. Google OAuth "Redirect URI Mismatch"

**Error**: "Error 400: redirect_uri_mismatch"

**Cause**: The redirect URI in Google Cloud Console doesn't match your app

**Solution**:
1. Go to Google Cloud Console
2. Navigate to Credentials
3. Edit your OAuth 2.0 Client ID
4. Ensure this exact URI is in "Authorized redirect URIs":
   ```
   http://localhost:3000/api/auth/callback/google
   ```
5. Save changes (can take 5 minutes to propagate)

---

### 4. "Invalid client" Error

**Cause**: Wrong Client ID or Secret in .env.local

**Solution**:
1. Check `.env.local` has correct values
2. Verify no extra spaces or quotes
3. Ensure the credentials are from the correct Google Cloud project
4. Restart the dev server after changing .env.local

---

### 5. Infinite Redirect Loop

**Symptoms**: Page keeps redirecting between `/` and `/signin`

**Solutions**:
```bash
# Clear browser cookies
# In Chrome: DevTools > Application > Cookies > Delete All

# Check AUTH_SECRET is set
cat .env.local | grep AUTH_SECRET

# If missing, generate one:
openssl rand -base64 32

# Add to .env.local and restart server
```

---

### 6. Session Not Persisting / User Gets Logged Out

**Causes**:
- Browser blocking cookies
- Wrong NEXTAUTH_URL
- AUTH_SECRET changed

**Solutions**:
1. Enable cookies in browser
2. Check `.env.local`:
   ```env
   NEXTAUTH_URL=http://localhost:3000
   ```
   Must match your actual URL exactly

3. Don't change AUTH_SECRET after creating sessions

4. Clear browser data and try again

---

### 7. TypeScript Errors

**Error**: Type errors in auth-related files

**Solutions**:
```bash
# Ensure next-auth is installed
npm install next-auth@beta

# Restart TypeScript server in VS Code
# Command Palette (Cmd+Shift+P) > TypeScript: Restart TS Server

# Check tsconfig.json has proper paths:
# "paths": { "@/*": ["./src/*"] }
```

---

### 8. Middleware Not Working

**Symptoms**: Can access pages without authentication

**Check**:
1. File exists: `src/middleware.ts`
2. Export is correct:
   ```typescript
   export default auth((req) => { ... });
   export const config = { ... };
   ```
3. Restart dev server

---

### 9. "NEXTAUTH_URL" Environment Variable Error

**Error**: Warning about NEXTAUTH_URL

**Solution**:
Add to `.env.local`:
```env
NEXTAUTH_URL=http://localhost:3000
```

For production:
```env
NEXTAUTH_URL=https://yourdomain.com
```

---

### 10. Sign-In Page Shows Blank

**Causes**:
- Missing Material-UI dependencies
- JavaScript error
- CSP issues

**Solutions**:
1. Check browser console for errors (F12)
2. Verify Material-UI is installed:
   ```bash
   npm list @mui/material @mui/icons-material
   ```
3. Clear cache and hard reload (Cmd+Shift+R)

---

### 11. "Cannot find module '@/auth'"

**Cause**: Path alias not configured or file in wrong location

**Solution**:
1. Ensure `src/auth.ts` exists (not in app folder)
2. Check `tsconfig.json`:
   ```json
   "paths": {
     "@/*": ["./src/*"]
   }
   ```
3. Restart TypeScript server

---

### 12. Production Deployment Issues

**Google OAuth Setup**:
1. Add production URL to authorized origins
2. Add production callback URL:
   ```
   https://yourdomain.com/api/auth/callback/google
   ```

**Environment Variables**:
```env
NEXTAUTH_URL=https://yourdomain.com
AUTH_SECRET=<generate-new-one-for-production>
GOOGLE_CLIENT_ID=<your-client-id>
GOOGLE_CLIENT_SECRET=<your-client-secret>
```

**Vercel Deployment**:
- Add all env variables in Vercel dashboard
- Ensure `NEXTAUTH_URL` matches your domain
- Redeploy after adding env variables

---

### 13. Can't Generate AUTH_SECRET

**Error**: `openssl` command not found

**Solutions**:

**macOS/Linux**:
```bash
# openssl should be available
openssl rand -base64 32
```

**Windows**:
```bash
# Use Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

**Or use online generator**:
- Visit: https://generate-secret.vercel.app/32

---

### 14. Sign-Out Not Working

**Symptoms**: User stays logged in after clicking logout

**Check**:
1. Console for errors
2. Verify signOut is imported:
   ```typescript
   import { signOut } from "next-auth/react";
   ```
3. Check callback URL:
   ```typescript
   await signOut({ callbackUrl: "/signin" });
   ```

---

### 15. Layout Not Updating After Auth

**Cause**: Server/client mismatch or state not updating

**Solution**:
1. Clear `.next` folder:
   ```bash
   rm -rf .next
   ```
2. Restart dev server
3. Hard refresh browser (Cmd+Shift+R)

---

## Still Having Issues?

### Debug Checklist

1. ✅ `next-auth@beta` installed
2. ✅ `.env.local` exists with all variables
3. ✅ Google OAuth credentials configured
4. ✅ Redirect URI matches exactly
5. ✅ Dev server restarted after .env changes
6. ✅ Browser cookies enabled
7. ✅ No console errors
8. ✅ All auth files created

### Get More Help

1. Check the console output when running `npm run dev`
2. Look at browser console (F12) for client-side errors
3. Review `GOOGLE_AUTH_SETUP.md` for setup steps
4. Check NextAuth.js docs: https://next-auth.js.org/

### Enable Debug Mode

Add to `.env.local`:
```env
NEXTAUTH_DEBUG=true
```

This will show detailed logs in the terminal.

---

## Clean Slate Solution

If all else fails, start fresh:

```bash
# 1. Remove auth-related packages
npm uninstall next-auth

# 2. Clear cache
rm -rf .next node_modules package-lock.json
npm cache clean --force

# 3. Reinstall everything
npm install
npm install next-auth@beta

# 4. Delete .env.local and recreate it
rm .env.local
cp .env.local.example .env.local
# Edit .env.local with your credentials

# 5. Restart
npm run dev
```

---

Remember: Most issues are due to:
1. Missing environment variables
2. Wrong Google OAuth redirect URI
3. Browser cache/cookies
4. Forgetting to restart the dev server

Clear, check, restart, and try again! 🚀
