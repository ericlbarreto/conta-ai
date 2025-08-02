# Integração com API de IA

## Configuração

O frontend está configurado para se comunicar com uma API de IA. As configurações estão em `src/config/api.ts`.

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_API_URL=http://localhost:3001
```

### Estrutura da API

A API deve implementar os seguintes endpoints:

#### 1. Health Check
```
GET /api/health
```
**Resposta esperada:**
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

#### 2. Chat com IA
```
POST /api/ai/chat
Content-Type: multipart/form-data
```

**Payload:**
- `message`: string (mensagem do usuário)
- `files`: File[] (arquivos PDF, Excel, CSV)

**Resposta esperada:**
```json
{
  "success": true,
  "message": "Resposta da IA em markdown...",
  "error": null
}
```

**Exemplo de erro:**
```json
{
  "success": false,
  "message": null,
  "error": "Descrição do erro"
}
```

## Implementação da API

### Exemplo em Node.js/Express

```javascript
const express = require('express');
const multer = require('multer');
const app = express();

const upload = multer({
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString()
  });
});

// Chat endpoint
app.post('/api/ai/chat', upload.array('files'), async (req, res) => {
  try {
    const { message } = req.body;
    const files = req.files || [];

    // Aqui você implementa sua lógica de IA
    // Processe os arquivos e a mensagem
    const aiResponse = await processWithAI(message, files);

    res.json({
      success: true,
      message: aiResponse,
      error: null
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: null,
      error: error.message
    });
  }
});

app.listen(3001, () => {
  console.log('API rodando na porta 3001');
});
```

### Exemplo em Python/Flask

```python
from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
import os

app = Flask(__name__)

@app.route('/api/health')
def health():
    return jsonify({
        'status': 'ok',
        'timestamp': datetime.now().isoformat()
    })

@app.route('/api/ai/chat', methods=['POST'])
def chat():
    try:
        message = request.form.get('message')
        files = request.files.getlist('files')
        
        # Aqui você implementa sua lógica de IA
        # Processe os arquivos e a mensagem
        ai_response = process_with_ai(message, files)
        
        return jsonify({
            'success': True,
            'message': ai_response,
            'error': None
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'message': None,
            'error': str(e)
        }), 500

if __name__ == '__main__':
    app.run(port=3001, debug=True)
```

## Testando a Integração

1. **Inicie sua API** na porta 3001
2. **Execute o frontend:**
   ```bash
   npm run dev
   ```
3. **Teste o upload de arquivos** e envio de mensagens
4. **Verifique os logs** da API para debug

## Tratamento de Erros

O frontend trata os seguintes erros:

- **ECONNREFUSED**: API não encontrada
- **500**: Erro interno do servidor
- **413**: Arquivo muito grande
- **Outros**: Erro de comunicação

## Configurações Avançadas

### Timeout
O timeout padrão é 30 segundos. Você pode alterar em `src/config/api.ts`:

```typescript
TIMEOUT: 30000, // 30 segundos
```

### Tamanho máximo de arquivo
```typescript
MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
```

### Tipos de arquivo permitidos
```typescript
ALLOWED_FILE_TYPES: ['.pdf', '.xlsx', '.xls', '.csv']
```

## Estrutura de Dados

### Arquivos
Os arquivos são enviados como `File[]` do navegador, mantendo:
- Nome original
- Tipo MIME
- Tamanho
- Conteúdo binário

### Mensagens
As mensagens são strings simples que podem conter markdown para formatação.

## Logs e Debug

O frontend loga erros no console. Para debug:

1. Abra o DevTools (F12)
2. Vá para a aba Console
3. Envie uma mensagem e observe os logs

## Segurança

- Validação de tipos de arquivo no frontend
- Limite de tamanho de arquivo
- Sanitização de mensagens
- Headers CORS apropriados na API 