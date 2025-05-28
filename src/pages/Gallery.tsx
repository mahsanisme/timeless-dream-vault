
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Lock, Unlock, Calendar, Star, Sparkles, Eye } from "lucide-react";
import { format, isAfter } from "date-fns";

interface Capsule {
  id: number;
  type: string;
  content: string;
  unlockDate: Date;
  isPrivate: boolean;
  createdAt: Date;
  isLocked: boolean;
}

const Gallery = () => {
  const [capsules, setCapsules] = useState<Capsule[]>([]);
  const [filter, setFilter] = useState<"all" | "locked" | "unlocked">("all");

  useEffect(() => {
    const stored = localStorage.getItem("lockTheDay_capsules");
    if (stored) {
      const parsed = JSON.parse(stored).map((capsule: any) => ({
        ...capsule,
        unlockDate: new Date(capsule.unlockDate),
        createdAt: new Date(capsule.createdAt),
      }));
      setCapsules(parsed);
    }
  }, []);

  const isUnlocked = (unlockDate: Date) => isAfter(new Date(), unlockDate);

  const filteredCapsules = capsules.filter((capsule) => {
    if (filter === "locked") return !isUnlocked(capsule.unlockDate);
    if (filter === "unlocked") return isUnlocked(capsule.unlockDate);
    return true;
  });

  const handleViewCapsule = (capsule: Capsule) => {
    if (isUnlocked(capsule.unlockDate)) {
      // Show unlock animation and content
      console.log("Opening capsule:", capsule);
    }
  };

  return (
    <div className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      {/* Floating decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <Star className="absolute top-32 left-10 w-4 h-4 text-lavender-400 animate-sparkle" />
        <Sparkles className="absolute top-20 right-20 w-5 h-5 text-peach-400 animate-sparkle delay-1000" />
        <div className="absolute bottom-40 left-40 w-3 h-3 bg-skyblue-300 rounded-full animate-float delay-2000 opacity-60"></div>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-slate-800 mb-4">
            Memory Gallery
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Explore time capsules from around the world and rediscover your own memories when they unlock.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center gap-2 mb-8">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            onClick={() => setFilter("all")}
            className={filter === "all" ? "bg-lavender-500 hover:bg-lavender-600" : "border-lavender-200"}
          >
            All Capsules
          </Button>
          <Button
            variant={filter === "locked" ? "default" : "outline"}
            onClick={() => setFilter("locked")}
            className={filter === "locked" ? "bg-lavender-500 hover:bg-lavender-600" : "border-lavender-200"}
          >
            <Lock className="w-4 h-4 mr-2" />
            Locked
          </Button>
          <Button
            variant={filter === "unlocked" ? "default" : "outline"}
            onClick={() => setFilter("unlocked")}
            className={filter === "unlocked" ? "bg-lavender-500 hover:bg-lavender-600" : "border-lavender-200"}
          >
            <Unlock className="w-4 h-4 mr-2" />
            Unlocked
          </Button>
        </div>

        {/* Capsules Grid */}
        {filteredCapsules.length === 0 ? (
          <div className="text-center py-16">
            <Lock className="w-16 h-16 text-lavender-300 mx-auto mb-4" />
            <h3 className="font-serif text-2xl font-semibold text-slate-700 mb-2">No capsules found</h3>
            <p className="text-slate-500 mb-6">
              {filter === "all" 
                ? "You haven't created any capsules yet." 
                : `No ${filter} capsules available.`}
            </p>
            <Button asChild className="bg-gradient-to-r from-lavender-500 to-skyblue-500 hover:from-lavender-600 hover:to-skyblue-600">
              <a href="/create">Create Your First Capsule</a>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCapsules.map((capsule) => {
              const unlocked = isUnlocked(capsule.unlockDate);
              
              return (
                <Card key={capsule.id} className="border-lavender-200 hover:shadow-lg transition-all duration-300 group">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2 text-slate-800">
                        {unlocked ? (
                          <Unlock className="w-5 h-5 text-peach-500" />
                        ) : (
                          <Lock className="w-5 h-5 text-lavender-500" />
                        )}
                        {capsule.type === "text" && "Message"}
                        {capsule.type === "image" && "Photo"}
                        {capsule.type === "drawing" && "Drawing"}
                      </CardTitle>
                      <Badge 
                        variant={unlocked ? "default" : "secondary"}
                        className={unlocked ? "bg-peach-500" : "bg-lavender-500"}
                      >
                        {unlocked ? "Unlocked" : "Locked"}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    {/* Content Preview */}
                    <div className="relative">
                      {unlocked ? (
                        <div className="space-y-2">
                          {capsule.type === "text" && (
                            <p className="text-slate-700 line-clamp-3">{capsule.content}</p>
                          )}
                          {capsule.type === "image" && (
                            <img 
                              src={capsule.content} 
                              alt="Capsule content" 
                              className="w-full h-32 object-cover rounded-lg"
                            />
                          )}
                          {capsule.type === "drawing" && (
                            <div className="w-full h-32 bg-gradient-to-br from-lavender-50 to-peach-50 rounded-lg flex items-center justify-center">
                              <Star className="w-8 h-8 text-lavender-400" />
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="h-32 bg-gradient-to-br from-lavender-100 to-skyblue-100 rounded-lg flex items-center justify-center">
                          <div className="text-center">
                            <Lock className="w-8 h-8 text-lavender-400 mx-auto mb-2" />
                            <p className="text-sm text-slate-600">Locked until unlock date</p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Dates */}
                    <div className="space-y-2 text-sm text-slate-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>Unlocks: {format(capsule.unlockDate, "PPP")}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4" />
                        <span>Created: {format(capsule.createdAt, "PPP")}</span>
                      </div>
                    </div>

                    {/* Action Button */}
                    <Button 
                      onClick={() => handleViewCapsule(capsule)}
                      disabled={!unlocked}
                      className={`w-full ${
                        unlocked 
                          ? "bg-gradient-to-r from-peach-500 to-lavender-500 hover:from-peach-600 hover:to-lavender-600" 
                          : "bg-slate-300 cursor-not-allowed"
                      }`}
                    >
                      {unlocked ? (
                        <>
                          <Eye className="w-4 h-4 mr-2" />
                          View Capsule
                        </>
                      ) : (
                        <>
                          <Lock className="w-4 h-4 mr-2" />
                          Still Locked
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;
