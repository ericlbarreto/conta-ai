import { toast } from '@/hooks/use-toast';
import { APIService } from '@/services/apiService';
import { ChatMessage } from '@/types';
import { useCallback, useState } from 'react';

export const useChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  
  const apiService = new APIService();

  // Adiciona arquivos e faz upload
  const addFiles = useCallback(async (files: File[]) => {
    if (files.length === 0) return;

    setIsLoading(true);
    
    try {
      // Faz upload dos arquivos
      const uploadMessage = await apiService.uploadFiles(files);
      
      // Adiciona os arquivos ao estado local
      setUploadedFiles(prev => [...prev, ...files]);
      
      // Adiciona mensagem de sucesso
      const successMessage: ChatMessage = {
        id: Date.now().toString(),
        role: 'assistant',
        content: `✅ **Arquivos enviados com sucesso!**

${uploadMessage}

Agora você pode fazer perguntas sobre seus documentos. 🚀`,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, successMessage]);
      
      toast({
        title: "Upload realizado",
        description: "Arquivos enviados com sucesso!",
        variant: "default"
      });

    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido no upload';
      
      toast({
        title: "Erro no upload",
        description: errorMessage,
        variant: "destructive"
      });

      // Adiciona mensagem de erro
      const errorMsg: ChatMessage = {
        id: Date.now().toString(),
        role: 'assistant',
        content: `❌ **Erro no upload dos arquivos**

${errorMessage}

**Tente novamente ou verifique sua conexão.**`,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
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

Para começarmos, preciso que você envie seus documentos contábeis (PDF). 

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
    clearFiles,
    sendMessage,
    clearMessages
  };
}; 