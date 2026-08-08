import api from "../../../app/api"

export const listIssues = async (projectId) => {
    const response = await api.get(`/projects/${projectId}/issues/`)
    return response.data
}

export const createIssue = async ({projectid, issueData}) => {
    const response = await api.post(`/projects/${projectid}/issues/`, issueData)
    return response.data
}

export const updateIssue = async (issueId, issueData) => {
    const response = await api.patch(`/issues/${issueId}/`, issueData)
    return response.data
}

export const getIssue = async (issueId) => {
    const response = await api.get(`/issues/${issueId}`)
    return response.data
}