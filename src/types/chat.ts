
export interface Contact {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  isOnline: boolean;
  unreadCount: number;
}

export interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: Date;
  isSent: boolean;
}
