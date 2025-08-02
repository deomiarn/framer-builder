import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/shared/components/ui/card.tsx";
import { Button } from "@/shared/components/ui/button.tsx";
import { MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu.tsx";
import type { Project } from "@/features/projects/types/project.ts";
import { formatDistanceToNow } from "date-fns";

interface Props {
  project: Project;
  onOpen: (id: string) => void;
  onDelete: (id: string) => void;
}

export function ProjectCard({ project, onOpen, onDelete }: Props) {
  return (
    <Card className="flex flex-col h-48">
      <CardHeader className="flex justify-between items-start pb-3">
        <h3 className="text-base font-medium break-words">{project.name}</h3>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-6 w-6">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onDelete(project.id)}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>

      <CardContent className="text-sm text-muted-foreground">
        Created{" "}
        {formatDistanceToNow(new Date(project.created_at), { addSuffix: true })}
      </CardContent>

      <CardFooter className="mt-auto">
        <Button className="w-full" onClick={() => onOpen(project.id)}>
          Open
        </Button>
      </CardFooter>
    </Card>
  );
}
