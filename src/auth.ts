import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "./lib/prisma"

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Preview Account",
      credentials: {},
      async authorize() {
        return {
          id: "preview-user-1",
          name: "Preview Admin",
          email: "admin@preview.com",
          role: "SUPER_ADMIN",
          department: "Management"
        }
      }
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
          // Request access to analytics and search console alongside basic info
          scope: "openid email profile https://www.googleapis.com/auth/analytics.readonly https://www.googleapis.com/auth/webmasters.readonly"
        }
      }
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      if (session.user && user) {
        // @ts-expect-error adding custom property
        session.user.role = user.role
        // @ts-expect-error adding custom property
        session.user.department = user.department
        session.user.id = user.id
      }
      return session
    },
  },
})