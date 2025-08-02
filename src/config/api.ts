// Configurações da API
export const API_CONFIG = {
  // URL base da API de IA
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:3001',
  
  // Endpoint para chat
  CHAT_ENDPOINT: '/api/ai/chat',
  
  // Endpoint para health check
  HEALTH_ENDPOINT: '/api/health',
  
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