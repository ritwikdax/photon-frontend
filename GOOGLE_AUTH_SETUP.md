# Google Sign-In Authentication Setup

This guide will help you set up Google authentication for the Photon Frontend application.

## Prerequisites

- A Google Cloud Platform account
- Node.js installed
- This Next.js application running

## Step 1: Install Dependencies

First, install the required authentication package:

```bash
npm install next-auth@beta
```

## Step 2: Set Up Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API:
   - Go to "APIs & Services" > "Library"
   - Search for "Google+ API"
   - Click "Enable"

4. Create OAuth 2.0 Credentials:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth client ID"
   - Choose "Web application"
   - Add authorized JavaScript origins:
     - `http://localhost:3000` (for development)
     - Your production URL (when deploying)
   - Add authorized redirect URIs:
     - `http://localhost:3000/api/auth/callback/google` (for development)
     - `https://your-production-url.com/api/auth/callback/google` (for production)
   - Click "Create"
   - Copy the **Client ID** and **Client Secret**

## Step 3: Configure Environment Variables

1. Copy the example environment file:
   ```bash
   cp .env.local.example .env.local
   ```

2. Edit `.env.local` and add your credentials:
   ```env
   GOOGLE_CLIENT_ID=your_actual_client_id
   GOOGLE_CLIENT_SECRET=your_actual_client_secret
   AUTH_SECRET=generate_a_random_secret
   NEXTAUTH_URL=http://localhost:3000
   ```

3. Generate a random AUTH_SECRET:
   ```bash
   openssl rand -base64 32
   ```

## Step 4: Start the Application

```bash
npm run dev
```

Visit `http://localhost:3000` and you should be redirected to the sign-in page.

## Features Implemented

### 1. **Beautiful Sign-In Page** (`/signin`)
   - Modern gradient design
   - Google Sign-In button
   - Responsive layout
   - Animated hover effects

### 2. **Protected Routes**
   - All routes require authentication
   - Automatic redirect to `/signin` for unauthenticated users
   - Middleware-based protection

### 3. **Authentication Context**
   - Session management with NextAuth.js
   - User information available throughout the app

### 4. **User Profile Display**
   - User avatar in the header
   - Sign-out button with logout functionality

### 5. **Conditional Layout Rendering**
   - Sign-in page shows minimal layout
   - Authenticated users see full navigation and sidebar

## File Structure

```
src/
├── app/
│   ├── api/
│   │   └── auth/
│   │       └── [...nextauth]/
│   │           └── route.ts          # NextAuth API routes
│   ├── components/
│   │   ├── CustomLayout.tsx          # Updated with auth logic
│   │   └── navigation/
│   │       └── AppHeader.tsx         # Updated with sign-out
│   ├── context/
│   │   ├── all.tsx                   # Updated with AuthProvider
│   │   └── AuthContext.tsx           # Session provider wrapper
│   ├── signin/
│   │   └── page.tsx                  # Beautiful sign-in page
│   └── auth.config.ts                # Auth configuration
├── auth.ts                           # NextAuth initialization
└── middleware.ts                     # Route protection middleware
```

## How It Works

1. **First Load**: When a user visits any page, the middleware checks if they're authenticated
2. **Not Authenticated**: Redirects to `/signin`
3. **Sign In**: User clicks "Sign in with Google" and authenticates
4. **Authenticated**: User is redirected to home page with full access
5. **Protected Routes**: All routes except `/signin` require authentication
6. **Sign Out**: User can click the logout button to sign out

## Customization

### Change Sign-In Page Design
Edit `src/app/signin/page.tsx` to customize colors, layout, or text.

### Add More OAuth Providers
Edit `src/app/auth.config.ts` and add more providers:
```typescript
providers: [
  Google({ ... }),
  GitHub({ ... }),
  // Add more providers
],
```

### Customize Protected Routes
Edit `src/middleware.ts` to change which routes are protected:
```typescript
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|public-page).*)"],
};
```

## Troubleshooting

### "Invalid client" error
- Check that your Google Client ID and Secret are correct
- Verify the redirect URI in Google Cloud Console matches exactly

### Redirect loop
- Clear your browser cookies
- Check that AUTH_SECRET is set in .env.local

### Session not persisting
- Ensure cookies are enabled in your browser
- Check that NEXTAUTH_URL matches your actual URL

## Security Notes

- Never commit `.env.local` to version control
- Use environment variables for all sensitive data
- Regenerate AUTH_SECRET when deploying to production
- Always use HTTPS in production

## Next Steps

- Add role-based access control (RBAC)
- Implement custom user profile page
- Add email verification
- Set up refresh token rotation
- Add session timeout configuration

For more information, visit:
- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Google OAuth Documentation](https://developers.google.com/identity/protocols/oauth2)
