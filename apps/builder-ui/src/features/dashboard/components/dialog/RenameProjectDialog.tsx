import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog.tsx";
import { type FormEvent, useEffect, useState } from "react";
import { Input } from "@/shared/components/ui/input.tsx";
import { Button } from "@/shared/components/ui/button.tsx";
import LoadingButton from "@/shared/components/ui/loadingButton.tsx";
import { toast } from "sonner";
import { useRenameProject } from "@/features/projects/hooks/useRenameProject.ts";
import { PROJECT_NAME_MAX_LENGTH } from "@/shared/constants/project.ts";

interface NewProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projectId: string;
  projectName: string;
}

export default function RenameProjectDialog({
  open,
  onOpenChange,
  projectId,
  projectName,
}: NewProjectDialogProps) {
  const [name, setName] = useState(projectName);
  const renameProject = useRenameProject();
  const remaining = PROJECT_NAME_MAX_LENGTH - name.length;

  useEffect(() => setName(projectName), [open, projectName]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const newName = name.trim();
    if (!newName) return;

    renameProject.mutate(
      { projectId, newName },
      {
        onSuccess: (project) => {
          onOpenChange(false);
          toast.success(`Project "${project.name}" renamed successfully!`);
        },
        onError: (error) => {
          console.error("Failed to rename project:", error);
          toast.error(
            `Failed to rename project: ${
              error instanceof Error ? error.message : "Unknown error"
            }`,
          );
        },
      },
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Rename Project</DialogTitle>
          <DialogDescription>
            Enter a new name for your project.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            autoFocus
            maxLength={PROJECT_NAME_MAX_LENGTH}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={`Project name (max ${PROJECT_NAME_MAX_LENGTH} chars)`}
            aria-invalid={!name.trim()}
          />
          <p className="text-xs text-muted-foreground">
            {remaining} Characters remaining
          </p>
          <DialogFooter className="flex">
            <DialogClose asChild>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </DialogClose>

            <LoadingButton
              type="submit"
              isLoading={renameProject.isPending}
              disabled={!name.trim()}
              loadingText="Renaming..."
            >
              Rename
            </LoadingButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
