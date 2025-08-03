import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/shared/lib/supabase.ts";
import type { Project } from "@/shared/types/project.ts";

export function useProject(id?: string) {
  return useQuery<Project>({
    queryKey: ["projects", id],
    queryFn: async () => {
      if (!id) throw new Error("No project id provided");

      const { data, error } = await supabase
        .from("projects")
        .select()
        .eq("id", id)
        .single<Project>();
      
      if (error) throw error;
      return data;
    },
  });
}
