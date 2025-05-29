
import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageCircle, Send, ArrowLeft } from 'lucide-react';
import { useMessages, useSendMessage, useRealtimeMessages, useMarkMessagesAsRead } from '@/hooks/useChat';
import { useAuth } from '@/contexts/AuthContext';
import { format } from 'date-fns';

interface ChatProps {
  friendId: string;
  friendName: string;
  onBack: () => void;
}

const Chat = ({ friendId, friendName, onBack }: ChatProps) => {
  const [message, setMessage] = useState('');
  const { user } = useAuth();
  const { data: messages = [], isLoading } = useMessages(friendId);
  const sendMessage = useSendMessage();
  const markAsRead = useMarkMessagesAsRead();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Set up real-time message updates
  useRealtimeMessages(friendId);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Mark messages as read when component mounts
  useEffect(() => {
    if (friendId) {
      markAsRead.mutate(friendId);
    }
  }, [friendId, markAsRead]);

  const handleSendMessage = () => {
    if (message.trim() && !sendMessage.isPending) {
      sendMessage.mutate(
        { receiverId: friendId, content: message },
        {
          onSuccess: () => {
            setMessage('');
          }
        }
      );
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (isLoading) {
    return (
      <Card className="h-[600px] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-6 h-6 border-2 border-lavender-500 border-t-transparent rounded-full mx-auto mb-2"></div>
          <p className="text-slate-600">Loading messages...</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <MessageCircle className="w-5 h-5 text-lavender-500" />
          <span>Chat with {friendName}</span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-0">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-slate-800">
          {messages.length === 0 ? (
            <div className="text-center py-8">
              <MessageCircle className="w-12 h-12 text-slate-300 mx-auto mb-2" />
              <p className="text-slate-600 dark:text-slate-400">Start your conversation with {friendName}!</p>
            </div>
          ) : (
            messages.map((msg) => {
              const isOwnMessage = msg.sender_id === user?.id;
              return (
                <div
                  key={msg.id}
                  className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      isOwnMessage
                        ? 'bg-gradient-to-r from-lavender-500 to-skyblue-500 text-white'
                        : 'bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-600'
                    }`}
                  >
                    <p className="text-sm">{msg.content}</p>
                    <p className={`text-xs mt-1 ${
                      isOwnMessage ? 'text-white/70' : 'text-slate-500 dark:text-slate-400'
                    }`}>
                      {format(new Date(msg.created_at), 'HH:mm')}
                    </p>
                  </div>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-600">
          <div className="flex gap-2">
            <Input
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={sendMessage.isPending}
              className="flex-1"
            />
            <Button
              onClick={handleSendMessage}
              disabled={!message.trim() || sendMessage.isPending}
              className="bg-gradient-to-r from-lavender-500 to-skyblue-500 hover:from-lavender-600 hover:to-skyblue-600"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Chat;
