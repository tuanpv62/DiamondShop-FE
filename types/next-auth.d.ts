import NextAuth from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id: string;
 
      name?: string;
      email: string;
      img?: string;
      role?: string;
      dob?: string;
      gender?: string;
      accessToken: string;
      refreshToken: string;
      tokenType?: string;
      emailVerified?: Date | null;
      roleName?: string;
    };
  }
}
