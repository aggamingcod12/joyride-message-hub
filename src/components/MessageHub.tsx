
import { useState } from 'react';
import { ContactSidebar } from './ContactSidebar';
import { ChatWindow } from './ChatWindow';
import { Contact, Message } from '@/types/chat';

const mockContacts: Contact[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b86bb495?w=150&h=150&fit=crop&crop=face',
    lastMessage: 'Hey! How was your day?',
    timestamp: '2m ago',
    isOnline: true,
    unreadCount: 2
  },
  {
    id: '2',
    name: 'Alex Johnson',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    lastMessage: 'Thanks for the help earlier!',
    timestamp: '1h ago',
    isOnline: true,
    unreadCount: 0
  },
  {
    id: '3',
    name: 'Maya Patel',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    lastMessage: 'See you tomorrow 👋',
    timestamp: '3h ago',
    isOnline: false,
    unreadCount: 0
  },
  {
    id: '4',
    name: 'David Kim',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    lastMessage: 'Perfect! Let\'s do it',
    timestamp: '1d ago',
    isOnline: true,
    unreadCount: 1
  }
];

const mockMessages: Message[] = [
  {
    id: '1',
    senderId: '1',
    content: 'Hey! How was your day?',
    timestamp: new Date(Date.now() - 120000),
    isSent: false
  },
  {
    id: '2',
    senderId: 'me',
    content: 'It was great! Just finished a big project. How about you?',
    timestamp: new Date(Date.now() - 60000),
    isSent: true
  },
  {
    id: '3',
    senderId: '1',
    content: 'Awesome! I\'ve been working on some new designs. Want to see them? 🎨',
    timestamp: new Date(Date.now() - 30000),
    isSent: false
  }
];

export const MessageHub = () => {
  const [selectedContact, setSelectedContact] = useState<Contact>(mockContacts[0]);
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleSendMessage = (content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: 'me',
      content,
      timestamp: new Date(),
      isSent: true
    };
    setMessages(prev => [...prev, newMessage]);
  };

  return (
    <div className="h-full flex bg-gradient-to-br from-purple-400 via-pink-300 to-teal-400">
      <ContactSidebar
        contacts={mockContacts}
        selectedContact={selectedContact}
        onSelectContact={setSelectedContact}
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      
      <ChatWindow
        contact={selectedContact}
        messages={messages}
        onSendMessage={handleSendMessage}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        isSidebarOpen={isSidebarOpen}
      />
    </div>
  );
};
