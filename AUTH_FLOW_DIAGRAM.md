# Authentication Flow Diagram

## Visual Flow

```
┌─────────────────────────────────────────────────────────────────────┐
│                         USER JOURNEY                                 │
└─────────────────────────────────────────────────────────────────────┘

START
  │
  ├─> User opens app (http://localhost:3000)
  │
  ├─> middleware.ts intercepts request
  │     │
  │     ├─> Check: Is user authenticated?
  │     │     │
  │     │     ├─> YES ──> Allow access to page
  │     │     │             │
  │     │     │             └─> Show full layout with navigation
  │     │     │
  │     │     └─> NO ──> Redirect to /signin
  │
  ├─> User lands on Sign-In Page
  │     │
  │     │   ┌─────────────────────────────────────────┐
  │     │   │  Beautiful Sign-In Page                 │
  │     │   │  ┌─────────────────────────────────┐   │
  │     │   │  │ 🔒 Lock Icon                     │   │
  │     │   │  │ "Welcome Back"                   │   │
  │     │   │  │ Description text                 │   │
  │     │   │  │ ┌──────────────────────────┐    │   │
  │     │   │  │ │ 🔵 Sign in with Google    │    │   │
  │     │   │  │ └──────────────────────────┘    │   │
  │     │   │  │ Terms & conditions           │   │
  │     │   │  └─────────────────────────────┘   │
  │     │   └─────────────────────────────────────┘
  │     │
  │     └─> User clicks "Sign in with Google"
  │           │
  │           └─> Redirects to Google OAuth
  │
  ├─> Google Authentication
  │     │
  │     ├─> User selects Google account
  │     │
  │     ├─> User grants permissions
  │     │
  │     └─> Google redirects to callback URL
  │           /api/auth/callback/google
  │
  ├─> NextAuth handles callback
  │     │
  │     ├─> Validates Google response
  │     │
  │     ├─> Creates session
  │     │     │
  │     │     └─> Stores in secure cookie
  │     │
  │     └─> Redirects to homepage (/)
  │
  ├─> User on Homepage
  │     │
  │     ├─> middleware.ts checks auth ✅
  │     │
  │     ├─> Shows full layout
  │     │     │
  │     │     ├─> Header with avatar
  │     │     ├─> Navigation drawer
  │     │     └─> Main content
  │     │
  │     └─> User can navigate all pages
  │
  ├─> User clicks Logout
  │     │
  │     └─> signOut() called
  │           │
  │           ├─> Session destroyed
  │           │
  │           └─> Redirects to /signin
  │
  └─> CYCLE REPEATS

```

## Component Architecture

```
┌───────────────────────────────────────────────────────────────┐
│                      Root Layout (layout.tsx)                 │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │              CustomLayout Component                      │ │
│  │  ┌───────────────────────────────────────────────────┐  │ │
│  │  │         AllContextProviders                        │  │ │
│  │  │  ┌─────────────────────────────────────────────┐  │  │ │
│  │  │  │        AuthProvider (Session)               │  │  │ │
│  │  │  │  ┌───────────────────────────────────────┐  │  │  │ │
│  │  │  │  │   QueryClientProvider                 │  │  │  │ │
│  │  │  │  │  ┌─────────────────────────────────┐  │  │  │  │ │
│  │  │  │  │  │      ThemeProvider              │  │  │  │  │ │
│  │  │  │  │  │  ┌───────────────────────────┐  │  │  │  │  │ │
│  │  │  │  │  │  │   SnackbarProvider        │  │  │  │  │  │ │
│  │  │  │  │  │  │  ┌─────────────────────┐  │  │  │  │  │  │ │
│  │  │  │  │  │  │  │  DialogProvider     │  │  │  │  │  │  │ │
│  │  │  │  │  │  │  │  ┌───────────────┐  │  │  │  │  │  │  │ │
│  │  │  │  │  │  │  │  │   Children    │  │  │  │  │  │  │  │ │
│  │  │  │  │  │  │  │  └───────────────┘  │  │  │  │  │  │  │ │
│  │  │  │  │  │  │  └─────────────────────┘  │  │  │  │  │  │ │
│  │  │  │  │  │  └───────────────────────────┘  │  │  │  │  │ │
│  │  │  │  │  └─────────────────────────────────┘  │  │  │  │ │
│  │  │  │  └───────────────────────────────────────┘  │  │  │ │
│  │  │  └─────────────────────────────────────────────┘  │  │ │
│  │  └───────────────────────────────────────────────────┘  │ │
│  └─────────────────────────────────────────────────────────┘ │
└───────────────────────────────────────────────────────────────┘
```

