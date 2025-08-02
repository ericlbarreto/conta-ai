import { useState, useRef, KeyboardEvent } from 'react';
import { Send, Paperclip } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  hasFiles: boolean;
  disabled?: boolean;
}

const ChatInput = ({ onSendMessage, isLoading, hasFiles, disabled = false }: ChatInputProps) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    if (!message.trim() || isLoading) return;
    
    onSendMessage(message.trim());
    setMessage('');
    
    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const suggestedQuestions = hasFiles ? [
    "Qual foi o lucro líquido no último período?",
    "Gere um resumo das receitas e despesas",
    "Sugira gráficos para análise dos dados",
    "Identifique tendências nos números"
  ] : [
    "Como posso começar a usar o ContaBot Pro?",
    "Que tipos de arquivo posso enviar?",
    "Como funciona a análise inteligente?"
  ];

  return (
    <div className="space-y-3">
      {!hasFiles && (
        <div className="text-center p-4 bg-gradient-card rounded-lg border">
          <Paperclip className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
          <p className="text-sm text-muted-foreground mb-2">
            📊 Envie seus documentos contábeis para começar a análise inteligente
          </p>
        </div>
      )}
      
      {/* Suggested Questions */}
      <div className="flex flex-wrap gap-2">
        {suggestedQuestions.map((question, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            onClick={() => setMessage(question)}
            className="text-xs hover:bg-primary/10 hover:border-primary/50 transition-colors"
            disabled={isLoading}
          >
            {question}
          </Button>
        ))}
      </div>

      <div className="flex gap-2 items-end">
        <div className="flex-1 relative">
          <Textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              adjustTextareaHeight();
            }}
            onKeyPress={handleKeyPress}
            placeholder={disabled ? "Configure a API key para começar..." : hasFiles ? "Faça uma pergunta sobre seus documentos..." : "Envie documentos e faça perguntas..."}
            disabled={isLoading || disabled}
            className="min-h-[44px] max-h-32 resize-none pr-12 transition-all"
            style={{ height: 'auto' }}
          />
        </div>
        
        <Button
          onClick={handleSend}
          disabled={!message.trim() || isLoading || disabled}
          size="sm"
          className="h-11 w-11 p-0 bg-gradient-primary hover:shadow-medium transition-all"
        >
          <Send className={`h-4 w-4 ${isLoading ? 'animate-pulse' : ''}`} />
        </Button>
      </div>
      
      <p className="text-xs text-muted-foreground text-center">
        {disabled
          ? "🔑 Configure sua API key OpenAI para usar o assistente"
          : hasFiles 
            ? "💡 Use Shift+Enter para quebra de linha" 
            : "🚀 Envie documentos PDF, Excel ou CSV para análise inteligente"
        }
      </p>
    </div>
  );
};

export default ChatInput;