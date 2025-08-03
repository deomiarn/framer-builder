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
  const { mutateAsync: renameProject, isPending } = useRenameProject();

  useEffect(() => setName(projectName), [open, projectName]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const newName = name.trim();
    if (!newName) return;

    try {
      const project = await renameProject({ projectId, newName });
      onOpenChange(false);
      toast.success(`Project "${project.name}" renamed successfully!`);
    } catch (err) {
      console.error(err);
      toast.error(
        `Failed to rename project: ${err instanceof Error ? err.message : "Unknown error"}`,
      );
    }
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
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Project name"
            aria-invalid={!name.trim()}
          />

          <DialogFooter className="flex">
            <DialogClose asChild>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </DialogClose>

            <LoadingButton
              type="submit"
              isLoading={isPending}
              disabled={!name.trim()}
              loadingText="Rename project..."
            >
              Rename
            </LoadingButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
