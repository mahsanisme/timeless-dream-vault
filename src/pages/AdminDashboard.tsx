
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { 
  Shield, 
  Users, 
  Lock, 
  Unlock, 
  Eye, 
  Star, 
  BarChart3, 
  Settings, 
  Mail,
  Ban,
  Search
} from "lucide-react";
import { format, isAfter } from "date-fns";
import { useCapsules } from "@/hooks/useCapsules";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const AdminDashboard = () => {
  const { data: capsules = [] } = useCapsules();
  const [filter, setFilter] = useState<"all" | "locked" | "unlocked" | "flagged">("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [adSettings, setAdSettings] = useState({
    enabled: true,
    frequency: "medium",
    placement: "bottom"
  });

  // Get user count
  const { data: userStats } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      const { count } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });
      
      return { userCount: count || 0 };
    },
  });

  const isUnlocked = (unlockDate: string) => isAfter(new Date(), new Date(unlockDate));

  const filteredCapsules = capsules.filter((capsule) => {
    const matchesFilter = 
      filter === "all" || 
      (filter === "locked" && !isUnlocked(capsule.unlock_date)) ||
      (filter === "unlocked" && isUnlocked(capsule.unlock_date));
    
    const matchesSearch = 
      (capsule.content || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (capsule.title || '').toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const stats = {
    totalCapsules: capsules.length,
    lockedCapsules: capsules.filter(c => !isUnlocked(c.unlock_date)).length,
    unlockedCapsules: capsules.filter(c => isUnlocked(c.unlock_date)).length,
    flaggedCapsules: 0, // Would need additional field in DB
    publicCapsules: capsules.filter(c => !c.is_private).length,
    privateCapsules: capsules.filter(c => c.is_private).length
  };

  return (
    <div className="min-h-screen px-4 py-8 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="font-serif text-3xl font-bold text-slate-800 mb-2 flex items-center gap-3">
            <Shield className="w-8 h-8 text-lavender-500" />
            Admin Dashboard
          </h1>
          <p className="text-slate-600">Manage capsules, users, and platform settings</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-slate-800">{stats.totalCapsules}</div>
              <div className="text-sm text-slate-600">Total Capsules</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-lavender-600">{stats.lockedCapsules}</div>
              <div className="text-sm text-slate-600">Locked</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-peach-600">{stats.unlockedCapsules}</div>
              <div className="text-sm text-slate-600">Unlocked</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-600">{stats.flaggedCapsules}</div>
              <div className="text-sm text-slate-600">Flagged</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-skyblue-600">{stats.publicCapsules}</div>
              <div className="text-sm text-slate-600">Public</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-slate-600">{stats.privateCapsules}</div>
              <div className="text-sm text-slate-600">Private</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="capsules" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="capsules">Capsule Management</TabsTrigger>
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="capsules" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="w-5 h-5" />
                  Capsule Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="flex-1">
                    <Label htmlFor="search">Search</Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                      <Input
                        id="search"
                        placeholder="Search by content or title..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Filter by Status</Label>
                    <Select value={filter} onValueChange={(value: any) => setFilter(value)}>
                      <SelectTrigger className="w-48">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Capsules</SelectItem>
                        <SelectItem value="locked">Locked</SelectItem>
                        <SelectItem value="unlocked">Unlocked</SelectItem>
                        <SelectItem value="flagged">Flagged</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Capsules Table */}
                <div className="border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Privacy</TableHead>
                        <TableHead>Created</TableHead>
                        <TableHead>Unlock Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredCapsules.map((capsule) => {
                        const unlocked = isUnlocked(capsule.unlock_date);
                        return (
                          <TableRow key={capsule.id}>
                            <TableCell className="font-mono text-xs">{capsule.id.slice(0, 8)}...</TableCell>
                            <TableCell>{capsule.title || 'Untitled'}</TableCell>
                            <TableCell>
                              <Badge variant="outline">{capsule.content_type}</Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                {!unlocked ? (
                                  <Lock className="w-4 h-4 text-lavender-500" />
                                ) : (
                                  <Unlock className="w-4 h-4 text-peach-500" />
                                )}
                                <Badge 
                                  variant="default"
                                  className="bg-green-100 text-green-800"
                                >
                                  Active
                                </Badge>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant={capsule.is_private ? "secondary" : "outline"}>
                                {capsule.is_private ? "Private" : "Public"}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-sm">
                              {format(new Date(capsule.created_at), "MMM dd, yyyy")}
                            </TableCell>
                            <TableCell className="text-sm">
                              {format(new Date(capsule.unlock_date), "MMM dd, yyyy")}
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button size="sm" variant="outline">
                                  <Eye className="w-4 h-4" />
                                </Button>
                                <Button size="sm" variant="destructive">
                                  <Ban className="w-4 h-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  User Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="border-lavender-200">
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-slate-800">{userStats?.userCount || 0}</div>
                      <div className="text-sm text-slate-600">Total Users</div>
                    </CardContent>
                  </Card>
                  <Card className="border-lavender-200">
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-green-600">0</div>
                      <div className="text-sm text-slate-600">Premium Users</div>
                    </CardContent>
                  </Card>
                  <Card className="border-lavender-200">
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-blue-600">100%</div>
                      <div className="text-sm text-slate-600">Active Rate</div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Platform Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="border-lavender-200">
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-2">Content Types</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Text Messages</span>
                          <span className="text-lavender-600">
                            {Math.round((capsules.filter(c => c.content_type === 'text').length / capsules.length) * 100) || 0}%
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Photos</span>
                          <span className="text-skyblue-600">
                            {Math.round((capsules.filter(c => c.content_type === 'image').length / capsules.length) * 100) || 0}%
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Drawings</span>
                          <span className="text-peach-600">
                            {Math.round((capsules.filter(c => c.content_type === 'drawing').length / capsules.length) * 100) || 0}%
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border-lavender-200">
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-2">Privacy Settings</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Public Capsules</span>
                          <span className="text-lavender-600">
                            {Math.round((stats.publicCapsules / stats.totalCapsules) * 100) || 0}%
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Private Capsules</span>
                          <span className="text-skyblue-600">
                            {Math.round((stats.privateCapsules / stats.totalCapsules) * 100) || 0}%
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Platform Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Email Settings */}
                <div>
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email Notifications
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Enable unlock notifications</Label>
                        <p className="text-sm text-slate-600">Send emails when capsules unlock</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Weekly digest emails</Label>
                        <p className="text-sm text-slate-600">Send weekly summaries to users</p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>

                {/* Ad Settings */}
                <div>
                  <h3 className="font-semibold mb-4">Advertisement Settings</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Enable advertisements</Label>
                        <p className="text-sm text-slate-600">Show banner ads to free users</p>
                      </div>
                      <Switch 
                        checked={adSettings.enabled}
                        onCheckedChange={(checked) => 
                          setAdSettings(prev => ({ ...prev, enabled: checked }))
                        }
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Ad Frequency</Label>
                        <Select 
                          value={adSettings.frequency} 
                          onValueChange={(value) => 
                            setAdSettings(prev => ({ ...prev, frequency: value }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label>Ad Placement</Label>
                        <Select 
                          value={adSettings.placement} 
                          onValueChange={(value) => 
                            setAdSettings(prev => ({ ...prev, placement: value }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="top">Top of page</SelectItem>
                            <SelectItem value="bottom">Bottom of page</SelectItem>
                            <SelectItem value="sidebar">Sidebar</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
