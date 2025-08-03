import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/shared/components/ui/card.tsx";
import { CirclePlus } from "lucide-react";
import { useState } from "react";
import { Button } from "@/shared/components/ui/button.tsx";
import NewProjectDialog from "@/features/dashboard/components/dialog/NewProjectDialog.tsx";

export function EmptyCard() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Card className="flex h-48 w-full flex-col items-center justify-center gap-3">
        <CardHeader className="flex flex-col w-full text-center items-center">
          <CirclePlus className="h-6 w-6 text-muted-foreground" />
          <h3 className="text-base font-medium break-words">No projects yet</h3>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Start your first project by clicking below.
        </CardContent>
        <CardFooter className="mt-auto">
          <Button onClick={() => setOpen(true)}>Create project</Button>
        </CardFooter>
      </Card>
      <NewProjectDialog open={open} onOpenChange={setOpen} />
    </>
  );
}
