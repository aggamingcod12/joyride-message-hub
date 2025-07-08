
import { Menu, Search, MoreVertical } from 'lucide-react';
import { Contact } from '@/types/chat';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface ContactSidebarProps {
  contacts: Contact[];
  selectedContact: Contact;
  onSelectContact: (contact: Contact) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export const ContactSidebar = ({ 
  contacts, 
  selectedContact, 
  onSelectContact, 
  isOpen, 
  onToggle 
}: ContactSidebarProps) => {
  return (
    <div className={`
      ${isOpen ? 'w-80' : 'w-0'} 
      transition-all duration-300 ease-in-out overflow-hidden
      bg-white/10 backdrop-blur-md border-r border-white/20
      flex flex-col
    `}>
      {/* Header */}
      <div className="p-4 border-b border-white/20">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-semibold text-white">Messages</h1>
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
            <MoreVertical className="w-5 h-5" />
          </Button>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search conversations..."
            className="pl-10 bg-white/90 backdrop-blur-sm border-0 rounded-full focus:ring-2 focus:ring-purple-400"
          />
        </div>
      </div>

      {/* Contacts List */}
      <div className="flex-1 overflow-y-auto">
        {contacts.map((contact) => (
          <div
            key={contact.id}
            onClick={() => onSelectContact(contact)}
            className={`
              p-4 cursor-pointer transition-all duration-200 hover:bg-white/10
              ${selectedContact.id === contact.id ? 'bg-white/20' : ''}
              border-b border-white/10 last:border-b-0
            `}
          >
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={contact.avatar} alt={contact.name} />
                  <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                </Avatar>
                {contact.isOnline && (
                  <div className="online-indicator animate-pulse-ring">
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
                  </div>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-white truncate">{contact.name}</p>
                  <span className="text-xs text-white/70">{contact.timestamp}</span>
                </div>
                <p className="text-sm text-white/70 truncate">{contact.lastMessage}</p>
              </div>
              
              {contact.unreadCount > 0 && (
                <div className="bg-purple-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-bounce-gentle">
                  {contact.unreadCount}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
