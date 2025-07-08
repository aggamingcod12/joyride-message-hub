
import { Message } from '@/types/chat';

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble = ({ message }: MessageBubbleProps) => {
  const formatTime = (timestamp: Date) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={`
      flex animate-message-in
      ${message.isSent ? 'justify-end' : 'justify-start'}
    `}>
      <div className={`
        group max-w-xs lg:max-w-md
        ${message.isSent ? 'message-bubble-sent' : 'message-bubble-received'}
        hover:scale-105 transition-transform duration-200
      `}>
        <p className="text-sm leading-relaxed">{message.content}</p>
        <p className={`
          text-xs mt-1 opacity-70
          ${message.isSent ? 'text-white/70' : 'text-gray-500'}
        `}>
          {formatTime(message.timestamp)}
        </p>
      </div>
    </div>
  );
};
