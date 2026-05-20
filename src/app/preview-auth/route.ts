import { redirect } from "next/navigation"
import { signIn } from "@/auth"

// This route allows us to automatically sign in for preview purposes
export async function GET() {
  await signIn("credentials", { 
    redirect: false 
  });
  return redirect("/dashboard")
}