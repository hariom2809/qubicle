import { useQuery } from "@tanstack/react-query"
import { listProjects } from "../services/projectsApi" 

export const useProject = () => {
    return useQuery({
        queryKey: ["projects"],
        queryFn: listProjects
    })
}