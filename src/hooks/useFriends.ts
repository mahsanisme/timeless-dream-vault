
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Friend {
  id: string;
  user_id: string;
  friend_id: string;
  status: 'pending' | 'accepted' | 'blocked';
  created_at: string;
  updated_at: string;
  friend_profile?: {
    id: string;
    email: string;
    full_name: string;
    avatar_url: string;
  };
}

export interface UserSearchResult {
  id: string;
  email: string;
  full_name: string;
  avatar_url: string;
}

export const useFriends = () => {
  return useQuery({
    queryKey: ['friends'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('friends')
        .select(`
          *,
          friend_profile:friend_id(id, email, full_name, avatar_url)
        `)
        .eq('user_id', user.id)
        .eq('status', 'accepted');

      if (error) throw error;
      
      // Transform the data to match our Friend interface
      return data.map(friend => ({
        ...friend,
        friend_profile: Array.isArray(friend.friend_profile) ? friend.friend_profile[0] : friend.friend_profile
      })) as Friend[];
    },
  });
};

export const useFriendRequests = () => {
  return useQuery({
    queryKey: ['friend-requests'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('friends')
        .select(`
          *,
          friend_profile:user_id(id, email, full_name, avatar_url)
        `)
        .eq('friend_id', user.id)
        .eq('status', 'pending');

      if (error) throw error;
      
      // Transform the data to match our Friend interface
      return data.map(request => ({
        ...request,
        friend_profile: Array.isArray(request.friend_profile) ? request.friend_profile[0] : request.friend_profile
      })) as Friend[];
    },
  });
};

export const useSearchUsers = () => {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (searchTerm: string) => {
      if (!searchTerm.trim()) return [];

      const { data, error } = await supabase.rpc('search_users', {
        search_term: searchTerm
      });

      if (error) throw error;
      return data as UserSearchResult[];
    },
    onError: (error: any) => {
      console.error('Search error:', error);
      toast({
        title: 'Search failed',
        description: 'Failed to search users. Please try again.',
        variant: 'destructive',
      });
    },
  });
};

export const useSendFriendRequest = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (friendId: string) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('friends')
        .insert({
          user_id: user.id,
          friend_id: friendId,
          status: 'pending'
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['friends'] });
      toast({
        title: 'Friend request sent!',
        description: 'Your friend request has been sent successfully.',
      });
    },
    onError: (error: any) => {
      console.error('Friend request error:', error);
      toast({
        title: 'Failed to send request',
        description: error.message || 'Failed to send friend request. Please try again.',
        variant: 'destructive',
      });
    },
  });
};

export const useRespondToFriendRequest = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ requestId, action }: { requestId: string; action: 'accept' | 'decline' }) => {
      if (action === 'accept') {
        const { data, error } = await supabase
          .from('friends')
          .update({ status: 'accepted' })
          .eq('id', requestId)
          .select()
          .single();

        if (error) throw error;
        return data;
      } else {
        const { error } = await supabase
          .from('friends')
          .delete()
          .eq('id', requestId);

        if (error) throw error;
        return null;
      }
    },
    onSuccess: (_, { action }) => {
      queryClient.invalidateQueries({ queryKey: ['friends'] });
      queryClient.invalidateQueries({ queryKey: ['friend-requests'] });
      toast({
        title: action === 'accept' ? 'Friend request accepted!' : 'Friend request declined',
        description: action === 'accept' 
          ? 'You are now friends and can chat with each other.' 
          : 'The friend request has been declined.',
      });
    },
    onError: (error: any) => {
      console.error('Friend request response error:', error);
      toast({
        title: 'Action failed',
        description: 'Failed to respond to friend request. Please try again.',
        variant: 'destructive',
      });
    },
  });
};
