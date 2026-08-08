import { useQuery } from "@tanstack/react-query"
import { listActivityLog } from "../services/activityApi"

export const useListActivityLog = (issueId) => {
    return useQuery({
        queryKey: ["logs", issueId],
        queryFn: () => listActivityLog(issueId),
        enabled: Boolean(issueId)
    })
}