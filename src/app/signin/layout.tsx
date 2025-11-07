import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In - Photon",
  description: "Sign in to access your Photon dashboard",
};

export default function SignInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
