"use client"

import { useState, useRef, useEffect } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import {
  Pencil,
  Check,
  X,
  User as UserIcon,
  Mail,
  User2,
  Upload,
  Loader2,
  Shield,
} from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { customToast } from "@/lib/Toast"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { setUser } from "@/globalStates/features/auth/authSlice"

export default function ProfilePage() {
  const fileInputRef = useRef(null)
  const { user } = useSelector((store) => store.auth)
  const [isEditing, setIsEditing] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [previewImage, setPreviewImage] = useState(null)
  const [selectedFile, setSelectedFile] = useState(null)
  const dispatch = useDispatch()

  const [profile, setProfile] = useState({
    id: user?.id,
    name: user?.name,
    email: user?.email,
    avatar: user?.profilePic,
    gender: user?.gender,
    role: user?.role,
  })

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: profile.name,
      email: profile.email,
      gender: profile.gender,
    },
  })

  useEffect(() => {
    reset({
      name: profile.name,
      email: profile.email,
      gender: profile.gender,
    })
  }, [profile, reset])

  const handleImageClick = () => {
    fileInputRef.current.click()
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    if (!file.type.startsWith("image/")) {
      customToast.error("Please upload an image file")
      return
    }

    if (file.size > 2 * 1024 * 1024) {
      customToast.error("Please upload an image smaller than 2MB")
      return
    }

    setSelectedFile(file)

    const reader = new FileReader()
    reader.onload = () => {
      setPreviewImage(reader.result)
    }
    reader.readAsDataURL(file)
  }

  const onSubmit = async (data) => {
    setIsUploading(true)
    try {
      const formData = new FormData()
      formData.append("name", data.name)
      formData.append("gender", data.gender)

      // Only append the file if a new one was selected
      if (selectedFile) {
        formData.append("profilePic", selectedFile)
      }

      const res = await axios.put(`/api/user/${user.id}`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      })

      if (res.data.success) {
        customToast.success("Successfully updated you profile.")
        setProfile({
          ...profile,
          name: res.data.user.name,
          email: res.data.user.email,
          gender: res.data.user.gender,
          avatar: res.data.user.profilePic,
        })

        dispatch(setUser(res.data.user))
        setIsEditing(false)
        setPreviewImage(null)
        setSelectedFile(null)
      } else {
        customToast.error(res.data.error)
      }
    } catch (error) {
      console.log(error)
      customToast.error(error.response?.data?.error || "Something went wrong.")
    } finally {
      setIsUploading(false)
    }
  }

  const genderOptions = [
    { value: "MALE", label: "Male" },
    { value: "FEMALE", label: "Female" },
    { value: "OTHER", label: "Other" },
  ]

  const roleBadgeColor = {
    USER: "bg-blue-500 hover:bg-blue-600",
    ADMIN: "bg-purple-500 hover:bg-purple-600",
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="flex flex-col items-center mb-8">
        <div className="relative group">
          <Avatar
            className="h-32 w-32 mb-4 border-4 border-primary cursor-pointer shadow-lg"
            onClick={isEditing ? handleImageClick : undefined}
          >
            <AvatarImage
              src={previewImage || profile.avatar}
              className="object-cover"
            />
            <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white">
              <UserIcon className="h-12 w-12" />
            </AvatarFallback>
          </Avatar>
          {isEditing && (
            <>
              <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                <Upload className="h-6 w-6 text-white" />
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
              />
            </>
          )}
        </div>
        <h1 className="text-3xl font-bold text-center">{profile.name}</h1>
        <div className="flex items-center gap-2 mt-2">
          <Badge className={roleBadgeColor[profile.role]}>
            <Shield className="h-3 w-3 mr-1" />
            {profile.role}
          </Badge>
        </div>
      </div>

      {!isEditing && (
        <Card className="overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10 border-b">
            <h2 className="text-xl font-semibold">Profile Information</h2>
          </CardHeader>
          <CardContent className="p-0 divide-y">
            <div className="flex items-center gap-4 p-4 hover:bg-accent/50 transition-colors">
              <div className="bg-primary/10 p-3 rounded-full">
                <UserIcon className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium text-muted-foreground">
                  Full Name
                </h3>
                <p className="font-medium">{profile.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 hover:bg-accent/50 transition-colors">
              <div className="bg-primary/10 p-3 rounded-full">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium text-muted-foreground">
                  Email
                </h3>
                <p className="font-medium">{profile.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 hover:bg-accent/50 transition-colors">
              <div className="bg-primary/10 p-3 rounded-full">
                <User2 className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium text-muted-foreground">
                  Gender
                </h3>
                <p className="font-medium">
                  {genderOptions.find((g) => g.value === profile.gender)?.label}
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="p-4">
            <Button
              onClick={() => setIsEditing(true)}
              className="w-full"
              variant="outline"
            >
              <Pencil className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          </CardFooter>
        </Card>
      )}

      {isEditing && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Card>
            <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10 border-b">
              <h2 className="text-xl font-semibold">Edit Profile</h2>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  {...register("name", { required: "Name is required" })}
                  placeholder="Enter your full name"
                />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  disabled={true}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select
                  value={watch("gender")}
                  onValueChange={(value) => setValue("gender", value)}
                >
                  <SelectTrigger className={"w-full"}>
                    <SelectValue placeholder="Select a gender" />
                  </SelectTrigger>
                  <SelectContent>
                    {genderOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Profile Picture</Label>
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={previewImage || profile.avatar} />
                    <AvatarFallback>
                      <UserIcon className="h-8 w-8" />
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    variant="outline"
                    type="button"
                    onClick={handleImageClick}
                    className="gap-2"
                  >
                    <Upload className="h-4 w-4" />
                    {previewImage ? "Change Image" : "Upload Image"}
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex gap-3 pt-4">
              <Button
                variant="outline"
                type="button"
                onClick={() => {
                  setIsEditing(false)
                  setPreviewImage(null)
                  setSelectedFile(null)
                  reset()
                }}
                className="flex-1"
              >
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button type="submit" className="flex-1" disabled={isUploading}>
                {isUploading ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Check className="h-4 w-4 mr-2" />
                )}
                {isUploading ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </form>
      )}
    </div>
  )
}
