import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/shared/lib/supabase.ts";
import type { Project } from "@/shared/types/project.ts";
import { projectsKey } from "@/features/projects/hooks/keys.ts";

export function useCreateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (projectName: string) => {
      const { data, error } = await supabase
        .from("projects")
        .insert({ name: projectName })
        .select()
        .single<Project>();

      if (error) throw error;
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: projectsKey }),
  });
}
