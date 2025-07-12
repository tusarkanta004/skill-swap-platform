import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Search, ChevronLeft, ChevronRight, Star, AlertCircle } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/lib/auth";
import { apiRequest } from "@/lib/queryClient";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [availabilityFilter, setAvailabilityFilter] = useState("all");
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [requestMessage, setRequestMessage] = useState("");

  const { user, isLoggedIn, login, register, logout } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch public users
  const { data: users = [], isLoading } = useQuery({
    queryKey: ["/api/users/public"],
    enabled: true,
  });

  // Filter users based on search and availability
  const filteredUsers = users.filter(user => {
    const matchesSearch = searchTerm === "" || 
      user.skillsOffered?.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
      user.skillsWanted?.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
      user.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesAvailability = availabilityFilter === "all" || 
      user.availability === availabilityFilter;
    
    return matchesSearch && matchesAvailability && user.isPublic;
  });

  // Create swap request mutation
  const createSwapRequestMutation = useMutation({
    mutationFn: async (data) => {
      const response = await apiRequest("POST", "/api/swap-requests", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "Skill swap request sent successfully!",
      });
      setShowRequestModal(false);
      setRequestMessage("");
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });



  const handleRequest = (profile) => {
    if (!isLoggedIn) {
      toast({
        title: "Login Required",
        description: "You need to be logged in to send skill swap requests.",
        variant: "destructive",
      });
      return;
    }
    
    setSelectedProfile(profile);
    setShowRequestModal(true);
  };

  const handleSendRequest = () => {
    if (!selectedProfile || !user) return;
    
    createSwapRequestMutation.mutate({
      fromUserId: user.id,
      toUserId: selectedProfile.id,
      message: requestMessage,
    });
  };

  const openProfileModal = (profile) => {
    setSelectedProfile(profile);
    setShowProfileModal(true);
  };

  const generateStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
    }
    
    if (hasHalfStar) {
      stars.push(<Star key="half" className="w-4 h-4 fill-yellow-400/50 text-yellow-400" />);
    }
    
    const remainingStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-400" />);
    }
    
    return stars;
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="liquid-crystal border-b border-border sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-primary">Skill Swap Platform</h1>
            </div>
            <div className="flex items-center space-x-4">
              {isLoggedIn ? (
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-muted-foreground">Welcome, {user.name}</span>
                  <Button 
                    onClick={logout}
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <Link href="/login">
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground glow-effect">
                    Login
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Search and Filter Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search by skills (e.g., Photoshop, Excel)"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-card border-border"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={availabilityFilter} onValueChange={setAvailabilityFilter}>
                <SelectTrigger className="w-[200px] bg-card border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Availability</SelectItem>
                  <SelectItem value="weekends">Weekends</SelectItem>
                  <SelectItem value="evenings">Evenings</SelectItem>
                  <SelectItem value="flexible">Flexible</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* User Profiles Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="liquid-crystal animate-pulse">
                <CardContent className="p-6">
                  <div className="h-32 bg-muted rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUsers.map((profile) => (
              <Card key={profile.id} className="liquid-crystal profile-card">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <button 
                      onClick={() => openProfileModal(profile)}
                      className="flex-shrink-0 transition-transform hover:scale-105"
                    >
                      <Avatar className="w-16 h-16 ring-2 ring-primary/20 hover:ring-primary/50">
                        <AvatarImage src={profile.avatar} alt={profile.name} />
                        <AvatarFallback>{profile.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                    </button>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-foreground truncate">{profile.name}</h3>
                        <div className="flex items-center space-x-1">
                          <div className="flex star-rating">
                            {generateStars(profile.rating / 10)}
                          </div>
                          <span className="text-sm text-muted-foreground">{(profile.rating / 10).toFixed(1)}/5</span>
                        </div>
                      </div>
                      <p className="text-muted-foreground text-sm mb-3">{profile.location}</p>
                      
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-foreground mb-2">Skills Offered</h4>
                        <div className="flex flex-wrap gap-2">
                          {profile.skillsOffered?.map((skill, index) => (
                            <Badge key={index} className="skills-offered skill-tag text-white">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-foreground mb-2">Skills Wanted</h4>
                        <div className="flex flex-wrap gap-2">
                          {profile.skillsWanted?.map((skill, index) => (
                            <Badge key={index} className="skills-wanted skill-tag text-white">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Badge className="availability-badge text-white">
                          Available: {profile.availability}
                        </Badge>
                        <Button 
                          onClick={() => handleRequest(profile)}
                          className="bg-primary hover:bg-primary/90 text-primary-foreground"
                        >
                          Request
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-center mt-12">
          <nav className="flex space-x-2">
            <Button variant="outline" size="sm" className="border-border">
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button className="bg-primary text-primary-foreground" size="sm">1</Button>
            <Button variant="outline" size="sm" className="border-border">2</Button>
            <Button variant="outline" size="sm" className="border-border">3</Button>
            <Button variant="outline" size="sm" className="border-border">4</Button>
            <Button variant="outline" size="sm" className="border-border">5</Button>
            <Button variant="outline" size="sm" className="border-border">6</Button>
            <Button variant="outline" size="sm" className="border-border">7</Button>
            <Button variant="outline" size="sm" className="border-border">
              <ChevronRight className="w-4 h-4" />
            </Button>
          </nav>
        </div>
      </main>



      {/* Profile Detail Modal */}
      <Dialog open={showProfileModal} onOpenChange={setShowProfileModal}>
        <DialogContent className="liquid-crystal border-border max-w-2xl">
          {selectedProfile && (
            <>
              <DialogHeader>
                <div className="text-center">
                  <Avatar className="w-24 h-24 mx-auto mb-4 ring-4 ring-primary/20">
                    <AvatarImage src={selectedProfile.avatar} alt={selectedProfile.name} />
                    <AvatarFallback>{selectedProfile.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <DialogTitle className="text-2xl">{selectedProfile.name}</DialogTitle>
                  <p className="text-muted-foreground">{selectedProfile.location}</p>
                  <div className="flex items-center justify-center space-x-2 mt-2">
                    <div className="flex star-rating">
                      {generateStars(selectedProfile.rating / 10)}
                    </div>
                    <span className="text-sm text-muted-foreground">{(selectedProfile.rating / 10).toFixed(1)}/5</span>
                  </div>
                </div>
              </DialogHeader>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">Skills Offered</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProfile.skillsOffered?.map((skill, index) => (
                      <Badge key={index} className="skills-offered skill-tag text-white">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">Skills Wanted</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProfile.skillsWanted?.map((skill, index) => (
                      <Badge key={index} className="skills-wanted skill-tag text-white">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">Availability</h3>
                  <Badge className="availability-badge text-white">
                    {selectedProfile.availability}
                  </Badge>
                </div>
                
                <div className="flex justify-center pt-4">
                  <Button 
                    onClick={() => {
                      setShowProfileModal(false);
                      handleRequest(selectedProfile);
                    }}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground glow-effect"
                  >
                    Send Skill Swap Request
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Request Modal */}
      <Dialog open={showRequestModal} onOpenChange={setShowRequestModal}>
        <DialogContent className="liquid-crystal border-border">
          <DialogHeader>
            <DialogTitle>Send Skill Swap Request</DialogTitle>
            <p className="text-muted-foreground">
              Send a request to {selectedProfile?.name}
            </p>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="requestMessage">Message (Optional)</Label>
              <Textarea
                id="requestMessage"
                value={requestMessage}
                onChange={(e) => setRequestMessage(e.target.value)}
                placeholder="Tell them what you'd like to learn and what you can offer in return..."
                className="bg-background border-border"
                rows={4}
              />
            </div>
            
            <div className="flex justify-end space-x-4">
              <Button 
                variant="outline" 
                onClick={() => setShowRequestModal(false)}
                className="border-border"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleSendRequest}
                disabled={createSwapRequestMutation.isPending}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                {createSwapRequestMutation.isPending ? "Sending..." : "Send Request"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Home;
