import { useQueryClient, useMutation } from "@tanstack/react-query"
import { postProject } from "../services/projectsApi"

export const useCreateProject = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: postProject,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["projects"],
            })
        }
    })
}