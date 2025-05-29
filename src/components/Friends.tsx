
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserPlus, Users, Search, Check, X, MessageCircle } from 'lucide-react';
import { useFriends, useFriendRequests, useSearchUsers, useSendFriendRequest, useRespondToFriendRequest } from '@/hooks/useFriends';

interface FriendsProps {
  onStartChat: (friendId: string, friendName: string) => void;
}

const Friends = ({ onStartChat }: FriendsProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data: friends = [], isLoading: friendsLoading } = useFriends();
  const { data: friendRequests = [], isLoading: requestsLoading } = useFriendRequests();
  const searchUsers = useSearchUsers();
  const sendFriendRequest = useSendFriendRequest();
  const respondToRequest = useRespondToFriendRequest();

  const handleSearch = () => {
    if (searchTerm.trim()) {
      searchUsers.mutate(searchTerm);
    }
  };

  const handleSendFriendRequest = (userId: string) => {
    sendFriendRequest.mutate(userId);
  };

  const handleRespondToRequest = (requestId: string, action: 'accept' | 'decline') => {
    respondToRequest.mutate({ requestId, action });
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="friends" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="friends" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Friends ({friends.length})
          </TabsTrigger>
          <TabsTrigger value="requests" className="flex items-center gap-2">
            <UserPlus className="w-4 h-4" />
            Requests ({friendRequests.length})
          </TabsTrigger>
          <TabsTrigger value="search" className="flex items-center gap-2">
            <Search className="w-4 h-4" />
            Add Friends
          </TabsTrigger>
        </TabsList>

        <TabsContent value="friends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                My Friends
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {friendsLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin w-6 h-6 border-2 border-lavender-500 border-t-transparent rounded-full mx-auto"></div>
                  <p className="text-slate-600 mt-2">Loading friends...</p>
                </div>
              ) : friends.length === 0 ? (
                <div className="text-center py-8">
                  <Users className="w-12 h-12 text-slate-300 mx-auto mb-2" />
                  <p className="text-slate-600">No friends yet. Start by searching for people to add!</p>
                </div>
              ) : (
                friends.map((friend) => (
                  <div key={friend.id} className="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-600 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-lavender-400 to-peach-400 rounded-full flex items-center justify-center text-white font-semibold">
                        {friend.friend_profile?.full_name?.charAt(0) || friend.friend_profile?.email?.charAt(0) || 'F'}
                      </div>
                      <div>
                        <div className="font-medium text-slate-800 dark:text-slate-200">
                          {friend.friend_profile?.full_name || 'No name'}
                        </div>
                        <div className="text-sm text-slate-600 dark:text-slate-400">
                          {friend.friend_profile?.email}
                        </div>
                      </div>
                    </div>
                    <Button
                      onClick={() => onStartChat(friend.friend_id, friend.friend_profile?.full_name || friend.friend_profile?.email || 'Friend')}
                      className="bg-gradient-to-r from-lavender-500 to-skyblue-500 hover:from-lavender-600 hover:to-skyblue-600"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Chat
                    </Button>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="requests" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserPlus className="w-5 h-5" />
                Friend Requests
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {requestsLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin w-6 h-6 border-2 border-lavender-500 border-t-transparent rounded-full mx-auto"></div>
                  <p className="text-slate-600 mt-2">Loading requests...</p>
                </div>
              ) : friendRequests.length === 0 ? (
                <div className="text-center py-8">
                  <UserPlus className="w-12 h-12 text-slate-300 mx-auto mb-2" />
                  <p className="text-slate-600">No pending friend requests</p>
                </div>
              ) : (
                friendRequests.map((request) => (
                  <div key={request.id} className="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-600 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-lavender-400 to-peach-400 rounded-full flex items-center justify-center text-white font-semibold">
                        {request.friend_profile?.full_name?.charAt(0) || request.friend_profile?.email?.charAt(0) || 'U'}
                      </div>
                      <div>
                        <div className="font-medium text-slate-800 dark:text-slate-200">
                          {request.friend_profile?.full_name || 'No name'}
                        </div>
                        <div className="text-sm text-slate-600 dark:text-slate-400">
                          {request.friend_profile?.email}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleRespondToRequest(request.id, 'accept')}
                        className="bg-green-500 hover:bg-green-600"
                        disabled={respondToRequest.isPending}
                      >
                        <Check className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleRespondToRequest(request.id, 'decline')}
                        disabled={respondToRequest.isPending}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="search" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="w-5 h-5" />
                Search Users
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
                <Button onClick={handleSearch} disabled={searchUsers.isPending}>
                  <Search className="w-4 h-4" />
                </Button>
              </div>

              {searchUsers.isPending && (
                <div className="text-center py-8">
                  <div className="animate-spin w-6 h-6 border-2 border-lavender-500 border-t-transparent rounded-full mx-auto"></div>
                  <p className="text-slate-600 mt-2">Searching...</p>
                </div>
              )}

              {searchUsers.data && searchUsers.data.length > 0 && (
                <div className="space-y-3">
                  {searchUsers.data.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-600 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-lavender-400 to-peach-400 rounded-full flex items-center justify-center text-white font-semibold">
                          {user.full_name?.charAt(0) || user.email?.charAt(0) || 'U'}
                        </div>
                        <div>
                          <div className="font-medium text-slate-800 dark:text-slate-200">
                            {user.full_name || 'No name'}
                          </div>
                          <div className="text-sm text-slate-600 dark:text-slate-400">
                            {user.email}
                          </div>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => handleSendFriendRequest(user.id)}
                        disabled={sendFriendRequest.isPending}
                        className="bg-gradient-to-r from-lavender-500 to-skyblue-500 hover:from-lavender-600 hover:to-skyblue-600"
                      >
                        <UserPlus className="w-4 h-4 mr-2" />
                        Add Friend
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              {searchUsers.data && searchUsers.data.length === 0 && searchTerm && (
                <div className="text-center py-8">
                  <Search className="w-12 h-12 text-slate-300 mx-auto mb-2" />
                  <p className="text-slate-600">No users found matching "{searchTerm}"</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Friends;
