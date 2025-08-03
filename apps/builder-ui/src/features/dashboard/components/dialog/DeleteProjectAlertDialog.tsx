import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/shared/components/ui/alert-dialog";
import { useDeleteProject } from "@/features/projects/hooks/useDeleteProject.ts";
import { toast } from "sonner";

interface DeleteProjectAlertDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projectId: string;
  projectName: string;
}

export function DeleteProjectAlertDialog({
  open,
  onOpenChange,
  projectId,
  projectName,
}: DeleteProjectAlertDialogProps) {
  const deleteProject = useDeleteProject();

  function handleDelete() {
    deleteProject.mutate(projectId, {
      onSuccess: () => {
        onOpenChange(false);
        toast.success(`Project "${projectName} deleted successfully!`);
      },
      onError: (err) => {
        console.error("Failed to delete project:", err);
        toast.error(
          `Failed to delete project: ${err instanceof Error ? err.message : "Unknown error"}`,
        );
      },
    });
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete{" "}
            <b>{projectName}</b> and all of its data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-500 hover:bg-red-600"
            onClick={handleDelete}
          >
            Delete Project
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
