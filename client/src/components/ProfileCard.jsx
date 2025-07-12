import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ProfileCard = ({ profile, onProfileClick, onRequest }) => {
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
    <Card className="liquid-crystal profile-card">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <button 
            onClick={() => onProfileClick(profile)}
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
                onClick={() => onRequest(profile)}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Request
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
