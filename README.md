# ContaAI - Análise Contábil Inteligente

<div align="center">
  <img src="https://img.shields.io/badge/React-18.2.0-blue?style=for-the-badge&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind-3.3-blue?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Vite-5.0-purple?style=for-the-badge&logo=vite" alt="Vite" />
</div>

## 🚀 Sobre o Projeto

**ContaAI** é uma plataforma inovadora de análise contábil inteligente que transforma documentos contábeis em insights poderosos. Utilizando tecnologia de IA avançada, oferecemos análise instantânea de receitas, despesas, lucros e tendências financeiras.

### ✨ Principais Funcionalidades

- 🤖 **IA Especializada** - Análise inteligente de documentos contábeis
- 📊 **Análise Completa** - Receitas, despesas, lucros, impostos e tendências
- ⚡ **Resposta Instantânea** - Resultados em segundos
- 🔒 **Seguro e Privado** - Criptografia de ponta a ponta
- 📁 **Upload Inteligente** - Suporte a PDF
- 💬 **Chat Interativo** - Interface conversacional intuitiva

## 🛠️ Tecnologias Utilizadas

- **Frontend**: React 18 + TypeScript
- **Estilização**: Tailwind CSS + shadcn/ui
- **Build Tool**: Vite
- **HTTP Client**: Axios
- **Ícones**: Lucide React
- **Formatação**: Markdown

## 📦 Instalação e Configuração

### Pré-requisitos

- Node.js 18+
- npm ou yarn

### Passos para Instalação

```bash
# 1. Clone o repositório
git clone https://github.com/ericlbarreto/conta-ai
cd conta-ai

# 2. Instale as dependências
npm install

# 3. Configure as variáveis de ambiente (opcional)
echo "VITE_API_URL=http://localhost:3001" > .env

# 4. Execute o projeto
npm run dev
```

### Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia o servidor de desenvolvimento

# Build
npm run build        # Gera build de produção
npm run preview      # Visualiza o build de produção

# Linting
npm run lint         # Executa o linter
npm run lint:fix     # Corrige problemas de linting
```

## 🎯 Como Usar

### 1. Upload de Documentos

- Arraste e solte arquivos PDF no chat
- Ou clique no ícone de clipe para selecionar arquivos
- Suporte a múltiplos arquivos simultâneos

### 2. Análise Inteligente

- Faça perguntas sobre seus dados contábeis
- Exemplos de perguntas:
  - "Qual foi o lucro líquido no último período?"
  - "Gere um resumo das receitas e despesas"
  - "Sugira gráficos para análise dos dados"
  - "Identifique tendências nos números"

### 3. Insights Automáticos

- Receba análises detalhadas em tempo real
- Visualize tendências e padrões
- Obtenha sugestões de otimização

## 🏗️ Estrutura do Projeto

```
src/
├── components/           # Componentes React
│   ├── ui/             # Componentes UI (shadcn)
│   ├── ChatInterface.tsx
│   ├── ChatInput.tsx
│   ├── ChatMessage.tsx
│   └── Header.tsx
├── hooks/              # Hooks personalizados
│   └── useChat.ts
├── services/           # Serviços e APIs
│   ├── apiService.ts
│   └── aiService.ts
├── config/            # Configurações
│   └── api.ts
├── pages/             # Páginas da aplicação
│   └── Index.tsx
└── types/             # Definições de tipos
    └── index.ts
```

## 🔧 Configuração da API

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_API_URL=http://localhost:3001
```

### Estrutura da API Esperada

#### Health Check

```http
GET /api/health
```

#### Chat com IA

```http
POST /api/ai/chat
Content-Type: multipart/form-data

{
  "message": "string",
  "files": [File, File, ...]
}
```

## 🎨 Interface

### Layout Responsivo

- **Desktop**: Layout de duas colunas com chat fixo
- **Mobile**: Layout em coluna única
- **Chat**: Interface conversacional com drag & drop

### Features Visuais

- Design moderno e limpo
- Tema escuro por padrão
- Animações suaves
- Feedback visual em tempo real

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

<div align="center">
  <p>Desenvolvido com ❤️ pela equipe ContaAI</p>
  <p>Transformando análise contábil com IA</p>
</div>
