import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postComment } from "../services/commentApi";

export const usePostComment = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: postComment,
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: ["comments", variables.issueId]
        })
        }
    })
}