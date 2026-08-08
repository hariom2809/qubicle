import { useMutation } from "@tanstack/react-query"
import { updateIssue } from "../services/issueApi"

export const useUpdateIssue = () => {
    return useMutation({
        mutationFn: ({issueId, issueData}) => updateIssue(issueId, issueData)
    })
}