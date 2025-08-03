import { useProject } from "@/features/projects/hooks/useProject.ts";
import { useParams } from "react-router-dom";

export default function ProjectEditorPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const { data: project, isLoading, isError } = useProject(projectId);

  if (isLoading) return <p>Loading…</p>;
  if (isError || !project) return <p>Project not found</p>;

  return (
    <div className="grid gap-6">
      <h1 className="text-2xl font-semibold">{project.name}</h1>
      <p className="text-gray-500">This is the project editor page.</p>
      <p className="text-gray-500">
        You can edit your projects here. This is a placeholder page.
      </p>
    </div>
  );
}
