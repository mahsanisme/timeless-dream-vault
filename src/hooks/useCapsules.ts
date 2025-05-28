
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Capsule {
  id: string;
  user_id: string;
  title: string | null;
  content: string | null;
  content_type: 'text' | 'image' | 'drawing';
  unlock_date: string;
  is_private: boolean;
  is_locked: boolean;
  file_url: string | null;
  share_token: string;
  created_at: string;
  updated_at: string;
}

export const useCapsules = () => {
  return useQuery({
    queryKey: ['capsules'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('capsules')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Capsule[];
    },
  });
};

export const useCreateCapsule = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (capsule: Omit<Capsule, 'id' | 'user_id' | 'created_at' | 'updated_at' | 'share_token'>) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('capsules')
        .insert({
          ...capsule,
          user_id: user.id,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['capsules'] });
      toast({
        title: '🔒 Capsule Created!',
        description: 'Your memory has been locked and will unlock on the specified date.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Failed to create capsule',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
};

export const useUserCapsules = () => {
  return useQuery({
    queryKey: ['user-capsules'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('capsules')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Capsule[];
    },
  });
};
