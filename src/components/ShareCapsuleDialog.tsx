
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Mail, Users, Link, Send } from 'lucide-react';
import { useShareCapsule } from '@/hooks/useCapsuleSharing';
import { useFriends } from '@/hooks/useFriends';

interface ShareCapsuleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  capsuleId: string;
}

const ShareCapsuleDialog = ({ open, onOpenChange, capsuleId }: ShareCapsuleDialogProps) => {
  const [email, setEmail] = useState('');
  const [selectedFriend, setSelectedFriend] = useState('');
  const shareCapsule = useShareCapsule();
  const { data: friends = [] } = useFriends();

  const handleShareByEmail = () => {
    if (email.trim()) {
      shareCapsule.mutate({
        capsuleId,
        shareMethod: 'email',
        recipientEmail: email
      }, {
        onSuccess: () => {
          setEmail('');
          onOpenChange(false);
        }
      });
    }
  };

  const handleShareWithFriend = () => {
    if (selectedFriend) {
      shareCapsule.mutate({
        capsuleId,
        shareMethod: 'friend',
        friendId: selectedFriend
      }, {
        onSuccess: () => {
          setSelectedFriend('');
          onOpenChange(false);
        }
      });
    }
  };

  const handleShareByLink = () => {
    shareCapsule.mutate({
      capsuleId,
      shareMethod: 'link'
    }, {
      onSuccess: () => {
        onOpenChange(false);
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Send className="w-5 h-5 text-lavender-500" />
            Share Capsule
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="friends" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="friends" className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              Friends
            </TabsTrigger>
            <TabsTrigger value="email" className="flex items-center gap-1">
              <Mail className="w-4 h-4" />
              Email
            </TabsTrigger>
            <TabsTrigger value="link" className="flex items-center gap-1">
              <Link className="w-4 h-4" />
              Link
            </TabsTrigger>
          </TabsList>

          <TabsContent value="friends" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="friend-select">Select a friend</Label>
              <Select value={selectedFriend} onValueChange={setSelectedFriend}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a friend..." />
                </SelectTrigger>
                <SelectContent>
                  {friends.map((friend) => (
                    <SelectItem key={friend.friend_id} value={friend.friend_id}>
                      {friend.friend_profile?.full_name || friend.friend_profile?.email || 'Unknown'}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button 
              onClick={handleShareWithFriend}
              disabled={!selectedFriend || shareCapsule.isPending}
              className="w-full bg-gradient-to-r from-lavender-500 to-skyblue-500 hover:from-lavender-600 hover:to-skyblue-600"
            >
              <Send className="w-4 h-4 mr-2" />
              Share with Friend
            </Button>
          </TabsContent>

          <TabsContent value="email" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter email address..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <Button 
              onClick={handleShareByEmail}
              disabled={!email.trim() || shareCapsule.isPending}
              className="w-full bg-gradient-to-r from-lavender-500 to-skyblue-500 hover:from-lavender-600 hover:to-skyblue-600"
            >
              <Mail className="w-4 h-4 mr-2" />
              Send Email
            </Button>
          </TabsContent>

          <TabsContent value="link" className="space-y-4">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Generate a shareable link that anyone can use to view your capsule.
            </p>
            <Button 
              onClick={handleShareByLink}
              disabled={shareCapsule.isPending}
              className="w-full bg-gradient-to-r from-lavender-500 to-skyblue-500 hover:from-lavender-600 hover:to-skyblue-600"
            >
              <Link className="w-4 h-4 mr-2" />
              Copy Share Link
            </Button>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default ShareCapsuleDialog;
