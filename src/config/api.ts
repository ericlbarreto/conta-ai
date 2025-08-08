// Configurações da API
export const API_CONFIG = {
  // URL base da API de IA
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  
  // Endpoint para chat
  CHAT_ENDPOINT: '/question',

  UPLOAD_ENDPOINT: '/upload-pdf',
  
  // Endpoint para health check
  HEALTH_ENDPOINT: '/status',
  
  // Timeout das requisições (30 segundos)
  TIMEOUT: 30000,
  
  // Tamanho máximo de arquivo (10MB)
  MAX_FILE_SIZE: 10 * 1024 * 1024,
  
  // Tipos de arquivo permitidos
  ALLOWED_FILE_TYPES: ['.pdf', '.xlsx', '.xls', '.csv']
};

// Função para construir URL completa
export const buildApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
}; 