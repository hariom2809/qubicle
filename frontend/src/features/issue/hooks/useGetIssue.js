import { useQuery } from "@tanstack/react-query";
import { getIssue } from "../services/issueApi";

export const useGetIssue = (issueId) => {
    return useQuery({
        queryKey: ["issue", issueId],
        queryFn: () => getIssue(issueId),
        enabled: Boolean(issueId),
    })
}