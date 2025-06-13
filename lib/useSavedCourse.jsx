import { useQuery } from "@tanstack/react-query"
import axios from "axios"

const fetchSavedCourses = async (userId) => {
  const response = await axios.get(`/api/favorites/user/${userId}`)
  if (!response.data.success) {
    throw new Error("Failed to fetch favorites")
  }
  return response.data.favorites
}

const useSavedCourses = (userId) => {
  return useQuery({
    queryKey: ["savedCourses"],
    queryFn: () => fetchSavedCourses(userId),
    enabled: !!userId,
  })
}

export default useSavedCourses
