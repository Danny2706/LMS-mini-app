"use client"

import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setUser } from "@/globalStates/features/auth/authSlice"

export default function AdminProvider({ user, children }) {
  const dispatch = useDispatch()

  useEffect(() => {
    if (user) {
      console.log(user)
      dispatch(setUser(user))
    }
  }, [user, dispatch])

  return children
}
