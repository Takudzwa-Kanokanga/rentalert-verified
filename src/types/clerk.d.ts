declare module "@clerk/clerk-react" {
  import * as React from "react";

  export const ClerkProvider: React.FC<{ frontendApi?: string; children?: React.ReactNode }>;
  export const SignedIn: React.FC<{ children?: React.ReactNode }>;
  export const SignedOut: React.FC<{ children?: React.ReactNode }>;
  export const SignInButton: React.FC<{ children?: React.ReactNode }>;
  export const UserButton: React.FC<{ afterSignOutUrl?: string }>;

  export function useUser(): { isSignedIn: boolean; user?: any };
}
