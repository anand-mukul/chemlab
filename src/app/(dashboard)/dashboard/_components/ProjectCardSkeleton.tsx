import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function ProjectCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-0">
        <div className="aspect-video bg-muted">
          <Skeleton className="h-full w-full" />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <Skeleton className="h-6 w-1/2 mb-2" />
        <div className="flex items-center gap-2 mt-2">
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-1/4" />
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between">
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-16" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-16" />
        </div>
      </CardFooter>
    </Card>
  )
}
