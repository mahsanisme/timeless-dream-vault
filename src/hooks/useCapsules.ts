
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

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
        .eq('is_private', false)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Capsule[];
    },
  });
};

export const useCreateCapsule = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (capsule: Omit<Capsule, 'id' | 'user_id' | 'created_at' | 'updated_at' | 'share_token'>) => {
      console.log('Creating capsule with data:', capsule);
      
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError) {
        console.error('Auth error:', userError);
        throw new Error('Authentication failed. Please sign in again.');
      }
      
      if (!user) {
        console.error('No user found');
        throw new Error('You must be signed in to create a capsule');
      }

      console.log('User authenticated:', user.id);

      const { data, error } = await supabase
        .from('capsules')
        .insert({
          user_id: user.id,
          title: capsule.title,
          content: capsule.content,
          content_type: capsule.content_type,
          unlock_date: capsule.unlock_date,
          is_private: capsule.is_private,
          is_locked: capsule.is_locked,
          file_url: capsule.file_url,
        })
        .select()
        .single();

      if (error) {
        console.error('Database error:', error);
        throw error;
      }
      
      console.log('Capsule created successfully:', data);
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['capsules'] });
      queryClient.invalidateQueries({ queryKey: ['user-capsules'] });
      
      toast({
        title: '🔒 Capsule Created!',
        description: 'Your memory has been locked and will unlock on the specified date.',
      });
      
      navigate('/dashboard');
    },
    onError: (error: any) => {
      console.error('Capsule creation error:', error);
      
      let errorMessage = 'Failed to create capsule. Please try again.';
      
      if (error.message?.includes('Authentication')) {
        errorMessage = 'Please sign in to create a capsule.';
      } else if (error.message?.includes('policies')) {
        errorMessage = 'Permission denied. Please check your account status.';
      }
      
      toast({
        title: 'Failed to create capsule',
        description: errorMessage,
        variant: 'destructive',
      });
    },
  });
};

export const useUserCapsules = () => {
  return useQuery({
    queryKey: ['user-capsules'],
    queryFn: async () => {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) {
        throw new Error('Not authenticated');
      }

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
