import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Minimize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface AIChatProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AIChat({ isOpen, onClose }: AIChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: '👋 𝙃𝙚𝙡𝙡𝙤! 𝙄\'𝙢 𝙈𝙪𝙨𝙩𝙖𝙛𝙖\'𝙨 𝘼𝙄 𝙖𝙨𝙨𝙞𝙨𝙩𝙖𝙣𝙩. 𝘼𝙨𝙠 𝙢𝙚 𝙖𝙣𝙮𝙩𝙝𝙞𝙣𝙜 𝙖𝙗𝙤𝙪𝙩 𝙝𝙞𝙨 𝙬𝙤𝙧𝙠 𝙤𝙧 𝙜𝙚𝙩 𝙖 𝙦𝙪𝙤𝙩𝙚!',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('ai-chat', {
        body: { messages: [...messages, userMessage] }
      });

      if (error) throw error;

      const assistantMessage: Message = { 
        role: 'assistant', 
        content: data.message 
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('AI chat error:', error);
      toast({
        title: '𝙀𝙧𝙧𝙤𝙧',
        description: '𝙁𝙖𝙞𝙡𝙚𝙙 𝙩𝙤 𝙜𝙚𝙩 𝙧𝙚𝙨𝙥𝙤𝙣𝙨𝙚. 𝙋𝙡𝙚𝙖𝙨𝙚 𝙩𝙧𝙮 𝙖𝙜𝙖𝙞𝙣.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="fixed bottom-24 right-4 sm:bottom-56 sm:right-20 w-[calc(100vw-2rem)] sm:w-96 h-[500px] max-h-[70vh] bg-card/95 backdrop-blur-xl border border-primary/30 rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-primary/20">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
              <h3 className="font-display font-semibold">𝘼𝙄 𝘼𝙨𝙨𝙞𝙨𝙩𝙖𝙣𝙩</h3>
            </div>
            <div className="flex gap-2">
              <Button
                size="icon"
                variant="ghost"
                onClick={onClose}
                className="w-8 h-8"
              >
                <Minimize2 className="w-4 h-4" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                onClick={onClose}
                className="w-8 h-8"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  {message.content}
                </div>
              </motion.div>
            ))}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="bg-muted rounded-2xl px-4 py-3">
                  <div className="flex gap-1">
                    <motion.div
                      className="w-2 h-2 bg-primary rounded-full"
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                    />
                    <motion.div
                      className="w-2 h-2 bg-primary rounded-full"
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                    />
                    <motion.div
                      className="w-2 h-2 bg-primary rounded-full"
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                    />
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-4 border-t border-primary/20">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="𝙏𝙮𝙥𝙚 𝙮𝙤𝙪𝙧 𝙢𝙚𝙨𝙨𝙖𝙜𝙚..."
                className="flex-1 bg-background/50 border-primary/30"
                disabled={isLoading}
              />
              <Button
                type="submit"
                size="icon"
                disabled={!input.trim() || isLoading}
                className="bg-primary hover:bg-primary/90"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
