import { useRef, useEffect, useState, useCallback } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { useChat } from '@/hooks/useChat';
import { Button } from '@/components/ui/button';
import { Trash2, Paperclip } from 'lucide-react';

const ChatInterface = () => {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const {
    messages,
    isLoading,
    uploadedFiles,
    addFiles,
    removeFile,
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

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    const validFiles = files.filter(file => {
      const validTypes = ['.pdf', '.xlsx', '.xls', '.csv'];
      return validTypes.some(type => file.name.toLowerCase().includes(type));
    });
    
    if (validFiles.length > 0) {
      addFiles(validFiles);
    }
  }, [addFiles]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      addFiles(files);
    }
  }, [addFiles]);

  return (
    <div className="flex flex-col h-full">
      <Card className="flex flex-col h-[600px] bg-gradient-card shadow-medium">
        <div className="flex items-center justify-between p-4 border-b border-border flex-shrink-0">
          <h3 className="font-semibold">ContaAI</h3>
          <div className="flex gap-2">
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
                  PDF, Excel ou CSV
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
                    Envie seus documentos contábeis (PDF, Excel, CSV) para começarmos a análise inteligente dos seus dados.
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
        <div className="mt-4 flex-shrink-0">
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Arquivos selecionados:</h4>
            <div className="max-h-32 overflow-y-auto space-y-2">
              {uploadedFiles.map((file, index) => (
                <Card key={index} className="flex items-center justify-between p-3">
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
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(index)}
                    className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatInterface; 