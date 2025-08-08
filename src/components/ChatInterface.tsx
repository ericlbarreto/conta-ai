import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useChat } from '@/hooks/useChat';
import { Maximize2, Minimize2, Paperclip, Trash2 } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import ChatInput from './ChatInput';
import ChatMessage from './ChatMessage';

const ChatInterface = () => {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const {
    messages,
    isLoading,
    uploadedFiles,
    addFiles,
    clearFiles,
    sendMessage,
    clearMessages
  } = useChat();

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
    await sendMessage(content);
  };

  // Drag and drop handlers
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    const validFiles = files.filter(file => {
      const validTypes = ['.pdf'];
      return validTypes.some(type => file.name.toLowerCase().includes(type));
    });
    
    if (validFiles.length > 0) {
      await addFiles(validFiles);
    }
  }, [addFiles]);

  const handleFileSelect = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      await addFiles(files);
    }
  }, [addFiles]);

  return (
    <div className={`${uploadedFiles.length > 0 ? 'mb-6' : 'mb-4'} h-full transition-all duration-300 ease-in-out ${
      isExpanded
        ? 'fixed inset-0 z-50 bg-background/95 backdrop-blur-sm'
        : ''
    } ${uploadedFiles.length > 0 ? 'grid grid-rows-[85%_15%] gap-3 min-h-0' : 'flex flex-col'}`}>
      <Card className={`flex flex-col transition-all duration-300 ease-in-out ${
        isExpanded ? 'scale-100' : ''
      } bg-gradient-card shadow-medium ${uploadedFiles.length > 0 ? 'h-full' : 'h-full'}`}>
        <div className="flex items-center justify-between p-4 border-b border-border flex-shrink-0">
          <h3 className="font-semibold">ContaAI</h3>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="gap-2 transition-all duration-200 hover:scale-105"
            >
              {isExpanded ? (
                <>
                  <Minimize2 className="h-4 w-4" />
                  Minimizar
                </>
              ) : (
                <>
                  <Maximize2 className="h-4 w-4" />
                  Expandir
                </>
              )}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={clearMessages}
              className="gap-2"
            >
              <Trash2 className="h-4 w-4" />
              Limpar Chat
            </Button>
          </div>
        </div>

        <div
          className={`flex-1 relative overflow-hidden ${
            isDragging ? 'bg-primary/5' : ''
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {/* Drag overlay */}
          {isDragging && (
            <div className="absolute inset-0 bg-primary/10 backdrop-blur-md border-2 border-dashed border-primary rounded-lg flex items-center justify-center z-10">
              <div className="text-center">
                <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-primary/40 flex items-center justify-center">
                  <Paperclip className="h-8 w-8 text-primary" />
                </div>
                <p className="text-lg font-semibold text-primary">
                  Solte seus arquivos aqui
                </p>
                <p className="text-sm text-muted-foreground">
                  PDF
                </p>
              </div>
            </div>
          )}

          <ScrollArea ref={scrollAreaRef} className="h-full">
            <div className="p-4 space-y-4">
              {messages.length === 0 && (
                <div className="text-center py-8">
                  <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-gradient-success flex items-center justify-center shadow-soft">
                    <span className="text-2xl">🤖</span>
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">Olá! Sou seu assistente contábil 😊</h3>
                  <p className="text-sm text-muted-foreground max-w-md mx-auto">
                    Arraste e solte ou clique para anexar seus documentos contábeis (PDF) para começarmos a análise inteligente dos seus dados.
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
                      <span className="text-sm text-muted-foreground">Analisando documento...</span>
                    </div>
                  </Card>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>

        <div className="border-t border-border p-4 flex-shrink-0">
          <ChatInput
            onSendMessage={handleSendMessage}
            isLoading={isLoading}
            hasFiles={uploadedFiles.length > 0}
            disabled={false}
            onFileSelect={handleFileSelect}
          />
        </div>
      </Card>

      {/* Arquivos selecionados - sempre visível */}
      {uploadedFiles.length > 0 && (
        <Card className={`bg-gradient-card shadow-medium min-h-0 ${
          isExpanded ? 'pb-4' : 'pb-0'
        }`}>
          <div className="p-4 h-full flex flex-col min-h-0">
            <h4 className="text-sm font-medium mb-3 flex-shrink-0">Arquivo selecionado:</h4>
            <div className="flex-1 space-y-2 min-h-0">
              {uploadedFiles.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-background/50 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded bg-primary/10">
                      <Paperclip className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{file.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {(file.size / 1024 / 1024).toFixed(2)} MB • {file.type.toUpperCase()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default ChatInterface; 