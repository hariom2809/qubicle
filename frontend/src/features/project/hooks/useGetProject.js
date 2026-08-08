import { useQuery } from "@tanstack/react-query"
import { getProject } from "../services/projectsApi"

export const useGetProject = (projectId) => {
    return useQuery({
        queryKey: ["project", projectId],
        queryFn: () => getProject(projectId),
        enabled: Boolean(projectId),
    })
}