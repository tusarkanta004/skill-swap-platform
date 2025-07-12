import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Plus, X } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";

const Signup = () => {
  const [, setLocation] = useLocation();
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    location: "",
    avatar: "",
    skillsOffered: [],
    skillsWanted: [],
    availability: [],
    isPublic: true
  });
  
  const [newSkillOffered, setNewSkillOffered] = useState("");
  const [newSkillWanted, setNewSkillWanted] = useState("");
  
  const { register } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await register({
      ...formData,
      availability: formData.availability.join(", ") || "flexible"
    });
    
    if (result.success) {
      toast({
        title: "Account Created!",
        description: "Welcome to the Skill Swap Platform!",
      });
      setLocation("/");
    } else {
      toast({
        title: "Registration Failed",
        description: result.error,
        variant: "destructive",
      });
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addSkillOffered = () => {
    if (newSkillOffered.trim()) {
      setFormData(prev => ({
        ...prev,
        skillsOffered: [...prev.skillsOffered, newSkillOffered.trim()]
      }));
      setNewSkillOffered("");
    }
  };

  const addSkillWanted = () => {
    if (newSkillWanted.trim()) {
      setFormData(prev => ({
        ...prev,
        skillsWanted: [...prev.skillsWanted, newSkillWanted.trim()]
      }));
      setNewSkillWanted("");
    }
  };

  const removeSkillOffered = (index) => {
    setFormData(prev => ({
      ...prev,
      skillsOffered: prev.skillsOffered.filter((_, i) => i !== index)
    }));
  };

  const removeSkillWanted = (index) => {
    setFormData(prev => ({
      ...prev,
      skillsWanted: prev.skillsWanted.filter((_, i) => i !== index)
    }));
  };

  const handleAvailabilityChange = (value, checked) => {
    setFormData(prev => ({
      ...prev,
      availability: checked 
        ? [...prev.availability, value]
        : prev.availability.filter(item => item !== value)
    }));
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="liquid-crystal border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-xl font-bold text-primary">User Profile</h1>
            <div className="flex items-center space-x-4">
              <Link href="/login">
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  User Login
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  Close & Exit
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="liquid-crystal border-border">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - Form Fields */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-foreground">Name</Label>
                    <Input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className="bg-background border-border text-foreground"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="username" className="text-foreground">Username</Label>
                    <Input
                      id="username"
                      type="text"
                      value={formData.username}
                      onChange={(e) => handleInputChange("username", e.target.value)}
                      className="bg-background border-border text-foreground"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-foreground">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="bg-background border-border text-foreground"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-foreground">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      className="bg-background border-border text-foreground"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-foreground">Location</Label>
                    <Input
                      id="location"
                      type="text"
                      value={formData.location}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                      className="bg-background border-border text-foreground"
                      placeholder="e.g., San Francisco, CA"
                    />
                  </div>
                </div>

                {/* Right Column - Profile Photo */}
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="relative inline-block">
                      <Avatar className="w-32 h-32 ring-2 ring-primary/20">
                        <AvatarImage src={formData.avatar} alt="Profile" />
                        <AvatarFallback>
                          <Camera className="w-8 h-8 text-muted-foreground" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute bottom-0 right-0 bg-primary rounded-full p-1">
                        <Camera className="w-4 h-4 text-primary-foreground" />
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">Profile Photo</p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="photoUrl" className="text-foreground">Photo URL</Label>
                    <Input
                      id="photoUrl"
                      type="url"
                      value={formData.avatar}
                      onChange={(e) => handleInputChange("avatar", e.target.value)}
                      className="bg-background border-border text-foreground"
                      placeholder="https://example.com/photo.jpg"
                    />
                  </div>
                </div>
              </div>

              {/* Skills Offered */}
              <div className="space-y-4">
                <Label className="text-foreground">Skills Offered</Label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {formData.skillsOffered.map((skill, index) => (
                    <Badge key={index} className="skills-offered text-white flex items-center gap-1">
                      {skill}
                      <button
                        type="button"
                        onClick={() => removeSkillOffered(index)}
                        className="ml-1 hover:text-red-300"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    type="text"
                    value={newSkillOffered}
                    onChange={(e) => setNewSkillOffered(e.target.value)}
                    placeholder="Add a skill..."
                    className="bg-background border-border text-foreground"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addSkillOffered();
                      }
                    }}
                  />
                  <Button type="button" onClick={addSkillOffered} className="bg-green-600 hover:bg-green-700">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Skills Wanted */}
              <div className="space-y-4">
                <Label className="text-foreground">Skills Wanted</Label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {formData.skillsWanted.map((skill, index) => (
                    <Badge key={index} className="skills-wanted text-white flex items-center gap-1">
                      {skill}
                      <button
                        type="button"
                        onClick={() => removeSkillWanted(index)}
                        className="ml-1 hover:text-red-300"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    type="text"
                    value={newSkillWanted}
                    onChange={(e) => setNewSkillWanted(e.target.value)}
                    placeholder="Add a skill you want to learn..."
                    className="bg-background border-border text-foreground"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addSkillWanted();
                      }
                    }}
                  />
                  <Button type="button" onClick={addSkillWanted} className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Availability */}
              <div className="space-y-4">
                <Label className="text-foreground">Availability</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="weekdays"
                      checked={formData.availability.includes("weekdays")}
                      onCheckedChange={(checked) => handleAvailabilityChange("weekdays", checked)}
                    />
                    <Label htmlFor="weekdays" className="text-foreground">Weekdays</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="weekends"
                      checked={formData.availability.includes("weekends")}
                      onCheckedChange={(checked) => handleAvailabilityChange("weekends", checked)}
                    />
                    <Label htmlFor="weekends" className="text-foreground">Weekends</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="evenings"
                      checked={formData.availability.includes("evenings")}
                      onCheckedChange={(checked) => handleAvailabilityChange("evenings", checked)}
                    />
                    <Label htmlFor="evenings" className="text-foreground">Evenings</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="flexible"
                      checked={formData.availability.includes("flexible")}
                      onCheckedChange={(checked) => handleAvailabilityChange("flexible", checked)}
                    />
                    <Label htmlFor="flexible" className="text-foreground">Flexible</Label>
                  </div>
                </div>
              </div>

              {/* Profile Visibility */}
              <div className="space-y-4">
                <Label className="text-foreground">Profile</Label>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="public"
                    checked={formData.isPublic}
                    onCheckedChange={(checked) => handleInputChange("isPublic", checked)}
                  />
                  <Label htmlFor="public" className="text-foreground">Public</Label>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-6">
                <Button type="submit" className="bg-white hover:bg-gray-100 text-black font-medium px-8 py-2">
                  Create Profile
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Signup;