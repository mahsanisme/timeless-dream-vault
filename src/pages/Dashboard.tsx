
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Lock, Unlock, Calendar, Star, Sparkles, Eye, Share2, Settings } from 'lucide-react';
import { format, isAfter } from 'date-fns';
import { useUserCapsules } from '@/hooks/useCapsules';
import { useAuth } from '@/contexts/AuthContext';

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const { data: capsules = [], isLoading } = useUserCapsules();
  const [filter, setFilter] = useState<"all" | "locked" | "unlocked">("all");

  const isUnlocked = (unlockDate: string) => isAfter(new Date(), new Date(unlockDate));

  const filteredCapsules = capsules.filter((capsule) => {
    if (filter === "locked") return isUnlocked(capsule.unlock_date);
    if (filter === "unlocked") return !isUnlocked(capsule.unlock_date);
    return true;
  });

  const stats = {
    total: capsules.length,
    locked: capsules.filter(c => !isUnlocked(c.unlock_date)).length,
    unlocked: capsules.filter(c => isUnlocked(c.unlock_date)).length,
    private: capsules.filter(c => c.is_private).length,
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Lock className="w-8 h-8 text-lavender-500 animate-spin mx-auto mb-4" />
          <p className="text-slate-600">Loading your capsules...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      {/* Floating decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <Star className="absolute top-32 left-10 w-4 h-4 text-lavender-400 animate-sparkle" />
        <Sparkles className="absolute top-20 right-20 w-5 h-5 text-peach-400 animate-sparkle delay-1000" />
        <div className="absolute bottom-40 left-40 w-3 h-3 bg-skyblue-300 rounded-full animate-float delay-2000 opacity-60"></div>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-slate-800 mb-2">
              Welcome back, {user?.user_metadata?.full_name || 'Time Traveler'}!
            </h1>
            <p className="text-lg text-slate-600">
              Manage your time capsules and memories
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={signOut} className="border-lavender-200">
              <Settings className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="border-lavender-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-slate-800">{stats.total}</div>
              <div className="text-sm text-slate-600">Total Capsules</div>
            </CardContent>
          </Card>
          <Card className="border-lavender-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-lavender-600">{stats.locked}</div>
              <div className="text-sm text-slate-600">Still Locked</div>
            </CardContent>
          </Card>
          <Card className="border-lavender-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-peach-600">{stats.unlocked}</div>
              <div className="text-sm text-slate-600">Unlocked</div>
            </CardContent>
          </Card>
          <Card className="border-lavender-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-skyblue-600">{stats.private}</div>
              <div className="text-sm text-slate-600">Private</div>
            </CardContent>
          </Card>
        </div>

        {/* Capsules Management */}
        <Tabs defaultValue="capsules" className="space-y-6">
          <TabsList>
            <TabsTrigger value="capsules">My Capsules</TabsTrigger>
            <TabsTrigger value="shared">Shared with Me</TabsTrigger>
          </TabsList>

          <TabsContent value="capsules" className="space-y-6">
            {/* Filter Buttons */}
            <div className="flex justify-center gap-2">
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
                  const unlocked = isUnlocked(capsule.unlock_date);
                  
                  return (
                    <Card key={capsule.id} className="border-lavender-200 hover:shadow-lg transition-all duration-300">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="flex items-center gap-2 text-slate-800">
                            {unlocked ? (
                              <Unlock className="w-5 h-5 text-peach-500" />
                            ) : (
                              <Lock className="w-5 h-5 text-lavender-500" />
                            )}
                            {capsule.title || `${capsule.content_type.charAt(0).toUpperCase() + capsule.content_type.slice(1)} Capsule`}
                          </CardTitle>
                          <div className="flex gap-1">
                            <Badge 
                              variant={unlocked ? "default" : "secondary"}
                              className={unlocked ? "bg-peach-500" : "bg-lavender-500"}
                            >
                              {unlocked ? "Unlocked" : "Locked"}
                            </Badge>
                            {capsule.is_private && (
                              <Badge variant="outline" className="border-slate-300">Private</Badge>
                            )}
                          </div>
                        </div>
                      </CardHeader>
                      
                      <CardContent className="space-y-4">
                        {/* Content Preview */}
                        <div className="relative">
                          {unlocked ? (
                            <div className="space-y-2">
                              {capsule.content_type === "text" && (
                                <p className="text-slate-700 line-clamp-3">{capsule.content}</p>
                              )}
                              {capsule.content_type === "image" && capsule.file_url && (
                                <img 
                                  src={capsule.file_url} 
                                  alt="Capsule content" 
                                  className="w-full h-32 object-cover rounded-lg"
                                />
                              )}
                              {capsule.content_type === "drawing" && (
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
                            <span>Unlocks: {format(new Date(capsule.unlock_date), "PPP")}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Star className="w-4 h-4" />
                            <span>Created: {format(new Date(capsule.created_at), "PPP")}</span>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2">
                          <Button 
                            disabled={!unlocked}
                            className={`flex-1 ${
                              unlocked 
                                ? "bg-gradient-to-r from-peach-500 to-lavender-500 hover:from-peach-600 hover:to-lavender-600" 
                                : "bg-slate-300 cursor-not-allowed"
                            }`}
                          >
                            {unlocked ? (
                              <>
                                <Eye className="w-4 h-4 mr-2" />
                                View
                              </>
                            ) : (
                              <>
                                <Lock className="w-4 h-4 mr-2" />
                                Locked
                              </>
                            )}
                          </Button>
                          {unlocked && (
                            <Button variant="outline" size="sm" className="border-lavender-200">
                              <Share2 className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </TabsContent>

          <TabsContent value="shared">
            <div className="text-center py-16">
              <Share2 className="w-16 h-16 text-lavender-300 mx-auto mb-4" />
              <h3 className="font-serif text-2xl font-semibold text-slate-700 mb-2">Shared Capsules</h3>
              <p className="text-slate-500">Capsules shared with you will appear here</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
