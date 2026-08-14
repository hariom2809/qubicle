import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addMember } from "../services/memberApi"

export const useAddMember = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: addMember,
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["projects"] })
            queryClient.invalidateQueries({ queryKey: ["project", variables.projectId] })
        },
    })
}
