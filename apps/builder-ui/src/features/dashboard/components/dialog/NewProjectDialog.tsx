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
import { useNavigate } from "react-router-dom";
import { useCreateProject } from "@/features/projects/hooks/useCreateProject.ts";
import { Input } from "@/shared/components/ui/input.tsx";
import { Button } from "@/shared/components/ui/button.tsx";
import LoadingButton from "@/shared/components/ui/loadingButton.tsx";
import { toast } from "sonner";
import { PROJECT_NAME_MAX_LENGTH } from "@/shared/constants/project.ts";

interface NewProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function NewProjectDialog({
  open,
  onOpenChange,
}: NewProjectDialogProps) {
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const createProject = useCreateProject();
  const remaining = PROJECT_NAME_MAX_LENGTH - name.length;

  useEffect(() => {
    if (open) setName("");
  }, [open]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;

    createProject.mutate(trimmed, {
      onSuccess: (project) => {
        onOpenChange(false);
        navigate(`/projects/${project.id}`);
        toast.success(`Project "${trimmed}" created successfully!`);
      },
      onError: (error) => {
        console.error("Failed to create project:", error);
        toast.error(
          `Failed to create project: ${
            error instanceof Error ? error.message : "Unknown error"
          }`,
        );
      },
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>New Project</DialogTitle>
          <DialogDescription>
            Create a new project to start building your application.
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
              isLoading={createProject.isPending}
              disabled={!name.trim()}
              loadingText="Creating..."
            >
              Create & Open
            </LoadingButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
