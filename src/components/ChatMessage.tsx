import { Bot, User, Copy, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChatMessage as IChatMessage } from '@/types';
import { toast } from '@/hooks/use-toast';

interface ChatMessageProps {
  message: IChatMessage;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === 'user';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      toast({
        title: "Copiado! 📋",
        description: "Mensagem copiada para a área de transferência."
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast({
        title: "Erro ao copiar",
        description: "Não foi possível copiar a mensagem.",
        variant: "destructive"
      });
    }
  };

  const formatMessage = (content: string) => {
    // Simple markdown-like formatting
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/```(.*?)```/gs, '<pre class="bg-muted p-2 rounded mt-2 text-sm overflow-x-auto"><code>$1</code></pre>')
      .replace(/`(.*?)`/g, '<code class="bg-muted px-1 rounded text-sm">$1</code>')
      .replace(/\n/g, '<br />');
  };

  return (
    <div className={`flex gap-4 animate-fade-in ${isUser ? 'flex-row-reverse' : ''}`}>
      <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
        isUser 
          ? 'bg-primary text-primary-foreground' 
          : 'bg-gradient-success text-white shadow-soft'
      }`}>
        {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
      </div>
      
      <Card className={`max-w-[85%] p-4 break-words ${
        isUser 
          ? 'bg-primary text-primary-foreground shadow-soft' 
          : 'bg-card shadow-soft hover:shadow-medium transition-shadow'
      }`}>
        <div className="group relative">
          <div 
            className="prose prose-sm max-w-none text-inherit [&>*]:break-words [&>pre]:overflow-x-auto [&>pre]:max-w-full"
            dangerouslySetInnerHTML={{ __html: formatMessage(message.content) }}
          />
          
          {!isUser && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              className="absolute -top-2 -right-2 h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              {copied ? (
                <CheckCircle2 className="h-3 w-3 text-primary" />
              ) : (
                <Copy className="h-3 w-3" />
              )}
            </Button>
          )}
        </div>
        
        <div className={`mt-2 text-xs ${
          isUser ? 'text-primary-foreground/70' : 'text-muted-foreground'
        }`}>
          {message.timestamp.toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit'
          })}
        </div>
      </Card>
    </div>
  );
};

export default ChatMessage;