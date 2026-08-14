import { useQuery, keepPreviousData } from "@tanstack/react-query"
import { listIssues } from "../services/issueApi"

export const useListIssues = (projectId, filters = {}) => {
    return useQuery({
        queryKey: ["issues", projectId, filters],
        queryFn: () => listIssues(projectId, filters),
        enabled: Boolean(projectId),
        placeholderData: keepPreviousData,
    })
}