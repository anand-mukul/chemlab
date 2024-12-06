import Image from "next/image"
import { Clock, Heart, Share2 } from 'lucide-react'

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface ProjectCardProps {
  title: string
  image: string
  date: string
  likes?: number
  shares?: number
}

export function ProjectCard({ title, image, date, likes = 0, shares = 0 }: ProjectCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-0">
        <div className="aspect-video relative">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-lg">{title}</CardTitle>
        <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
          <Clock className="w-4 h-4" />
          {date}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between">
        <Button variant="ghost" size="sm">
          <Heart className="w-4 h-4 mr-2" />
          {likes}
        </Button>
        <Button variant="ghost" size="sm">
          <Share2 className="w-4 h-4 mr-2" />
          {shares}
        </Button>
      </CardFooter>
    </Card>
  )
}

