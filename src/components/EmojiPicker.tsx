
import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface EmojiPickerProps {
  onEmojiSelect: (emoji: string) => void;
}

const emojis = ['😀', '😂', '🥰', '😍', '🤗', '👍', '❤️', '🎉', '🔥', '✨', '🚀', '💯'];

export const EmojiPicker = ({ onEmojiSelect }: EmojiPickerProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="text-gray-400 hover:text-purple-500 p-1 transition-all duration-200 hover:scale-110"
      >
        <span className="text-lg">😊</span>
      </Button>
      
      {isOpen && (
        <div className="absolute bottom-12 right-0 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-3 grid grid-cols-4 gap-2 z-10">
          {emojis.map((emoji) => (
            <Button
              key={emoji}
              variant="ghost"
              size="sm"
              onClick={() => {
                onEmojiSelect(emoji);
                setIsOpen(false);
              }}
              className="hover:bg-purple-100 rounded-lg p-2 transition-all duration-200 hover:scale-110"
            >
              <span className="text-lg">{emoji}</span>
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};
