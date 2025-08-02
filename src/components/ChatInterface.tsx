import { useState, useRef, useEffect } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { ChatMessage as IChatMessage, DocumentFile } from '@/types';
import { AIService } from '@/services/aiService';

interface ChatInterfaceProps {
  documents: DocumentFile[];
}

const ChatInterface = ({ documents }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<IChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const aiService = new AIService();

  useEffect(() => {
    aiService.setDocuments(documents);
  }, [documents]);

  useEffect(() => {
    // Auto-scroll to bottom when new messages are added
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    const userMessage: IChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await aiService.processQuery(content);
      
      const assistantMessage: IChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: IChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "❌ **Desculpe, ocorreu um erro interno.**\n\nTente novamente em alguns instantes. Se o problema persistir, verifique sua conexão ou recarregue a página.\n\n**Estou aqui para ajudar assim que possível!** 😊",
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="flex h-[600px] flex-col bg-gradient-card shadow-medium">
      <div className="flex-1 p-4">
        <ScrollArea ref={scrollAreaRef} className="h-full pr-4">
          <div className="space-y-6">
            {messages.length === 0 && (
              <div className="text-center py-12">
                <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-gradient-success flex items-center justify-center shadow-soft">
                  <span className="text-2xl">🤖</span>
                </div>
                <h3 className="mb-2 text-lg font-semibold">Olá! Sou seu assistente contábil 😊</h3>
                <p className="text-sm text-muted-foreground max-w-md mx-auto">
                  {documents.length > 0 
                    ? "Agora posso analisar seus documentos! Faça perguntas sobre receitas, despesas, lucros ou solicite gráficos e relatórios." 
                    : "Envie seus documentos contábeis (PDF, Excel, CSV) para começarmos a análise inteligente dos seus dados."
                  }
                </p>
              </div>
            )}
            
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            
            {isLoading && (
              <div className="flex gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-success text-white">
                  <span className="text-sm">🤖</span>
                </div>
                <Card className="bg-card p-4 shadow-soft">
                  <div className="flex items-center gap-2">
                    <div className="flex space-x-1">
                      <div className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:-0.3s]"></div>
                      <div className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:-0.15s]"></div>
                      <div className="h-2 w-2 animate-bounce rounded-full bg-primary"></div>
                    </div>
                    <span className="text-sm text-muted-foreground">Analisando documentos...</span>
                  </div>
                </Card>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
      
      <div className="border-t border-border p-4">
        <ChatInput
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
          hasFiles={documents.length > 0}
        />
      </div>
    </Card>
  );
};

export default ChatInterface;