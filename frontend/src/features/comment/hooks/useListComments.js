import { useQuery } from "@tanstack/react-query"
import { listComments } from "../services/commentApi"

export const useListComments = (issueId) => {
    return useQuery({
        queryKey: ["comments", issueId],
        queryFn: () => listComments(issueId),
        enabled: Boolean(issueId),
    })
}