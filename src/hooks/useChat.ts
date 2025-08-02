import { useState, useCallback } from 'react';
import { ChatMessage } from '@/types';
import { APIService } from '@/services/apiService';
import { toast } from '@/hooks/use-toast';

export const useChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  
  const apiService = new APIService();

  // Adiciona arquivos
  const addFiles = useCallback((files: File[]) => {
    setUploadedFiles(prev => [...prev, ...files]);
  }, []);

  // Remove arquivo por índice
  const removeFile = useCallback((index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  }, []);

  // Limpa todos os arquivos
  const clearFiles = useCallback(() => {
    setUploadedFiles([]);
  }, []);

  // Adiciona mensagem do usuário
  const addUserMessage = useCallback((content: string) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    return userMessage;
  }, []);

  // Adiciona mensagem da IA
  const addAIMessage = useCallback((content: string) => {
    const aiMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'assistant',
      content,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, aiMessage]);
    return aiMessage;
  }, []);

  // Envia mensagem para a API
  const sendMessage = useCallback(async (message: string) => {
    if (!message.trim()) return;

    setIsLoading(true);
    
    try {
      // Adiciona mensagem do usuário
      addUserMessage(message);

      // Se não há arquivos, mostra mensagem padrão
      if (uploadedFiles.length === 0) {
        addAIMessage(`📋 **Olá! Sou seu assistente de análise contábil** 😊

Para começarmos, preciso que você envie seus documentos contábeis (PDF, Excel ou CSV). 

Após o upload, poderei ajudá-lo com:
• 📊 Análise de receitas e despesas
• 💰 Cálculo de lucros e margens
• 📈 Sugestões de gráficos e visualizações
• 📋 Resumos executivos
• 🔍 Identificação de tendências

**Estou aqui para tornar sua análise contábil mais rápida e precisa!** ✨`);
        return;
      }

      // Envia para a API
      const response = await apiService.sendMessage(message, uploadedFiles);
      addAIMessage(response);

    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      
      toast({
        title: "Erro na comunicação",
        description: errorMessage,
        variant: "destructive"
      });

      addAIMessage(`❌ **Erro na comunicação com a IA**

${errorMessage}

**Tente novamente ou verifique sua conexão.**`);
    } finally {
      setIsLoading(false);
    }
  }, [uploadedFiles, addUserMessage, addAIMessage]);

  // Limpa o histórico de mensagens
  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  return {
    messages,
    isLoading,
    uploadedFiles,
    addFiles,
    removeFile,
    clearFiles,
    sendMessage,
    clearMessages
  };
}; 