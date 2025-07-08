
import { useState } from 'react';
import { Send, Paperclip } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { EmojiPicker } from './EmojiPicker';

interface MessageInputProps {
  onSendMessage: (content: string) => void;
}

export const MessageInput = ({ onSendMessage }: MessageInputProps) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="p-4 bg-white/10 backdrop-blur-md border-t border-white/20">
      <div className="flex items-center space-x-3">
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-white hover:bg-white/20 transition-all duration-200 hover:scale-110"
        >
          <Paperclip className="w-5 h-5" />
        </Button>
        
        <div className="flex-1 relative">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className="chat-input pr-12"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <EmojiPicker onEmojiSelect={(emoji) => setMessage(prev => prev + emoji)} />
          </div>
        </div>
        
        <Button 
          onClick={handleSend}
          disabled={!message.trim()}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-full p-3 transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:hover:scale-100"
        >
          <Send className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};
