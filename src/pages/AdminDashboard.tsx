
import { useState, useEffect } from "react";
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
import { format } from "date-fns";

interface Capsule {
  id: number;
  type: string;
  content: string;
  unlockDate: Date;
  isPrivate: boolean;
  createdAt: Date;
  isLocked: boolean;
  userEmail: string;
  status: "active" | "flagged" | "banned";
}

const AdminDashboard = () => {
  const [capsules, setCapsules] = useState<Capsule[]>([]);
  const [filter, setFilter] = useState<"all" | "locked" | "unlocked" | "flagged">("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [adSettings, setAdSettings] = useState({
    enabled: true,
    frequency: "medium",
    placement: "bottom"
  });

  useEffect(() => {
    // Mock data for demonstration
    const mockCapsules: Capsule[] = [
      {
        id: 1,
        type: "text",
        content: "Dear future me, I hope you remember this beautiful sunset...",
        unlockDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        isPrivate: false,
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        isLocked: true,
        userEmail: "user1@example.com",
        status: "active"
      },
      {
        id: 2,
        type: "image",
        content: "data:image/placeholder",
        unlockDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        isPrivate: true,
        createdAt: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000),
        isLocked: false,
        userEmail: "user2@example.com",
        status: "active"
      },
      {
        id: 3,
        type: "text",
        content: "Inappropriate content example...",
        unlockDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
        isPrivate: false,
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        isLocked: true,
        userEmail: "user3@example.com",
        status: "flagged"
      }
    ];
    setCapsules(mockCapsules);
  }, []);

  const filteredCapsules = capsules.filter((capsule) => {
    const matchesFilter = 
      filter === "all" || 
      (filter === "locked" && capsule.isLocked) ||
      (filter === "unlocked" && !capsule.isLocked) ||
      (filter === "flagged" && capsule.status === "flagged");
    
    const matchesSearch = 
      capsule.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      capsule.userEmail.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const stats = {
    totalCapsules: capsules.length,
    lockedCapsules: capsules.filter(c => c.isLocked).length,
    unlockedCapsules: capsules.filter(c => !c.isLocked).length,
    flaggedCapsules: capsules.filter(c => c.status === "flagged").length,
    publicCapsules: capsules.filter(c => !c.isPrivate).length,
    privateCapsules: capsules.filter(c => c.isPrivate).length
  };

  const handleBanCapsule = (id: number) => {
    setCapsules(prev => prev.map(capsule => 
      capsule.id === id 
        ? { ...capsule, status: "banned" as const }
        : capsule
    ));
  };

  const handleUnflagCapsule = (id: number) => {
    setCapsules(prev => prev.map(capsule => 
      capsule.id === id 
        ? { ...capsule, status: "active" as const }
        : capsule
    ));
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
                        placeholder="Search by content or user email..."
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
                        <TableHead>Type</TableHead>
                        <TableHead>User</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Privacy</TableHead>
                        <TableHead>Created</TableHead>
                        <TableHead>Unlock Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredCapsules.map((capsule) => (
                        <TableRow key={capsule.id}>
                          <TableCell className="font-mono">{capsule.id}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{capsule.type}</Badge>
                          </TableCell>
                          <TableCell className="font-mono text-sm">{capsule.userEmail}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {capsule.isLocked ? (
                                <Lock className="w-4 h-4 text-lavender-500" />
                              ) : (
                                <Unlock className="w-4 h-4 text-peach-500" />
                              )}
                              <Badge 
                                variant={capsule.status === "flagged" ? "destructive" : "default"}
                                className={
                                  capsule.status === "active" ? "bg-green-100 text-green-800" :
                                  capsule.status === "flagged" ? "bg-red-100 text-red-800" :
                                  "bg-slate-100 text-slate-800"
                                }
                              >
                                {capsule.status}
                              </Badge>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant={capsule.isPrivate ? "secondary" : "outline"}>
                              {capsule.isPrivate ? "Private" : "Public"}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-sm">
                            {format(capsule.createdAt, "MMM dd, yyyy")}
                          </TableCell>
                          <TableCell className="text-sm">
                            {format(capsule.unlockDate, "MMM dd, yyyy")}
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                <Eye className="w-4 h-4" />
                              </Button>
                              {capsule.status === "flagged" && (
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => handleUnflagCapsule(capsule.id)}
                                >
                                  <Star className="w-4 h-4" />
                                </Button>
                              )}
                              <Button 
                                size="sm" 
                                variant="destructive"
                                onClick={() => handleBanCapsule(capsule.id)}
                              >
                                <Ban className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
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
                <p className="text-slate-600 mb-4">User management features coming soon...</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="border-lavender-200">
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-slate-800">245</div>
                      <div className="text-sm text-slate-600">Total Users</div>
                    </CardContent>
                  </Card>
                  <Card className="border-lavender-200">
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-green-600">12</div>
                      <div className="text-sm text-slate-600">Premium Users</div>
                    </CardContent>
                  </Card>
                  <Card className="border-lavender-200">
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-blue-600">89%</div>
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
                <p className="text-slate-600 mb-4">Analytics dashboard coming soon...</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="border-lavender-200">
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-2">Popular Unlock Times</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>1 Month</span>
                          <span className="text-lavender-600">45%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>1 Year</span>
                          <span className="text-skyblue-600">35%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>5+ Years</span>
                          <span className="text-peach-600">20%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border-lavender-200">
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-2">Content Types</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Text Messages</span>
                          <span className="text-lavender-600">60%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Photos</span>
                          <span className="text-skyblue-600">30%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Drawings</span>
                          <span className="text-peach-600">10%</span>
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

                {/* Time Lock Settings */}
                <div>
                  <h3 className="font-semibold mb-4">Time Lock Presets</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label>Minimum lock duration</Label>
                      <Select defaultValue="1day">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1hour">1 Hour</SelectItem>
                          <SelectItem value="1day">1 Day</SelectItem>
                          <SelectItem value="1week">1 Week</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label>Maximum lock duration</Label>
                      <Select defaultValue="50years">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="10years">10 Years</SelectItem>
                          <SelectItem value="25years">25 Years</SelectItem>
                          <SelectItem value="50years">50 Years</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label>Default lock duration</Label>
                      <Select defaultValue="1year">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1month">1 Month</SelectItem>
                          <SelectItem value="6months">6 Months</SelectItem>
                          <SelectItem value="1year">1 Year</SelectItem>
                        </SelectContent>
                      </Select>
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
