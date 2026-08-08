import api from "../../../app/api"

export const listActivityLog = async (issueId) => {
    const response = await api.get(`/issues/${issueId}/activity/`)
    return response.data
}