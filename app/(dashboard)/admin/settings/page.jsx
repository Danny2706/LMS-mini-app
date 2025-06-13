"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Search,
  FileEdit,
  Trash2,
  Save,
  Settings,
  Shield,
  BookText,
  Bell,
  Users,
  Globe,
  Calendar,
  Languages,
  Lock,
  Clock,
  Mail,
  File,
  CheckCircle,
  Star,
  MessageSquare,
  Download,
  Upload,
  HardDrive,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AdminSettingsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("system");

  // Settings state
  const [settings, setSettings] = useState({
    // System Settings
    siteTitle: "Learning Management System",
    siteLogo: "",
    maintenanceMode: false,
    registrationEnabled: true,
    timezone: "UTC",
    dateFormat: "MM/DD/YYYY",
    defaultLanguage: "en",
    enableCDN: false,
    googleAnalyticsId: "",
    cookieConsent: true,
    privacyPolicyUrl: "",
    termsOfServiceUrl: "",

    // Security Settings
    passwordComplexity: "medium",
    loginAttempts: 5,
    sessionTimeout: 30,
    twoFactorAuth: false,
    forceHTTPS: true,
    passwordResetExpiry: 24,
    userDataExport: true,
    ipFiltering: false,
    allowedIPs: [],
    inactivityTimeout: 15,

    // Content Settings
    fileSizeLimit: 50,
    allowedFileTypes: ["pdf", "docx", "pptx", "jpg", "png"],
    autoApproveCourses: false,
    enableRatings: true,
    minRatingToPublish: 3,
    enableContentVersioning: true,
    maxVersionsToKeep: 5,

    // Notification Settings
    emailNotifications: true,
    notificationFrequency: "daily",
    adminAlerts: true,

    // User Management
    defaultUserRole: "student",
    allowProfileEdits: true,
    enableGravatar: false,
    userRegistrationFields: ["Name", "Email Address", "Password", "Confirm Password", "Gender", "Role"],
    customRegistrationFields: [],
    deleteInactiveUsers: false,
    inactiveUserThreshold: 365,
  });

  const handleChange = (key, value) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Settings saved successfully");
    } catch (error) {
      toast.error("Failed to save settings");
    } finally {
      setIsSaving(false);
    }
  };

  const stats = [
    {
      title: "System Settings",
      value: "12",
      description: "Active configurations",
      icon: Settings,
    },
    {
      title: "Security Rules",
      value: "8",
      description: "Protection measures",
      icon: Shield,
    },
    {
      title: "Content Policies",
      value: "7",
      description: "Management rules",
      icon: BookText,
    },
  ];

  return (
    <div className="space-y-6 p-4 pt-7">
      {/* Header Section */}

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#006838] dark:text-[#8dc63f]">
            Admin Settings
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Configure system-wide settings and preferences
          </p>
        </div>
        <Button
          onClick={handleSave}
          className="bg-gradient-to-r from-[#006838] to-[#8dc63f] text-white hover:from-[#006838]/90 hover:to-[#8dc63f]/90"
          disabled={isSaving}
        >
          <Save className="mr-2 h-4 w-4" />
          {isSaving ? "Saving..." : "Save Settings"}
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat, index) => (
          <Card
            key={index}
            className="border-[#e0e0e0] dark:border-[#333] hover:shadow-lg transition-shadow"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[#006838] dark:text-[#8dc63f]">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-[#006838] dark:text-[#8dc63f]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#006838] dark:text-[#8dc63f]">
                {stat.value}
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-300">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList className="bg-[#e8f5e9] dark:bg-[#006838]/20 border border-[#e0e0e0] dark:border-[#333]">
          <TabsTrigger
            value="system"
            className="data-[state=active]:bg-[#006838] data-[state=active]:text-white text-[#006838] dark:text-[#8dc63f]"
          >
            <Settings className="mr-2 h-4 w-4" /> System
          </TabsTrigger>
          <TabsTrigger
            value="security"
            className="data-[state=active]:bg-[#006838] data-[state=active]:text-white text-[#006838] dark:text-[#8dc63f]"
          >
            <Shield className="mr-2 h-4 w-4" /> Security
          </TabsTrigger>
          <TabsTrigger
            value="content"
            className="data-[state=active]:bg-[#006838] data-[state=active]:text-white text-[#006838] dark:text-[#8dc63f]"
          >
            <BookText className="mr-2 h-4 w-4" /> Content
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="data-[state=active]:bg-[#006838] data-[state=active]:text-white text-[#006838] dark:text-[#8dc63f]"
          >
            <Bell className="mr-2 h-4 w-4" /> Notifications
          </TabsTrigger>
          <TabsTrigger
            value="users"
            className="data-[state=active]:bg-[#006838] data-[state=active]:text-white text-[#006838] dark:text-[#8dc63f]"
          >
            <Users className="mr-2 h-4 w-4" /> Users
          </TabsTrigger>
        </TabsList>

        
        {/* System Settings Tab */}
        <TabsContent value="system" className="space-y-4">
          <Card className="border-[#e0e0e0] dark:border-[#333] hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-[#006838] dark:text-[#8dc63f] flex items-center gap-2">
                <Settings className="h-5 w-5" /> System Configuration
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-300">
                Manage core system settings and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="siteTitle">Site Title</Label>
                  <Input
                    id="siteTitle"
                    value={settings.siteTitle}
                    onChange={(e) => handleChange("siteTitle", e.target.value)}
                    className="border-[#e0e0e0] dark:border-[#333] focus:border-[#006838] focus:ring-[#006838]"
                  />
                </div>

                <div>
                  <Label htmlFor="siteLogo">Site Logo URL</Label>
                  <Input
                    id="siteLogo"
                    value={settings.siteLogo}
                    onChange={(e) => handleChange("siteLogo", e.target.value)}
                    placeholder="https://example.com/logo.png"
                    className="border-[#e0e0e0] dark:border-[#333] focus:border-[#006838] focus:ring-[#006838]"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="maintenanceMode"
                    checked={settings.maintenanceMode}
                    onCheckedChange={(checked) =>
                      handleChange("maintenanceMode", checked)
                    }
                    className="data-[state=checked]:bg-[#006838]"
                  />
                  <Label htmlFor="maintenanceMode">Maintenance Mode</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="registrationEnabled"
                    checked={settings.registrationEnabled}
                    onCheckedChange={(checked) =>
                      handleChange("registrationEnabled", checked)
                    }
                    className="data-[state=checked]:bg-[#006838]"
                  />
                  <Label htmlFor="registrationEnabled">
                    Allow New Registrations
                  </Label>
                </div>

                <div>
                  <Label>Timezone</Label>
                  <Select
                    value={settings.timezone}
                    onValueChange={(value) => handleChange("timezone", value)}
                  >
                    <SelectTrigger className="border-[#e0e0e0] dark:border-[#333] focus:border-[#006838] focus:ring-[#006838]">
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="UTC">UTC</SelectItem>
                      <SelectItem value="EST">Eastern Time (EST)</SelectItem>
                      <SelectItem value="PST">Pacific Time (PST)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Date Format</Label>
                  <Select
                    value={settings.dateFormat}
                    onValueChange={(value) => handleChange("dateFormat", value)}
                  >
                    <SelectTrigger className="border-[#e0e0e0] dark:border-[#333] focus:border-[#006838] focus:ring-[#006838]">
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                      <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                      <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Default Language</Label>
                  <Select
                    value={settings.defaultLanguage}
                    onValueChange={(value) =>
                      handleChange("defaultLanguage", value)
                    }
                  >
                    <SelectTrigger className="border-[#e0e0e0] dark:border-[#333] focus:border-[#006838] focus:ring-[#006838]">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="enableCDN"
                    checked={settings.enableCDN}
                    onCheckedChange={(checked) =>
                      handleChange("enableCDN", checked)
                    }
                    className="data-[state=checked]:bg-[#006838]"
                  />
                  <Label htmlFor="enableCDN">
                    Enable CDN for Static Assets
                  </Label>
                </div>

                <div>
                  <Label htmlFor="googleAnalyticsId">Google Analytics ID</Label>
                  <Input
                    id="googleAnalyticsId"
                    value={settings.googleAnalyticsId}
                    onChange={(e) =>
                      handleChange("googleAnalyticsId", e.target.value)
                    }
                    placeholder="UA-XXXXX-Y"
                    className="border-[#e0e0e0] dark:border-[#333] focus:border-[#006838] focus:ring-[#006838]"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="cookieConsent"
                    checked={settings.cookieConsent}
                    onCheckedChange={(checked) =>
                      handleChange("cookieConsent", checked)
                    }

                    className="data-[state=checked]:bg-[#006838]"
                  />
                  <Label htmlFor="cookieConsent">
                    Show Cookie Consent Banner
                  </Label>
                </div>

                <div>
                  <Label htmlFor="privacyPolicyUrl">Privacy Policy URL</Label>
                  <Input
                    id="privacyPolicyUrl"
                    value={settings.privacyPolicyUrl}
                    onChange={(e) =>
                      handleChange("privacyPolicyUrl", e.target.value)
                    }
                    placeholder="/privacy-policy"
                    className="border-[#e0e0e0] dark:border-[#333] focus:border-[#006838] focus:ring-[#006838]"
                  />
                </div>

                <div>
                  <Label htmlFor="termsOfServiceUrl">
                    Terms of Service URL
                  </Label>
                  <Input
                    id="termsOfServiceUrl"
                    value={settings.termsOfServiceUrl}
                    onChange={(e) =>
                      handleChange("termsOfServiceUrl", e.target.value)
                    }
                    placeholder="/terms"
                    className="border-[#e0e0e0] dark:border-[#333] focus:border-[#006838] focus:ring-[#006838]"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings Tab */}

        <TabsContent value="security" className="space-y-4">
          <Card className="border-[#e0e0e0] dark:border-[#333] hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-[#006838] dark:text-[#8dc63f] flex items-center gap-2">
                <Shield className="h-5 w-5" /> Security Settings
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-300">
                Configure authentication, authorization, and security policies
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label>Password Complexity</Label>
                  <Select
                    value={settings.passwordComplexity}
                    onValueChange={(value) =>
                      handleChange("passwordComplexity", value)
                    }
                  >
                    <SelectTrigger className="border-[#e0e0e0] dark:border-[#333] focus:border-[#006838] focus:ring-[#006838]">
                      <SelectValue placeholder="Select complexity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low (6+ characters)</SelectItem>
                      <SelectItem value="medium">
                        Medium (8+ chars with mix)
                      </SelectItem>
                      <SelectItem value="high">
                        High (10+ chars with special)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="loginAttempts">
                    Max Failed Login Attempts
                  </Label>
                  <Input
                    id="loginAttempts"
                    type="number"
                    min="1"
                    max="10"
                    value={settings.loginAttempts}
                    onChange={(e) =>
                      handleChange("loginAttempts", parseInt(e.target.value))
                    }
                    className="border-[#e0e0e0] dark:border-[#333] focus:border-[#006838] focus:ring-[#006838]"
                  />
                </div>

                <div>
                  <Label htmlFor="sessionTimeout">
                    Session Timeout (minutes)
                  </Label>
                  <Input
                    id="sessionTimeout"
                    type="number"
                    min="5"
                    max="1440"
                    value={settings.sessionTimeout}
                    onChange={(e) =>
                      handleChange("sessionTimeout", parseInt(e.target.value))
                    }
                    className="border-[#e0e0e0] dark:border-[#333] focus:border-[#006838] focus:ring-[#006838]"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="twoFactorAuth"
                    checked={settings.twoFactorAuth}
                    onCheckedChange={(checked) =>
                      handleChange("twoFactorAuth", checked)
                    }
                    className="data-[state=checked]:bg-[#006838]"
                  />
                  <Label htmlFor="twoFactorAuth">
                    Require Two-Factor Authentication
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="forceHTTPS"
                    checked={settings.forceHTTPS}
                    onCheckedChange={(checked) =>
                      handleChange("forceHTTPS", checked)
                    }
                    className="data-[state=checked]:bg-[#006838]"
                  />
                  <Label htmlFor="forceHTTPS">Force HTTPS Connections</Label>
                </div>

                <div>
                  <Label htmlFor="passwordResetExpiry">
                    Password Reset Link Expiry (hours)
                  </Label>
                  <Input
                    id="passwordResetExpiry"
                    type="number"
                    min="1"
                    max="168"
                    value={settings.passwordResetExpiry}
                    onChange={(e) =>
                      handleChange(
                        "passwordResetExpiry",
                        parseInt(e.target.value)
                      )
                    }
                    className="border-[#e0e0e0] dark:border-[#333] focus:border-[#006838] focus:ring-[#006838]"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="userDataExport"
                    checked={settings.userDataExport}
                    onCheckedChange={(checked) =>
                      handleChange("userDataExport", checked)
                    }
                    className="data-[state=checked]:bg-[#006838]"
                  />
                  <Label htmlFor="userDataExport">
                    Allow Users to Export Their Data
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="ipFiltering"
                    checked={settings.ipFiltering}
                    onCheckedChange={(checked) =>
                      handleChange("ipFiltering", checked)
                    }
                    className="data-[state=checked]:bg-[#006838]"
                  />
                  <Label htmlFor="ipFiltering">Enable IP Filtering</Label>
                </div>

                {settings.ipFiltering && (
                  <div className="md:col-span-2">
                    <Label>Allowed IP Addresses</Label>
                    <div className="space-y-2 mt-2">
                      {settings.allowedIPs.map((ip, index) => (
                        <div key={index} className="flex space-x-2">
                          <Input
                            value={ip}
                            onChange={(e) => {
                              const newIPs = [...settings.allowedIPs];
                              newIPs[index] = e.target.value;
                              handleChange("allowedIPs", newIPs);
                            }}
                            className="border-[#e0e0e0] dark:border-[#333] focus:border-[#006838] focus:ring-[#006838]"
                          />
                          <Button
                            variant="destructive"
                            onClick={() => {
                              const newIPs = settings.allowedIPs.filter(
                                (_, i) => i !== index
                              );
                              handleChange("allowedIPs", newIPs);
                            }}
                          >
                            Remove
                          </Button>
                        </div>
                      ))}
                      <Button
                        variant="secondary"
                        onClick={() =>
                          handleChange("allowedIPs", [
                            ...settings.allowedIPs,
                            "",
                          ])
                        }
                        className="border-[#006838] text-[#006838] hover:bg-[#006838]/10 dark:border-[#8dc63f] dark:text-[#8dc63f] dark:hover:bg-[#8dc63f]/10"
                      >
                        <Plus className="mr-2 h-4 w-4" /> Add IP Address
                      </Button>
                    </div>
                  </div>
                )}

                <div>
                  <Label htmlFor="inactivityTimeout">
                    Inactivity Timeout (minutes)
                  </Label>
                  <Input
                    id="inactivityTimeout"
                    type="number"
                    min="1"
                    max="120"
                    value={settings.inactivityTimeout}
                    onChange={(e) =>
                      handleChange(
                        "inactivityTimeout",
                        parseInt(e.target.value)
                      )
                    }
                    className="border-[#e0e0e0] dark:border-[#333] focus:border-[#006838] focus:ring-[#006838]"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Content Settings Tab */}
        <TabsContent value="content" className="space-y-4">
          <Card className="border-[#e0e0e0] dark:border-[#333] hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-[#006838] dark:text-[#8dc63f] flex items-center gap-2">
                <BookText className="h-5 w-5" /> Content Management
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-300">
                Configure content upload, display, and moderation settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="fileSizeLimit">
                    Max File Upload Size (MB)
                  </Label>
                  <Input
                    id="fileSizeLimit"
                    type="number"
                    min="1"
                    max="500"
                    value={settings.fileSizeLimit}
                    onChange={(e) =>
                      handleChange("fileSizeLimit", parseInt(e.target.value))
                    }
                    className="border-[#e0e0e0] dark:border-[#333] focus:border-[#006838] focus:ring-[#006838]"
                  />
                </div>

                <div className="md:col-span-2">
                  <Label>Allowed File Types</Label>
                  <div className="flex flex-wrap gap-4 mt-2">
                    {["pdf", "docx", "pptx", "jpg", "png", "mp4", "zip"].map(
                      (type) => (
                        <div key={type} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id={`fileType-${type}`}
                            checked={settings.allowedFileTypes.includes(type)}
                            onChange={(e) => {
                              const newTypes = e.target.checked
                                ? [...settings.allowedFileTypes, type]
                                : settings.allowedFileTypes.filter(
                                    (t) => t !== type
                                  );
                              handleChange("allowedFileTypes", newTypes);
                            }}
                            className="h-4 w-4 rounded border-[#e0e0e0] dark:border-[#333] text-[#006838] focus:ring-[#006838]"
                          />
                          <Label htmlFor={`fileType-${type}`}>
                            {type.toUpperCase()}
                          </Label>
                        </div>
                      )
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="autoApproveCourses"
                    checked={settings.autoApproveCourses}
                    onCheckedChange={(checked) =>
                      handleChange("autoApproveCourses", checked)
                    }
                    className="data-[state=checked]:bg-[#006838]"
                  />
                  <Label htmlFor="autoApproveCourses">
                    Auto-approve New Courses
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="enableComments"
                    checked={settings.enableComments}
                    onCheckedChange={(checked) =>
                      handleChange("enableComments", checked)
                    }
                    className="data-[state=checked]:bg-[#006838]"
                  />
                  <Label htmlFor="enableComments">Enable Course Comments</Label>
                </div>

                {settings.enableComments && (
                  <div className="flex items-center space-x-2 md:col-span-2 pl-6">
                    <Switch
                      id="commentModeration"
                      checked={settings.commentModeration}
                      onCheckedChange={(checked) =>
                        handleChange("commentModeration", checked)
                      }
                      className="data-[state=checked]:bg-[#006838]"
                    />
                    <Label htmlFor="commentModeration">
                      Require Comment Moderation
                    </Label>
                  </div>
                )}

                <div className="flex items-center space-x-2">
                  <Switch
                    id="enableRatings"
                    checked={settings.enableRatings}
                    onCheckedChange={(checked) =>
                      handleChange("enableRatings", checked)
                    }
                    className="data-[state=checked]:bg-[#006838]"
                  />
                  <Label htmlFor="enableRatings">Enable Course Ratings</Label>
                </div>

                {settings.enableRatings && (
                  <div>
                    <Label htmlFor="minRatingToPublish">
                      Minimum Rating to Publish (1-5)
                    </Label>
                    <Input
                      id="minRatingToPublish"
                      type="number"
                      min="1"
                      max="5"
                      value={settings.minRatingToPublish}
                      onChange={(e) =>
                        handleChange(
                          "minRatingToPublish",
                          parseInt(e.target.value)
                        )
                      }
                      className="border-[#e0e0e0] dark:border-[#333] focus:border-[#006838] focus:ring-[#006838]"
                    />
                  </div>
                )}

                <div className="flex items-center space-x-2">
                  <Switch
                    id="enableContentVersioning"
                    checked={settings.enableContentVersioning}
                    onCheckedChange={(checked) =>
                      handleChange("enableContentVersioning", checked)
                    }
                    className="data-[state=checked]:bg-[#006838]"
                  />
                  <Label htmlFor="enableContentVersioning">
                    Enable Content Versioning
                  </Label>
                </div>

                {settings.enableContentVersioning && (
                  <div>
                    <Label htmlFor="maxVersionsToKeep">
                      Max Versions to Keep
                    </Label>
                    <Input
                      id="maxVersionsToKeep"
                      type="number"
                      min="1"
                      max="20"
                      value={settings.maxVersionsToKeep}
                      onChange={(e) =>
                        handleChange(
                          "maxVersionsToKeep",
                          parseInt(e.target.value)
                        )
                      }
                      className="border-[#e0e0e0] dark:border-[#333] focus:border-[#006838] focus:ring-[#006838]"
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notification Settings Tab */}
        <TabsContent value="notifications" className="space-y-4">
          <Card className="border-[#e0e0e0] dark:border-[#333] hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-[#006838] dark:text-[#8dc63f] flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Settings
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-300">
                Configure system notifications and alerts

              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="emailNotifications"
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) =>
                      handleChange("emailNotifications", checked)
                    }
                    className="data-[state=checked]:bg-[#006838]"
                  />
                  <Label htmlFor="emailNotifications">
                    Enable Email Notifications
                  </Label>
                </div>

                <div>
                  <Label>Notification Frequency</Label>
                  <Select
                    value={settings.notificationFrequency}
                    onValueChange={(value) =>
                      handleChange("notificationFrequency", value)
                    }
                  >
                    <SelectTrigger className="border-[#e0e0e0] dark:border-[#333] focus:border-[#006838] focus:ring-[#006838]">
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="instant">Instant</SelectItem>
                      <SelectItem value="hourly">Hourly Digest</SelectItem>
                      <SelectItem value="daily">Daily Digest</SelectItem>
                      <SelectItem value="weekly">Weekly Digest</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="adminAlerts"
                    checked={settings.adminAlerts}
                    onCheckedChange={(checked) =>
                      handleChange("adminAlerts", checked)
                    }
                    className="data-[state=checked]:bg-[#006838]"
                  />
                  <Label htmlFor="adminAlerts">Receive System Alerts</Label>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* User Management Tab */}

        <TabsContent value="users" className="space-y-4">
          <Card className="border-[#e0e0e0] dark:border-[#333] hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-[#006838] dark:text-[#8dc63f] flex items-center gap-2">
                <Users className="h-5 w-5" /> User Management
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-300">
                Configure user registration, profiles, and data policies
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label>Default User Role</Label>
                  <Select
                    value={settings.defaultUserRole}
                    onValueChange={(value) =>
                      handleChange("defaultUserRole", value)
                    }
                  >
                    <SelectTrigger className="border-[#e0e0e0] dark:border-[#333] focus:border-[#006838] focus:ring-[#006838]">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="student">Student</SelectItem>
                      <SelectItem value="trainer">Trainer</SelectItem>
                      <SelectItem value="admin">Administrator</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="allowProfileEdits"
                    checked={settings.allowProfileEdits}
                    onCheckedChange={(checked) =>
                      handleChange("allowProfileEdits", checked)
                    }
                    className="data-[state=checked]:bg-[#006838]"
                  />
                  <Label htmlFor="allowProfileEdits">
                    Allow Users to Edit Profiles
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="enableGravatar"
                    checked={settings.enableGravatar}
                    onCheckedChange={(checked) =>
                      handleChange("enableGravatar", checked)
                    }
                    className="data-[state=checked]:bg-[#006838]"
                  />
                  <Label htmlFor="enableGravatar">
                    Enable Gravatar Integration
                  </Label>
                </div>

                <div className="md:col-span-2">
                  <Label>Registration Form Fields</Label>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    {[
                      "name",
                      "email",
                      "password",
                      "username",
                      "bio",
                      "profile_picture",
                    ].map((field) => (
                      <div key={field} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={`regField-${field}`}
                          checked={settings.userRegistrationFields.includes(
                            field
                          )}
                          onChange={(e) => {
                            const newFields = e.target.checked
                              ? [...settings.userRegistrationFields, field]
                              : settings.userRegistrationFields.filter(
                                  (f) => f !== field
                                );
                            handleChange("userRegistrationFields", newFields);
                          }}
                          className="h-4 w-4 rounded border-[#e0e0e0] dark:border-[#333] text-[#006838] focus:ring-[#006838]"
                        />
                        <Label htmlFor={`regField-${field}`}>
                          {field
                            .split("_")
                            .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                            .join(" ")}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="md:col-span-2">
                  <Label>Custom Registration Fields</Label>
                  <div className="space-y-2 mt-2">
                    {settings.customRegistrationFields.map((field, index) => (
                      <div key={index} className="flex space-x-2 items-center">
                        <Input
                          placeholder="Field name"
                          value={field.name}
                          onChange={(e) => {
                            const newFields = [
                              ...settings.customRegistrationFields,
                            ];
                            newFields[index].name = e.target.value;
                            handleChange("customRegistrationFields", newFields);
                          }}
                          className="border-[#e0e0e0] dark:border-[#333] focus:border-[#006838] focus:ring-[#006838]"
                        />
                        <Select
                          value={field.type}
                          onValueChange={(value) => {
                            const newFields = [
                              ...settings.customRegistrationFields,
                            ];
                            newFields[index].type = value;
                            handleChange("customRegistrationFields", newFields);
                          }}
                        >
                          <SelectTrigger className="w-[180px] border-[#e0e0e0] dark:border-[#333] focus:border-[#006838] focus:ring-[#006838]">
                            <SelectValue placeholder="Field type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="text">Text</SelectItem>
                            <SelectItem value="number">Number</SelectItem>
                            <SelectItem value="select">Dropdown</SelectItem>
                            <SelectItem value="checkbox">Checkbox</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button
                          variant="destructive"
                          onClick={() => {
                            const newFields =
                              settings.customRegistrationFields.filter(
                                (_, i) => i !== index
                              );
                            handleChange("customRegistrationFields", newFields);
                          }}
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                    <Button
                      variant="secondary"
                      onClick={() =>
                        handleChange("customRegistrationFields", [
                          ...settings.customRegistrationFields,
                          { name: "", type: "text" },
                        ])
                      }
                      className="border-[#006838] text-[#006838] hover:bg-[#006838]/10 dark:border-[#8dc63f] dark:text-[#8dc63f] dark:hover:bg-[#8dc63f]/10"
                    >
                      <Plus className="mr-2 h-4 w-4" /> Add Custom Field
                    </Button>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="deleteInactiveUsers"
                    checked={settings.deleteInactiveUsers}
                    onCheckedChange={(checked) =>
                      handleChange("deleteInactiveUsers", checked)
                    }
                    className="data-[state=checked]:bg-[#006838]"
                  />
                  <Label htmlFor="deleteInactiveUsers">
                    Automatically Delete Inactive Users
                  </Label>
                </div>

                {settings.deleteInactiveUsers && (
                  <div>
                    <Label htmlFor="inactiveUserThreshold">
                      Inactive Threshold (days)
                    </Label>
                    <Input
                      id="inactiveUserThreshold"
                      type="number"
                      min="30"
                      max="730"
                      value={settings.inactiveUserThreshold}
                      onChange={(e) =>
                        handleChange(
                          "inactiveUserThreshold",
                          parseInt(e.target.value)
                        )
                      }
                      className="border-[#e0e0e0] dark:border-[#333] focus:border-[#006838] focus:ring-[#006838]"
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSettingsPage;
