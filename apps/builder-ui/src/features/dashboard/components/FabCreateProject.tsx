import { Button } from "@/shared/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import NewProjectDialog from "@/features/dashboard/components/dialog/NewProjectDialog.tsx";

export default function FabCreateProject() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className="fixed z-50 bottom-8 right-8 rounded-full p-0 h-14 w-14 shadow-2xl"
      >
        <Plus className="h-6 w-6" />
      </Button>
      <NewProjectDialog open={open} onOpenChange={setOpen} />
    </>
  );
}
