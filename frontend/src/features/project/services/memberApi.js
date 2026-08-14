import api from "../../../app/api"

export const searchUsers = async (query) => {
    const response = await api.get("/search/user/", {
        params: { q: query },
    })
    return response.data
}

export const addMember = async ({ projectId, user, role }) => {
    const response = await api.post(`/projects/${projectId}/members/`, {
        user,
        role,
    })
    return response.data
}
