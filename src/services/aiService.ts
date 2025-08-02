import { DocumentFile, ChatMessage } from '@/types';

// Service para integração com API de IA
export class AIService {
  private documents: DocumentFile[] = [];
  private apiUrl: string;

  constructor(apiUrl: string = 'http://localhost:3001/api/ai') {
    this.apiUrl = apiUrl;
  }

  // Adiciona documentos para envio
  setDocuments(documents: DocumentFile[]) {
    this.documents = documents;
  }

  // Adiciona um documento
  addDocument(document: DocumentFile) {
    this.documents.push(document);
  }

  // Remove um documento
  removeDocument(documentId: string) {
    this.documents = this.documents.filter(doc => doc.id !== documentId);
  }

  // Limpa todos os documentos
  clearDocuments() {
    this.documents = [];
  }

  // Retorna os documentos atuais
  getDocuments(): DocumentFile[] {
    return this.documents;
  }

  // Prepara o payload para envio à API
  preparePayload(query: string): FormData {
    const formData = new FormData();
    
    // Adiciona a mensagem do usuário
    formData.append('message', query);
    
    // Adiciona os arquivos
    this.documents.forEach((document, index) => {
      // Nota: Este método não é mais usado, pois agora usamos File[] diretamente
      // Mantido para compatibilidade
    });

    return formData;
  }

  // Retorna mensagem quando não há documentos
  getNoDocumentsResponse(): string {
    return `📋 **Olá! Sou seu assistente de análise contábil** 😊

Para começarmos, preciso que você envie seus documentos contábeis (PDF, Excel ou CSV). 

Após o upload, poderei ajudá-lo com:
• 📊 Análise de receitas e despesas
• 💰 Cálculo de lucros e margens
• 📈 Sugestões de gráficos e visualizações
• 📋 Resumos executivos
• 🔍 Identificação de tendências

**Estou aqui para tornar sua análise contábil mais rápida e precisa!** ✨`;
  }
}