"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function UnauthorizedPage() {
  const router = useRouter()
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 p-4 text-center">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">
          403 - Unauthorized
        </h1>
        <p className="text-muted-foreground">
          You don't have permission to access this page
        </p>
      </div>

      <Button asChild variant="outline" className={"cursor-pointer"}>
        <span onClick={() => router.back()} className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Go back
        </span>
      </Button>
    </div>
  )
}
