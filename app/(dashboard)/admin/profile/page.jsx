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
import { useSearchParams } from "next/navigation"

export default function ProfilePage() {
  const searchParams = useSearchParams()
  const editParam = searchParams.get('edit')
  const [isEditing, setIsEditing] = useState(editParam === 'true')
  const fileInputRef = useRef(null)
  const { user } = useSelector((store) => store.auth)
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

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="flex flex-col items-center mb-8">
        <div className="relative group">
          <Avatar
            className="h-32 w-32 mb-4 border-4 border-[#006838] dark:border-[#8dc63f] cursor-pointer shadow-lg hover:shadow-xl transition-shadow"
            onClick={isEditing ? handleImageClick : undefined}
          >
            <AvatarImage
              src={previewImage || profile.avatar}
              className="object-cover"
            />
            <AvatarFallback className="bg-gradient-to-r from-[#006838] to-[#8dc63f] text-white">
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
        <h1 className="text-3xl font-bold text-center text-[#006838] dark:text-[#8dc63f]">
          {profile.name}
        </h1>
        <div className="flex items-center gap-2 mt-2">
          <Badge className="bg-gradient-to-r from-[#006838] to-[#8dc63f] text-white">
            <Shield className="h-3 w-3 mr-1" />
            {profile.role}
          </Badge>
        </div>
      </div>

      {!isEditing && (
        <Card className="overflow-hidden border-[#e0e0e0] dark:border-[#333] hover:shadow-lg transition-shadow">
          <CardHeader className="bg-gradient-to-r from-[#006838]/10 to-[#8dc63f]/10 border-b border-[#e0e0e0] dark:border-[#333]">
            <h2 className="text-xl font-semibold text-[#006838] dark:text-[#8dc63f]">
              Profile Information
            </h2>
          </CardHeader>
          <CardContent className="p-0 divide-y divide-[#e0e0e0] dark:divide-[#333]">
            <div className="flex items-center gap-4 p-4 hover:bg-[#e8f5e9]/50 dark:hover:bg-[#006838]/20 transition-colors">
              <div className="bg-[#006838]/10 p-3 rounded-full">
                <UserIcon className="h-5 w-5 text-[#006838] dark:text-[#8dc63f]" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Full Name
                </h3>
                <p className="font-medium text-[#006838] dark:text-[#8dc63f]">
                  {profile.name}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 hover:bg-[#e8f5e9]/50 dark:hover:bg-[#006838]/20 transition-colors">
              <div className="bg-[#006838]/10 p-3 rounded-full">
                <Mail className="h-5 w-5 text-[#006838] dark:text-[#8dc63f]" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Email
                </h3>
                <p className="font-medium text-[#006838] dark:text-[#8dc63f]">
                  {profile.email}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 hover:bg-[#e8f5e9]/50 dark:hover:bg-[#006838]/20 transition-colors">
              <div className="bg-[#006838]/10 p-3 rounded-full">
                <User2 className="h-5 w-5 text-[#006838] dark:text-[#8dc63f]" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Gender
                </h3>
                <p className="font-medium text-[#006838] dark:text-[#8dc63f]">
                  {genderOptions.find((g) => g.value === profile.gender)?.label}
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="p-4">
            <Button
              onClick={() => setIsEditing(true)}
              className="w-full bg-gradient-to-r from-[#006838] to-[#8dc63f] text-white hover:from-[#006838]/90 hover:to-[#8dc63f]/90"
            >
              <Pencil className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          </CardFooter>
        </Card>
      )}

      {isEditing && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Card className="border-[#e0e0e0] dark:border-[#333] hover:shadow-lg transition-shadow">
            <CardHeader className="bg-gradient-to-r from-[#006838]/10 to-[#8dc63f]/10 border-b border-[#e0e0e0] dark:border-[#333]">
              <h2 className="text-xl font-semibold text-[#006838] dark:text-[#8dc63f]">
                Edit Profile
              </h2>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-[#006838] dark:text-[#8dc63f]">
                  Full Name
                </Label>
                <Input
                  id="name"
                  {...register("name", { required: "Name is required" })}
                  placeholder="Enter your full name"
                  className="border-[#e0e0e0] dark:border-[#333] focus:border-[#006838] focus:ring-[#006838]"
                />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-[#006838] dark:text-[#8dc63f]">
                  Email
                </Label>
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
                  className="border-[#e0e0e0] dark:border-[#333] focus:border-[#006838] focus:ring-[#006838]"
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="gender" className="text-[#006838] dark:text-[#8dc63f]">
                  Gender
                </Label>
                <Select
                  value={watch("gender")}
                  onValueChange={(value) => setValue("gender", value)}
                >
                  <SelectTrigger className="w-full border-[#e0e0e0] dark:border-[#333] focus:border-[#006838] focus:ring-[#006838]">
                    <SelectValue placeholder="Select a gender" />
                  </SelectTrigger>
                  <SelectContent className="border-[#e0e0e0] dark:border-[#333]">
                    {genderOptions.map((option) => (
                      <SelectItem 
                        key={option.value} 
                        value={option.value}
                        className="hover:bg-[#e8f5e9] dark:hover:bg-[#006838]/20"
                      >
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-[#006838] dark:text-[#8dc63f]">Profile Picture</Label>
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16 border border-[#e0e0e0] dark:border-[#333]">
                    <AvatarImage src={previewImage || profile.avatar} />
                    <AvatarFallback className="bg-[#e8f5e9] text-[#006838] dark:bg-[#006838]/20 dark:text-[#8dc63f]">
                      <UserIcon className="h-8 w-8" />
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    variant="outline"
                    type="button"
                    onClick={handleImageClick}
                    className="gap-2 border-[#006838] text-[#006838] hover:bg-[#006838]/10 dark:border-[#8dc63f] dark:text-[#8dc63f] dark:hover:bg-[#8dc63f]/10"
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
                className="flex-1 border-[#006838] text-[#006838] hover:bg-[#006838]/10 dark:border-[#8dc63f] dark:text-[#8dc63f] dark:hover:bg-[#8dc63f]/10"
              >
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="flex-1 bg-gradient-to-r from-[#006838] to-[#8dc63f] text-white hover:from-[#006838]/90 hover:to-[#8dc63f]/90"
                disabled={isUploading}
              >
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