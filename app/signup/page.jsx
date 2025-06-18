"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { customToast } from "@/lib/Toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Eye, EyeOff, Loader } from "lucide-react";
import axios from "axios";
import clsx from "clsx";
import { useDispatch } from "react-redux";
import { setUser } from "@/globalStates/features/auth/authSlice";
import { useRouter } from "next/navigation";

export default function SignupForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    role: "",
    agreeToTerms: false,
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    if (field === "password") setShowPassword(false);
    if (field === "confirmPassword") setShowConfirm(false);
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePassword = (password) => {
    const validations = {
      length: password.length >= 8,
      upper: /[A-Z]/.test(password),
      lower: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      symbol: /[^A-Za-z0-9]/.test(password),
    };
    const isValid = Object.values(validations).every(Boolean);
    return { ...validations, isValid };
  };

  const validateName = (name) => {
    const trimmed = name.trim();
    const validPattern = /^[A-Za-zÀ-ÖØ-öø-ÿ]+([ '-]?[A-Za-zÀ-ÖØ-öø-ÿ]+)*$/;
    return trimmed.length >= 2 && validPattern.test(trimmed);
  };

  const nameValid = validateName(formData.name);
  const passwordStatus = validatePassword(formData.password);
  const emailValid = validateEmail(formData.email);
  const confirmPasswordMatch =
    formData.password && formData.confirmPassword === formData.password;

  const getStrengthColor = () => {
    const score = Object.values(passwordStatus).filter(Boolean).length;
    return score < 3
      ? "bg-red-500"
      : score < 5
        ? "bg-yellow-500"
        : "bg-green-600";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTouched({
      name: true,
      email: true,
      password: true,
      confirmPassword: true,
      gender: true,
      role: true,
    });

    const { isValid } = passwordStatus;
    if (!isValid || !emailValid || !confirmPasswordMatch || !nameValid) return;

    try {
      setLoading(true);
      const res = await axios.post(
        "/api/auth/register",
        {
          name: formData.name,
          email: formData.email,
          password: formData.confirmPassword,
          gender: formData.gender,
          role: formData.role,
          agreeToTerms: formData.agreeToTerms,
        },
        { withCredentials: true }
      );

      router.push("/login");

      customToast.success("User registered successfully!");
    } catch (err) {
      console.log(err.response?.data);
      setError(err.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 dark:bg-black dark:text-white">
      <div className="flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Get Started Now
            </h1>
          </div>
          {error && <p className="text-sm text-center text-red-500">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                onBlur={() => handleBlur("name")}
                placeholder="Enter your full name"
              />
              {touched.name && !nameValid && (
                <p className="text-sm text-red-500">
                  Name must be at least 2 characters and only contain letters,
                  spaces, apostrophes, or hyphens.
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                value={formData.email}
                type="email"
                placeholder="Enter your email"
                onChange={(e) => handleInputChange("email", e.target.value)}
                onBlur={() => handleBlur("email")}
              />
              {touched.email && !emailValid && (
                <p className="text-sm text-red-500">
                  Enter a valid email address
                </p>
              )}
            </div>

            <div className="space-y-2 relative">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                  onBlur={() => handleBlur("password")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-gray-600"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <div className="h-1 rounded bg-gray-200 mt-1 overflow-hidden">
                <div
                  className={clsx("h-full transition-all", getStrengthColor())}
                  style={{
                    width: `${Object.values(passwordStatus).filter(Boolean).length * 20}%`,
                  }}
                />
              </div>
              {touched.password && !passwordStatus.isValid && (
                <ul className="text-xs text-red-500 space-y-1 mt-1">
                  {!passwordStatus.length && <li>At least 8 characters</li>}
                  {!passwordStatus.upper && <li>Include capital letter</li>}
                  {!passwordStatus.lower && <li>Include lowercase letter</li>}
                  {!passwordStatus.number && <li>Include number</li>}
                  {!passwordStatus.symbol && <li>Include special symbol</li>}
                </ul>
              )}
              {touched.password && passwordStatus.isValid && (
                <p className="text-sm text-green-600">
                  {" "}
                  Your password is strong
                </p>
              )}
            </div>

            <div className="space-y-2 relative">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirm ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    handleInputChange("confirmPassword", e.target.value)
                  }
                  onBlur={() => handleBlur("confirmPassword")}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-2.5 text-gray-600"
                  tabIndex={-1}
                >
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {touched.confirmPassword && !confirmPasswordMatch && (
                <p className="text-sm text-red-500">Passwords do not match</p>
              )}
              {touched.confirmPassword && confirmPasswordMatch && (
                <p className="text-sm text-green-600">Passwords match</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Gender</Label>
              <Select
                onValueChange={(value) => handleInputChange("gender", value)}
              >
                <SelectTrigger className={"w-full"}>
                  <SelectValue placeholder="Select your gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MALE">Male</SelectItem>
                  <SelectItem value="FEMALE">Female</SelectItem>
                  <SelectItem value="OTHER">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Role</Label>
              <RadioGroup
                value={formData.role}
                onValueChange={(value) => handleInputChange("role", value)}
                className="flex gap-4 py-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="USER"
                    id="user"
                    className={"border-gray-500"}
                  />
                  <Label htmlFor="user">User</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="TRAINER"
                    id="trainer"
                    className={"border-gray-500"}
                  />
                  <Label htmlFor="trainer">Trainer</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={formData.agreeToTerms}
                className={"border-gray-500"}
                onCheckedChange={(checked) =>
                  handleInputChange("agreeToTerms", !!checked)
                }
              />
              <Label htmlFor="terms">I agree to the Terms & Policy</Label>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg"
            >
              {loading ? (
                <span className="flex items-center gap-4">
                  <Loader className="animate-spin w-5 h-5" />
                  Signing up...
                </span>
              ) : (
                "Signup"
              )}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-300 dark:border-gray-700" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-black text-gray-500 dark:text-gray-400">
                  or
                </span>
              </div>
            </div>

            <p className="text-center text-sm text-gray-500 dark:text-gray-400">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-600 hover:underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>

      <div className="hidden lg:block relative">
        <Image
          src="/image20.png"
          alt="Signup Illustration"
          layout="fill"
          objectFit="cover"
          quality={100}
          priority
        />
      </div>
    </div>
  );
}
