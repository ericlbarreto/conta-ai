import { useState, useEffect } from 'react';
import { OpenAIService } from '@/services/openaiService';

export const useOpenAI = () => {
  const [apiKey, setApiKey] = useState<string>('');
  const [service, setService] = useState<OpenAIService | null>(null);
  const [isConfigured, setIsConfigured] = useState(false);

  useEffect(() => {
    // Load API key from localStorage
    const savedKey = localStorage.getItem('openai_api_key');
    if (savedKey) {
      setApiKey(savedKey);
      const openaiService = new OpenAIService(savedKey);
      setService(openaiService);
      setIsConfigured(true);
    }
  }, []);

  const configureApiKey = (key: string) => {
    setApiKey(key);
    localStorage.setItem('openai_api_key', key);
    
    const openaiService = new OpenAIService(key);
    setService(openaiService);
    setIsConfigured(true);
  };

  const clearApiKey = () => {
    setApiKey('');
    localStorage.removeItem('openai_api_key');
    setService(null);
    setIsConfigured(false);
  };

  return {
    apiKey,
    service,
    isConfigured,
    configureApiKey,
    clearApiKey
  };
};