import NextAuth from "next-auth"

// Define dummy providers for edge runtime as Prisma cannot run on edge
const authConfig = {
  providers: [],
}

export const { auth: middleware } = NextAuth(authConfig)

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}