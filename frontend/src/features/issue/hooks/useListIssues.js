import { useQuery } from "@tanstack/react-query"
import { listIssues } from "../services/issueApi"

export const useListIssues = (projectId) => {
    return useQuery({
        queryKey: ["issues", projectId],
        queryFn: () => listIssues(projectId),
        enabled: Boolean(projectId)
    })
}