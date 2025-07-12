import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [, setLocation] = useLocation();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  
  const { login } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(formData.email, formData.password);
    
    if (result.success) {
      toast({
        title: "Welcome back!",
        description: "You have been logged in successfully.",
      });
      setLocation("/");
    } else {
      toast({
        title: "Login Failed",
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

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-4">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 liquid-crystal border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-2xl font-bold text-primary">Skill Swap Platform</h1>
            <Link href="/">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                Home
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Login Form */}
      <Card className="w-full max-w-md liquid-crystal border-border">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">User Login page</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
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
            
            <Button type="submit" className="w-full bg-white hover:bg-gray-100 text-black font-medium">
              Login
            </Button>
            
            <div className="text-center space-y-2">
              <button type="button" className="text-primary hover:text-primary/80 text-sm">
                Forgot username/password
              </button>
              <div>
                <p className="text-muted-foreground text-sm">Don't have an account?</p>
                <Link href="/signup">
                  <Button variant="link" className="text-primary hover:text-primary/80 p-0 h-auto">
                    Create new account
                  </Button>
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;