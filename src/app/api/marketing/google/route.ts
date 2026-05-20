import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { google } from "googleapis"

export const dynamic = "force-dynamic"

export async function GET() {
  const session = await auth()

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  // Find the user's google account token
  const account = await prisma.account.findFirst({
    where: {
      userId: session.user.id,
      provider: "google",
    },
  })

  if (!account || !account.access_token) {
    return NextResponse.json({ error: "Google account not connected" }, { status: 400 })
  }

  try {
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET
    )

    oauth2Client.setCredentials({
      access_token: account.access_token,
      refresh_token: account.refresh_token,
      expiry_date: account.expires_at ? account.expires_at * 1000 : null,
    })

    // Auto-refresh token logic is handled by googleapis if refresh_token is present
    
    // Example: Fetch Google Search Console sites
    const searchconsole = google.searchconsole({ version: 'v1', auth: oauth2Client })
    
    const response = await searchconsole.sites.list()

    return NextResponse.json({ 
      success: true, 
      sites: response.data.siteEntry || [] 
    })
  } catch (error: unknown) {
    console.error("Google API Error:", error)
    const errorMessage = error instanceof Error ? error.message : "Unknown error"
    return NextResponse.json({ error: "Failed to fetch Google API data", details: errorMessage }, { status: 500 })
  }
}