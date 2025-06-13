"use client"

import { signIn } from "next-auth/react"
import { useState } from "react"
import { useRouter } from "next/navigation" // next/navigation for app dir, else use next/router
import { useDispatch } from "react-redux"
import axios from "axios"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { FaApple } from "react-icons/fa"

import { setUser } from "@/globalStates/features/auth/authSlice"
import { Loader } from "lucide-react"

export default function LoginForm() {
  const router = useRouter()
  const dispatch = useDispatch()
  const handleLogin = () => {
    window.location.href = "/api/auth/oauth/google"
  }

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const { data } = await axios.post(
        "/api/auth/login",
        {
          email: formData.email,
          password: formData.password,
        },
        { withCredentials: true }
      )

      const { user } = data
      dispatch(setUser(user))

      if (user.role === "ADMIN") {
        router.push("/admin")
      } else if (user.role === "TRAINER") {
        router.push("/trainer")
      } else {
        router.push("/user")
      }
    } catch (err) {
      console.error("Login failed:", err)
      setError(err.response?.data?.message || "Invalid credentials")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="h-screen flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center h-screen justify-center p-4 lg:p-8">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md space-y-6"
          noValidate
        >
          <div className="text-center space-y-2">
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
              Welcome back!
            </h1>
            <p className="text-sm text-gray-600 dark:text-white">
              Enter your credentials to access your account
            </p>
          </div>

          {error && (
            <p className="text-red-600 text-sm text-center font-medium">
              {error}
            </p>
          )}

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="/forgot-password"
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                required
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={formData.rememberMe}
                onCheckedChange={(checked) =>
                  handleInputChange("rememberMe", checked)
                }
              />
              <Label
                htmlFor="remember"
                className="text-sm text-gray-600 cursor-pointer dark:text-white"
              >
                Remember for 30 days
              </Label>
            </div>

            <Button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader className="animate-spin w-5 h-5" /> Logging in...
                </span>
              ) : (
                "Login"
              )}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">or</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Button
                variant="outline"
                className="w-full flex items-center justify-center space-x-2 py-3"
                onClick={handleLogin}
              >
                {/* Google Icon SVG */}
                <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.76c1.63 0 3.09.56 4.23 1.66l3.17-3.17C17.45 1.18 14.89 0 12 0 7.7 0 3.99 2.47 2.18 6.07l3.66 2.84C6.71 6.69 9.14 4.76 12 4.76z"
                  />
                </svg>
                <span>Login with Google</span>
              </Button>

              <Button
                variant="outline"
                className="w-full flex items-center justify-center space-x-2 py-3"
              >
                <FaApple className="w-5 h-5 text-black dark:text-white" />
                <span className="text-sm">Sign in with Apple</span>
              </Button>
            </div>
          </div>

          <div className="text-center text-sm text-gray-600 dark:text-white">
            Don’t have an account?{" "}
            <Link href="/signup" className="text-blue-600 font-medium">
              Sign up
            </Link>
          </div>
        </form>
      </div>

      {/* Right Side Image */}
      <div className="hidden lg:block flex-1 relative h-screen">
        <img
          src="/image20.png"
          alt="Login visual"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  )
}
