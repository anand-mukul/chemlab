import { Plus } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface CreateCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
}

export function CreateCard({ title, className, ...props }: CreateCardProps) {
  const uuid = Math.random().toString(36).substring(2, 9);
  return (
    <Card
      className={cn(
        "cursor-pointer group hover:border-primary transition-colors",
        className
      )}
      {...props}
    >
      <Link href={`/lab/${uuid}`}>
        <CardContent className="flex flex-col items-center justify-center p-6 text-center h-full min-h-[200px] gap-4">
          <div className="p-3 rounded-full bg-muted group-hover:bg-primary transition-colors">
            <Plus className="w-5 h-5 text-muted-foreground group-hover:text-primary-foreground" />
          </div>
          <p className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">
            Create your first {title}
          </p>
        </CardContent>
      </Link>
    </Card>
  );
}
