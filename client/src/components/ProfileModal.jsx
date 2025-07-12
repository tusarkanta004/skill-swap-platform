import { Star } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ProfileModal = ({ isOpen, onClose, profile, onRequest }) => {
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

  if (!profile) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="liquid-crystal border-border max-w-2xl">
        <DialogHeader>
          <div className="text-center">
            <Avatar className="w-24 h-24 mx-auto mb-4 ring-4 ring-primary/20">
              <AvatarImage src={profile.avatar} alt={profile.name} />
              <AvatarFallback>{profile.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <DialogTitle className="text-2xl">{profile.name}</DialogTitle>
            <p className="text-muted-foreground">{profile.location}</p>
            <div className="flex items-center justify-center space-x-2 mt-2">
              <div className="flex star-rating">
                {generateStars(profile.rating / 10)}
              </div>
              <span className="text-sm text-muted-foreground">{(profile.rating / 10).toFixed(1)}/5</span>
            </div>
          </div>
        </DialogHeader>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-3">Skills Offered</h3>
            <div className="flex flex-wrap gap-2">
              {profile.skillsOffered?.map((skill, index) => (
                <Badge key={index} className="skills-offered skill-tag text-white">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-3">Skills Wanted</h3>
            <div className="flex flex-wrap gap-2">
              {profile.skillsWanted?.map((skill, index) => (
                <Badge key={index} className="skills-wanted skill-tag text-white">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-3">Availability</h3>
            <Badge className="availability-badge text-white">
              {profile.availability}
            </Badge>
          </div>
          
          <div className="flex justify-center pt-4">
            <Button 
              onClick={() => {
                onClose();
                onRequest(profile);
              }}
              className="bg-primary hover:bg-primary/90 text-primary-foreground glow-effect"
            >
              Send Skill Swap Request
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileModal;
