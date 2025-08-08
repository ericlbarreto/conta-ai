import { API_CONFIG, buildApiUrl } from '@/config/api';
import axios, { AxiosResponse } from 'axios';

// Interface para resposta da API
interface AIResponse {
  answer: string;
  success: boolean;
  error?: string;
}

// Interface para resposta do upload
interface UploadResponse {
  success: boolean;
  message?: string;
  filename?: string;
  error?: string;
}

// Service para integração com API de IA
export class APIService {
  private baseURL: string;
  private timeout: number;

  constructor(baseURL?: string, timeout?: number) {
    this.baseURL = baseURL || API_CONFIG.BASE_URL;
    this.timeout = timeout || API_CONFIG.TIMEOUT;
  }

  // Configura a URL base da API
  setBaseURL(url: string) {
    this.baseURL = url;
  }

  // Upload de arquivos para a API
  async uploadFiles(files: File[]): Promise<string> {
    try {
      const formData = new FormData();
      
      // Adiciona os arquivos com o atributo "file"
      files.forEach((file) => {
        formData.append('file', file);
      });

      const response: AxiosResponse<UploadResponse> = await axios.post(
        buildApiUrl(API_CONFIG.UPLOAD_ENDPOINT),
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.status === 200) {
        const hasManyFiles = files.length > 1;
        const message = hasManyFiles ? 'Arquivos enviados com sucesso!' : 'Arquivo enviado com sucesso!';

        return message;
      } else {
        throw new Error(response.data.error || 'Erro desconhecido no upload');
      }
    } catch (error: unknown) {
      console.error('Erro no upload:', error);
      
      if (error && typeof error === 'object' && 'code' in error && error.code === 'ECONNREFUSED') {
        throw new Error('❌ **Servidor não encontrado**\n\nVerifique se a API está rodando em ' + this.baseURL);
      }
      
      if (error && typeof error === 'object' && 'response' in error && error.response && typeof error.response === 'object' && 'status' in error.response) {
        if (error.response.status === 500) {
          throw new Error('❌ **Erro interno do servidor**\n\nTente novamente em alguns instantes.');
        }
        
        if (error.response.status === 413) {
          throw new Error('❌ **Arquivo muito grande**\n\nO arquivo enviado excede o limite permitido.');
        }
      }
      
      throw new Error('❌ **Erro no upload**\n\nVerifique sua conexão e tente novamente.');
    }
  }

  // Envia mensagem e arquivos para a API de IA
  async sendMessage(message: string): Promise<string> {
    try {
      const response: AxiosResponse<AIResponse> = await axios.post(
        buildApiUrl(API_CONFIG.CHAT_ENDPOINT),
        { question: message },
        {
          timeout: this.timeout,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        return response.data.answer;
      } else {
        throw new Error(response.data.error || 'Erro desconhecido na API');
      }
    } catch (error: unknown) {
      console.error('Erro na API:', error);
      
      if (error && typeof error === 'object' && 'code' in error && error.code === 'ECONNREFUSED') {
        throw new Error('❌ **Servidor não encontrado**\n\nVerifique se a API está rodando em ' + this.baseURL);
      }
      
      if (error && typeof error === 'object' && 'response' in error && error.response && typeof error.response === 'object' && 'status' in error.response) {
        if (error.response.status === 500) {
          throw new Error('❌ **Erro interno do servidor**\n\nTente novamente em alguns instantes.');
        }
        
        if (error.response.status === 413) {
          throw new Error('❌ **Arquivo muito grande**\n\nO arquivo enviado excede o limite permitido.');
        }
      }
      
      throw new Error('❌ **Erro na comunicação**\n\nVerifique sua conexão e tente novamente.');
    }
  }

  // Testa a conexão com a API
  async testConnection(): Promise<boolean> {
    try {
      const response = await axios.get(buildApiUrl(API_CONFIG.HEALTH_ENDPOINT), {
        timeout: 5000,
      });
      return response.status === 200;
    } catch (error) {
      return false;
    }
  }
} 