import { useProjects } from "../projects/hooks/useProjects";
import { ProjectsSkeleton } from "@/features/dashboard/components/ProjectsSkeleton.tsx";
import { EmptyCard } from "@/features/dashboard/components/card/EmptyCard.tsx";
import { ProjectCard } from "@/features/dashboard/components/card/ProjectCard.tsx";
import FabCreateProject from "@/features/dashboard/components/FabCreateProject.tsx";

export default function DashboardPage() {
  const { data = [], isLoading } = useProjects();

  if (isLoading) return <ProjectsSkeleton />;

  return (
    <>
      <FabCreateProject />
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data.length === 0 ? (
          <EmptyCard />
        ) : (
          data.map((p) => <ProjectCard project={p} />)
        )}
      </div>
    </>
  );
}
