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

interface NewProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function NewProjectDialog({
  open,
  onOpenChange,
}: NewProjectDialogProps) {
  const [name, setName] = useState("Untitled project");
  const navigate = useNavigate();
  const { mutateAsync: createProject, isPending } = useCreateProject();

  useEffect(() => {
    if (open) setName("Untitled project");
  }, [open]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;

    try {
      const project = await createProject(trimmed);
      onOpenChange(false);
      navigate(`/projects/${project.id}`);
    } catch (err) {
      console.error(err);
    }
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
