import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Key, ExternalLink, Eye, EyeOff } from 'lucide-react';

interface ApiKeyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (apiKey: string) => void;
  currentApiKey?: string;
}

const ApiKeyModal = ({ open, onOpenChange, onSave, currentApiKey }: ApiKeyModalProps) => {
  const [apiKey, setApiKey] = useState(currentApiKey || '');
  const [showKey, setShowKey] = useState(false);
  const [error, setError] = useState('');

  const handleSave = () => {
    if (!apiKey.trim()) {
      setError('Por favor, insira uma API key válida');
      return;
    }

    if (!apiKey.startsWith('sk-')) {
      setError('A API key deve começar com "sk-"');
      return;
    }

    onSave(apiKey.trim());
    onOpenChange(false);
    setError('');
  };

  const handleOpenAILink = () => {
    window.open('https://platform.openai.com/api-keys', '_blank');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Key className="h-5 w-5" />
            Configurar API Key OpenAI
          </DialogTitle>
          <DialogDescription>
            Insira sua chave da API OpenAI para ativar o assistente inteligente.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <Alert>
            <AlertDescription>
              🔒 Sua API key será armazenada apenas localmente no seu navegador para sua segurança.
            </AlertDescription>
          </Alert>

          <div className="space-y-2">
            <Label htmlFor="apikey">API Key OpenAI</Label>
            <div className="relative">
              <Input
                id="apikey"
                type={showKey ? 'text' : 'password'}
                placeholder="sk-..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1 h-8 w-8 p-0"
                onClick={() => setShowKey(!showKey)}
              >
                {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="flex flex-col gap-2">
            <Button onClick={handleSave} className="w-full">
              Salvar API Key
            </Button>
            
            <Button 
              variant="outline" 
              onClick={handleOpenAILink}
              className="w-full"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Obter API Key OpenAI
            </Button>
          </div>

          <div className="text-xs text-muted-foreground space-y-1">
            <p>• Vá para platform.openai.com/api-keys</p>
            <p>• Clique em "Create new secret key"</p>
            <p>• Copie a chave e cole aqui</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ApiKeyModal;