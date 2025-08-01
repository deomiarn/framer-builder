import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { CirclePlus } from "lucide-react";

export function EmptyCard({ onCreate }: { onCreate: () => void }) {
  return (
    <Card className="flex h-48 w-full flex-col items-center justify-center gap-3">
      <CardHeader className="flex flex-col w-full text-center items-center">
        <CirclePlus className="h-6 w-6 text-muted-foreground" />
        <h3 className="text-base font-medium break-words">No projects yet</h3>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">
        Start your first project by clicking below.
      </CardContent>
      <CardFooter className="mt-auto">
        <Button onClick={onCreate}>Create project</Button>
      </CardFooter>
    </Card>
  );
}
