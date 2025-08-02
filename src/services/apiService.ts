import axios, { AxiosResponse } from 'axios';
import { API_CONFIG, buildApiUrl } from '@/config/api';

// Interface para resposta da API
interface AIResponse {
  message: string;
  success: boolean;
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

  // Envia mensagem e arquivos para a API de IA
  async sendMessage(message: string, files: File[]): Promise<string> {
    try {
      const formData = new FormData();
      
      // Adiciona a mensagem
      formData.append('message', message);
      
      // Adiciona os arquivos
      files.forEach((file, index) => {
        formData.append('files', file);
      });

      const response: AxiosResponse<AIResponse> = await axios.post(
        buildApiUrl(API_CONFIG.CHAT_ENDPOINT),
        formData,
        {
          timeout: this.timeout,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.data.success) {
        return response.data.message;
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