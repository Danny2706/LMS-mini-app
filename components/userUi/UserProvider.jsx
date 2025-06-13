"use client"

import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setUser } from "@/globalStates/features/auth/authSlice"
import axios from "axios"

const fetchSavedCourses = async (userId) => {
  const response = await axios.get(`/api/favorites/user/${userId}`)
  if (!response.data.success) throw new Error("Failed to fetch favorites")
  return response.data.favorites
}

export default function UserProvider({ user, children }) {
  const dispatch = useDispatch()

  useEffect(() => {
    if (user) {
      console.log(user)
      dispatch(setUser(user))
    }
  }, [user, dispatch])

  return children
}