## Authentication State Management

```
┌─────────────────────────────────────────────────────────────┐
│                  useSession() Hook                           │
│                                                              │
│  status: "loading" | "authenticated" | "unauthenticated"    │
│                                                              │
│  data: {                                                     │
│    user: {                                                   │
│      name: string                                            │
│      email: string                                           │
│      image: string                                           │
│    }                                                         │
│    expires: string                                           │
│  }                                                           │
└─────────────────────────────────────────────────────────────┘
         │
         ├─> Used in CustomLayout.tsx
         │     └─> Show loading / signin / authenticated layout
         │
         └─> Used in AppHeader.tsx
               └─> Show user avatar and logout button
```

## File Dependencies

```
middleware.ts
    ↓
  auth.ts ──────────┐
    ↓               │
app/auth.config.ts  │
    ↓               │
    └─> Providers: Google
    
app/api/auth/[...nextauth]/route.ts
    ↓
  Handles OAuth callbacks
  
app/signin/page.tsx
    ↓
  signIn("google")
    ↓
  Triggers OAuth flow

app/context/AuthContext.tsx
    ↓
  SessionProvider wraps app
    ↓
  useSession() available everywhere

app/components/CustomLayout.tsx
    ↓
  Uses useSession() to show/hide layout
    ↓
  Children components rendered

app/components/navigation/AppHeader.tsx
    ↓
  Uses useSession() for user info
    ↓
  signOut() for logout
```

## Security Layers

```
Layer 1: middleware.ts
    ↓
  Server-side route guard
  Runs before any page loads
  Redirects unauthenticated users
  
Layer 2: CustomLayout.tsx
    ↓
  Client-side check
  Shows appropriate UI
  Handles loading states
  
Layer 3: Session Management
    ↓
  Secure HTTP-only cookies
  Automatic session refresh
  Token validation
  
Layer 4: Google OAuth
    ↓
  Industry-standard security
  No password storage
  Verified user identity
```

## Environment Variables Flow

```
.env.local
    ↓
  GOOGLE_CLIENT_ID ────────┐
  GOOGLE_CLIENT_SECRET ────┤
  AUTH_SECRET ─────────────┤
  NEXTAUTH_URL ────────────┤
                           │
                           ↓
                    app/auth.config.ts
                           ↓
                      Google Provider
                           ↓
                    OAuth Configuration
                           ↓
                   Authentication Flow
```

## Request Flow with Middleware

```
User Request (http://localhost:3000/projects)
    ↓
middleware.ts intercepts
    ↓
  Check auth cookie
    ↓
    ├─> Cookie valid?
    │     │
    │     ├─> YES ──> Allow request
    │     │             │
    │     │             └─> Page renders normally
    │     │
    │     └─> NO ──> Response.redirect("/signin")
    │                   │
    │                   └─> User sees sign-in page
    ↓
Sign in with Google
    ↓
Callback to /api/auth/callback/google
    ↓
Session created, cookie set
    ↓
Redirect to original URL (/projects)
    ↓
middleware.ts intercepts again
    ↓
Cookie now valid ✅
    ↓
Page renders with full access
```

## Session Cookie Structure (Abstracted)

```
Cookie Name: next-auth.session-token
  │
  ├─> Encrypted ✅
  ├─> HTTP-only ✅ (Not accessible to JavaScript)
  ├─> Secure (in production) ✅
  ├─> SameSite: Lax ✅
  │
  └─> Contains:
        ├─> User ID
        ├─> Session token
        ├─> Expiration time
        └─> Signature (verified by AUTH_SECRET)
```

This architecture ensures:
- ✅ Security at multiple layers
- ✅ Automatic session management
- ✅ Seamless user experience
- ✅ Easy to maintain and extend
