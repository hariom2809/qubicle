import { useQuery, keepPreviousData } from "@tanstack/react-query"
import { searchUsers } from "../services/memberApi"

export const useSearchUsers = (query) => {
    return useQuery({
        queryKey: ["user-search", query],
        queryFn: () => searchUsers(query),
        enabled: query.trim().length > 0,
        placeholderData: keepPreviousData,
        retry: false,
    })
}
