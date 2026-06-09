import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  providers: [], // Diisi kosong agar aman dijalankan di Vercel Edge Middleware
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as any;
      }
      return session;
    }
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 1 hari
  },
  secret: process.env.AUTH_SECRET,
} satisfies NextAuthConfig;
