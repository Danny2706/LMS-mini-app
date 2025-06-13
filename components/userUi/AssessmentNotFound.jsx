import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { FileText, PlusCircle, ArrowLeft } from "lucide-react"
import { Card } from "@/components/ui/card"
import { useRouter } from "next/navigation"

export default function AssessmentNotFound() {
  const router = useRouter()

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-6 text-center">
      <Card className="w-full max-w-md p-8 border border-muted bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="p-4 rounded-full bg-primary/10">
            <FileText className="w-8 h-8 text-primary" />
          </div>

          <Alert className="border-none bg-background">
            <AlertTitle className="text-xl font-semibold">
              No Assessments Found
            </AlertTitle>
            <AlertDescription className="mt-2 text-muted-foreground">
              We couldn't find any assessments for this course. This could be
              due to the course not having any assessments created yet, or the
              assessments may have been deleted.
            </AlertDescription>
          </Alert>

          <div className="flex gap-3 mt-4 w-full justify-center">
            <Button
              variant="outline"
              onClick={() => router.back()}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Go Back
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
