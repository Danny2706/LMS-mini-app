import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useRouter } from "next/navigation"
import { GlassWater, Rocket } from "lucide-react"

export default function CourseNotFound() {
  const router = useRouter()

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-6 px-4 text-center  dark:from-gray-900 dark:to-gray-800">
      <Alert className="w-full max-w-md border-none shadow-lg bg-background">
        <Rocket className="w-5 h-5" />
        <AlertTitle className="text-2xl font-bold">Course Not Found</AlertTitle>
        <AlertDescription className="mt-2 text-gray-600 dark:text-gray-400">
          We couldn't find the course you're looking for. It might have been
          removed or the URL is incorrect.
        </AlertDescription>
      </Alert>

      <div className="flex flex-col items-center gap-4 p-8 bg-white rounded-lg shadow-lg dark:bg-gray-950 max-w-md w-full">
        <GlassWater className="w-12 h-12 text-gray-400" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          No Results Found
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Try searching for another course or browse our popular categories
        </p>

        <div className="flex gap-3 mt-4">
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="gap-1"
          >
            Go Back
          </Button>
          <Button onClick={() => router.push("/user")} className="gap-1">
            Browse Courses
          </Button>
        </div>
      </div>
    </div>
  )
}
