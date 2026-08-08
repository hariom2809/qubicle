import api from "../../../app/api"

export const listComments = async (issueId) => {
    const response = await api.get(`/issues/${issueId}/comments/`)
    return response.data
}

export const postComment = async ({issueId, body}) => {
    const response = await api.post(`/issues/${issueId}/comments/`, {body})
    return response.data
}