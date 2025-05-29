
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  created_at: string;
  read_at: string | null;
  sender_profile?: {
    id: string;
    email: string;
    full_name: string;
    avatar_url: string;
  };
}

export const useMessages = (friendId: string) => {
  return useQuery({
    queryKey: ['messages', friendId],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('messages')
        .select(`
          *,
          sender_profile:sender_id(id, email, full_name, avatar_url)
        `)
        .or(`and(sender_id.eq.${user.id},receiver_id.eq.${friendId}),and(sender_id.eq.${friendId},receiver_id.eq.${user.id})`)
        .order('created_at', { ascending: true });

      if (error) throw error;
      
      // Transform the data to match our Message interface
      return data.map(msg => ({
        ...msg,
        sender_profile: Array.isArray(msg.sender_profile) ? msg.sender_profile[0] : msg.sender_profile
      })) as Message[];
    },
    enabled: !!friendId,
  });
};

export const useSendMessage = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ receiverId, content }: { receiverId: string; content: string }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('messages')
        .insert({
          sender_id: user.id,
          receiver_id: receiverId,
          content: content.trim()
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (_, { receiverId }) => {
      queryClient.invalidateQueries({ queryKey: ['messages', receiverId] });
    },
    onError: (error: any) => {
      console.error('Send message error:', error);
      toast({
        title: 'Failed to send message',
        description: 'Your message could not be sent. Please try again.',
        variant: 'destructive',
      });
    },
  });
};

export const useRealtimeMessages = (friendId: string) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!friendId) return;

    const channel = supabase
      .channel('messages-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `or(receiver_id.eq.${friendId},sender_id.eq.${friendId})`
        },
        () => {
          queryClient.invalidateQueries({ queryKey: ['messages', friendId] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [friendId, queryClient]);
};

export const useMarkMessagesAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (senderId: string) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('messages')
        .update({ read_at: new Date().toISOString() })
        .eq('sender_id', senderId)
        .eq('receiver_id', user.id)
        .is('read_at', null);

      if (error) throw error;
    },
    onSuccess: (_, senderId) => {
      queryClient.invalidateQueries({ queryKey: ['messages', senderId] });
    },
  });
};
