import Footer from "@/app/(main)/footer"
import Header from "@/app/(main)/header"
import { ServerDataProvider } from "@/app/context/server-data-context"
import { auth } from "@/auth"
import { DashCommand } from "@/components/DashCommand"
import { SignIn } from "@/components/SignIn"
import getEnv from "@/lib/env-entry"
import type React from "react"

type DashboardProps = {
  children: React.ReactNode
}
export default function MainLayout({ children }: DashboardProps) {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex min-h-[calc(100vh-calc(var(--spacing)*16))] flex-1 flex-col gap-4 bg-background p-4 md:p-10 md:pt-8">
        <Header />
        <AuthProtected>
          <ServerDataProvider>
            {children}
            <DashCommand />
          </ServerDataProvider>
        </AuthProtected>
        <Footer />
      </main>
    </div>
  )
}

async function AuthProtected({ children }: DashboardProps) {
  if (getEnv("SitePassword")) {
    const session = await auth()
    if (!session) {
      return <SignIn />
    }
  }
  return children
}
