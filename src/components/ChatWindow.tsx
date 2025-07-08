
import { useState, useRef, useEffect } from 'react';
import { Menu, Phone, Video, MoreVertical } from 'lucide-react';
import { Contact, Message } from '@/types/chat';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageBubble } from './MessageBubble';
import { MessageInput } from './MessageInput';

interface ChatWindowProps {
  contact: Contact;
  messages: Message[];
  onSendMessage: (content: string) => void;
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
}

export const ChatWindow = ({ 
  contact, 
  messages, 
  onSendMessage, 
  onToggleSidebar, 
  isSidebarOpen 
}: ChatWindowProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex-1 flex flex-col bg-white/5 backdrop-blur-sm">
      {/* Header */}
      <div className="p-4 bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {!isSidebarOpen && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onToggleSidebar}
                className="text-white hover:bg-white/20 lg:hidden"
              >
                <Menu className="w-5 h-5" />
              </Button>
            )}
            
            <div className="relative">
              <Avatar className="w-10 h-10">
                <AvatarImage src={contact.avatar} alt={contact.name} />
                <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
              </Avatar>
              {contact.isOnline && <div className="online-indicator" />}
            </div>
            
            <div>
              <h2 className="font-semibold text-white">{contact.name}</h2>
              <p className="text-sm text-white/70">
                {contact.isOnline ? 'Active now' : 'Last seen recently'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
              <Phone className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
              <Video className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
              <MoreVertical className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <MessageInput onSendMessage={onSendMessage} />
    </div>
  );
};
