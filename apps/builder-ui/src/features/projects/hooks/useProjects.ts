import { useQuery } from "@tanstack/react-query";
import type { Project } from "@/shared/types/project.ts";
import { supabase } from "@/shared/lib/supabase.ts";
import { projectsKey } from "@/features/projects/hooks/keys.ts";

export function useProjects() {
  return useQuery<Project[]>({
    queryKey: projectsKey,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data ?? [];
    },
  });
}
