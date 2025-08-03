import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/shared/lib/supabase.ts";
import { projectsKey } from "@/features/projects/hooks/keys.ts";

interface RenameInput {
  projectId: string;
  newName: string;
}

export function useRenameProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ projectId, newName }: RenameInput) => {
      const { data, error } = await supabase
        .from("projects")
        .update({ name: newName })
        .eq("id", projectId)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: projectsKey }),
  });
}
