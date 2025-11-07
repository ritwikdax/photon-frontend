import { auth } from "@/auth";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isOnSignIn = req.nextUrl.pathname.startsWith("/signin");

  if (!isLoggedIn && !isOnSignIn) {
    return Response.redirect(new URL("/signin", req.nextUrl));
  }

  if (isLoggedIn && isOnSignIn) {
    return Response.redirect(new URL("/", req.nextUrl));
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
