"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Pencil,
  Check,
  X,
  User,
  Mail,
  User2,
  Phone,
  BookOpen,
  Award,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "@/components/ui/select";

export default function TrainerProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "+1 234 567 890",
    specialization: "Web Development",
    experience: "5 years",
    bio: "Experienced web development instructor with expertise in modern JavaScript frameworks and full-stack development.",
    avatar: "/trainer-avatar.jpg",
    gender: "Male",
  });

  const [editForm, setEditForm] = useState({ ...profile });

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setProfile(editForm);
    setIsEditing(false);
  };

  return (
    <div className="container mx-auto px-4 pb-8 mt-6 ">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-[#006838] to-[#8dc63f] rounded-lg p-4 sm:p-6 text-white mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold">Profile Settings</h1>
            <p className="text-blue-100 text-sm sm:text-base">
              Manage your personal information and preferences
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center mb-8">
        <Avatar className="h-24 w-24 mb-4 border-2 border-primary">
          <AvatarImage src={profile.avatar} />
          <AvatarFallback>
            <User className="h-10 w-10" />
          </AvatarFallback>
        </Avatar>
        <h1 className="text-2xl font-bold">{profile.name}</h1>
        <p className="text-muted-foreground">Trainer</p>
      </div>

      {/* Profile Info - View Mode */}
      {!isEditing && (
        <div className="space-y-6 bg-background rounded-lg p-6 shadow-sm">
          <div className="flex items-center gap-4 p-3 hover:bg-accent/50 rounded-md transition-colors">
            <div className="bg-accent p-2 rounded-full">
              <User className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-medium text-muted-foreground">
                Full Name
              </h3>
              <p>{profile.name}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-3 hover:bg-accent/50 rounded-md transition-colors">
            <div className="bg-accent p-2 rounded-full">
              <Mail className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-medium text-muted-foreground">
                Email
              </h3>
              <p>{profile.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-3 hover:bg-accent/50 rounded-md transition-colors">
            <div className="bg-accent p-2 rounded-full">
              <User2 className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-medium text-muted-foreground">
                Gender
              </h3>
              <p>{profile.gender}</p>
            </div>
          </div>
          <div className="pt-4 ">
            <Button
              onClick={() => setIsEditing(true)}
              className="w-full  bg-green-600 hover:bg-green-700 text-white"
            >
              <Pencil className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          </div>
        </div>
      )}

      {/* Edit Form */}
      {isEditing && (
        <div className="bg-background rounded-lg p-6 shadow-sm space-y-6">
          <h2 className="text-xl font-semibold ">Edit Profile</h2>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                value={editForm.name}
                onChange={handleEditChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={editForm.email}
                onChange={handleEditChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select
                value={editForm.gender}
                onValueChange={(value) =>
                  setEditForm({ ...editForm, gender: value })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Genders</SelectLabel>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              variant="outline"
              onClick={() => {
                setIsEditing(false);
                setEditForm({ ...profile });
              }}
              className="flex-1"
            >
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button onClick={handleSave} className="flex-1" color="#8dc63f">
              <Check className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
