import api from "../../../app/api"

export const listProjects = async () => {
    const response = await api.get("/projects/")
    return response.data
}

export const postProject = async (projectData) => {
    const response = await api.post("/projects/", projectData)
    return response.data
}

export const getProject = async (projectId) => {
    const response = await api.get(`/projects/${projectId}`)
    return response.data
}