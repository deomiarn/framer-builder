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
import { useState } from "react";
import RenameProjectDialog from "@/features/dashboard/components/dialog/RenameProjectDialog.tsx";
import { DeleteProjectAlertDialog } from "@/features/dashboard/components/dialog/DeleteProjectAlertDialog.tsx";

interface Props {
  project: Project;
}

export function ProjectCard({ project }: Props) {
  const [renameOpen, setRenameOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <>
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
              <DropdownMenuItem onClick={() => setRenameOpen(true)}>
                Rename
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setDeleteOpen(true)}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>

        <CardContent className="text-sm text-muted-foreground">
          Created{" "}
          {formatDistanceToNow(new Date(project.created_at), {
            addSuffix: true,
          })}
        </CardContent>

        <CardFooter className="mt-auto">
          <Button
            className="w-full"
            // onClick={() => void}
          >
            Open
          </Button>
        </CardFooter>
      </Card>

      <RenameProjectDialog
        open={renameOpen}
        onOpenChange={setRenameOpen}
        projectId={project.id}
        projectName={project.name}
      />
      <DeleteProjectAlertDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        projectId={project.id}
        projectName={project.name}
      />
    </>
  );
}
