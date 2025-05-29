
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useShareCapsule = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ 
      capsuleId, 
      shareMethod,
      recipientEmail,
      friendId 
    }: { 
      capsuleId: string; 
      shareMethod: 'email' | 'friend' | 'link';
      recipientEmail?: string;
      friendId?: string;
    }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Get the capsule to get the share token
      const { data: capsule, error: capsuleError } = await supabase
        .from('capsules')
        .select('share_token')
        .eq('id', capsuleId)
        .single();

      if (capsuleError) throw capsuleError;

      // Create sharing record
      const { data, error } = await supabase
        .from('shared_capsules')
        .insert({
          capsule_id: capsuleId,
          shared_by: user.id,
          recipient_email: shareMethod === 'email' ? recipientEmail : 
                          shareMethod === 'friend' ? (await getUserEmail(friendId!)) : null,
          shared_via: shareMethod
        })
        .select()
        .single();

      if (error) throw error;

      // Return the share link
      const shareLink = `${window.location.origin}/capsule/${capsule.share_token}`;
      
      return { 
        ...data, 
        shareLink,
        shareToken: capsule.share_token
      };
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['shared-capsules'] });
      
      // Copy link to clipboard if sharing via link
      if (variables.shareMethod === 'link') {
        navigator.clipboard.writeText(data.shareLink);
        toast({
          title: 'Link copied!',
          description: 'Share link has been copied to your clipboard.',
        });
      } else {
        toast({
          title: 'Capsule shared!',
          description: 'Your capsule has been shared successfully.',
        });
      }
    },
    onError: (error: any) => {
      console.error('Share capsule error:', error);
      toast({
        title: 'Failed to share',
        description: 'Could not share the capsule. Please try again.',
        variant: 'destructive',
      });
    },
  });
};

async function getUserEmail(userId: string): Promise<string | null> {
  const { data, error } = await supabase
    .from('profiles')
    .select('email')
    .eq('id', userId)
    .single();
  
  if (error) return null;
  return data.email;
}
