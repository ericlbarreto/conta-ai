import OpenAI from 'openai';
import { DocumentFile } from '@/types';

export class OpenAIService {
  private openai: OpenAI | null = null;
  private documents: DocumentFile[] = [];

  constructor(apiKey?: string) {
    if (apiKey) {
      this.openai = new OpenAI({
        apiKey,
        dangerouslyAllowBrowser: true
      });
    }
  }

  setApiKey(apiKey: string) {
    this.openai = new OpenAI({
      apiKey,
      dangerouslyAllowBrowser: true
    });
  }

  setDocuments(documents: DocumentFile[]) {
    this.documents = documents;
  }

  async processQuery(query: string): Promise<string> {
    if (!this.openai) {
      throw new Error('API key do OpenAI não configurada');
    }

    if (this.documents.length === 0) {
      return this.getNoDocumentsResponse();
    }

    // Extract document content for context
    const documentContext = this.buildDocumentContext();
    
    try {
      const completion = await this.openai.chat.completions.create({
        model: "gpt-4.1-2025-04-14",
        messages: [
          {
            role: "system",
            content: this.getSystemPrompt()
          },
          {
            role: "user",
            content: `Contexto dos documentos contábeis:\n${documentContext}\n\nPergunta do usuário: ${query}`
          }
        ],
        temperature: 0.7,
        max_tokens: 1500
      });

      return completion.choices[0]?.message?.content || "Desculpe, não consegui processar sua solicitação.";
    } catch (error: any) {
      console.error('Erro na API OpenAI:', error);
      
      if (error.status === 401) {
        throw new Error('❌ **API Key inválida**\n\nVerifique se sua chave da OpenAI está correta e ativa.');
      }
      
      if (error.status === 429) {
        throw new Error('❌ **Limite de uso atingido**\n\nVocê atingiu o limite de requisições. Aguarde alguns minutos e tente novamente.');
      }
      
      throw new Error('❌ **Erro na comunicação com a IA**\n\nVerifique sua conexão e tente novamente.');
    }
  }

  private getSystemPrompt(): string {
    return `Você é um assistente contábil especializado chamado ContaBot Pro. Suas responsabilidades:

REGRAS FUNDAMENTAIS:
- Responda APENAS com base nos documentos contábeis fornecidos no contexto
- NUNCA invente ou crie informações que não estão nos documentos
- Se não tiver a informação, diga claramente "❌ Não encontrei essa informação nos documentos enviados"
- Seja gentil, profissional e use emojis moderadamente
- Formate suas respostas em markdown para melhor legibilidade
- Foque em análises contábeis: receitas, despesas, lucros, impostos, tendências

CAPACIDADES:
- Analisar receitas e despesas
- Calcular margens e lucros
- Identificar tendências financeiras
- Sugerir visualizações (gráficos)
- Gerar resumos executivos
- Analisar tributos e impostos

FORMATO DAS RESPOSTAS:
- Use títulos com ## para seções
- Use listas com • para pontos importantes
- Use **negrito** para destacar valores e métricas
- Inclua emojis relevantes (📊, 💰, 📈, etc.)
- Seja conciso mas informativo

LIMITAÇÕES:
- Não responda sobre assuntos não relacionados à contabilidade
- Não forneça aconselhamento jurídico ou fiscal específico
- Sempre se baseie apenas nos dados fornecidos`;
  }

  private buildDocumentContext(): string {
    return this.documents.map(doc => {
      let context = `Documento: ${doc.name} (${doc.type})\n`;
      
      if (doc.content) {
        context += `Conteúdo textual: ${doc.content}\n`;
      }
      
      if (doc.data) {
        context += `Dados estruturados: ${JSON.stringify(doc.data, null, 2)}\n`;
      }
      
      return context;
    }).join('\n---\n');
  }

  private getNoDocumentsResponse(): string {
    return `📋 **Olá! Sou o ContaBot Pro, seu assistente contábil inteligente** 😊

Para começarmos a análise, preciso que você envie seus documentos contábeis (PDF, Excel ou CSV).

**Após o upload, poderei ajudá-lo com:**
• 📊 Análise detalhada de receitas e despesas
• 💰 Cálculos de lucros e margens
• 📈 Sugestões de gráficos e visualizações
• 📋 Resumos executivos personalizados
• 🔍 Identificação de tendências financeiras
• 🏛️ Análise de impostos e tributos

**Envie seus documentos e faça perguntas como:**
• "Qual foi o lucro líquido em abril?"
• "Gere um resumo das receitas do trimestre"
• "Sugira gráficos para visualizar os dados"
• "Analise as tendências de despesas"

**Estou aqui para tornar sua análise contábil mais rápida e precisa!** ✨`;
  }

  generateChartSuggestions(data: any) {
    // This method will be called to suggest charts based on real data
    if (!data) return [];
    
    const suggestions = [];
    
    // Extract time series data for line charts
    if (data.receitas && data.despesas) {
      suggestions.push({
        id: '1',
        type: 'line' as const,
        title: 'Evolução Receitas vs Despesas',
        description: 'Acompanhe a evolução temporal das receitas e despesas',
        data: data.receitas.map((r: any, i: number) => ({
          periodo: r.mes || r.periodo || `Período ${i + 1}`,
          receitas: r.valor || r.receita || 0,
          despesas: data.despesas[i]?.valor || data.despesas[i]?.despesa || 0
        })),
        config: { xAxis: 'periodo', yAxis: 'valor' }
      });
    }

    // Bar chart for comparative analysis
    if (data.receitas) {
      suggestions.push({
        id: '2',
        type: 'bar' as const,
        title: 'Comparativo Mensal de Performance',
        description: 'Compare receitas, despesas e lucro por período',
        data: data.receitas.map((r: any, i: number) => {
          const despesa = data.despesas?.[i]?.valor || 0;
          return {
            periodo: r.mes || r.periodo || `Período ${i + 1}`,
            receitas: r.valor || 0,
            despesas: despesa,
            lucro: (r.valor || 0) - despesa
          };
        }),
        config: { xAxis: 'periodo' }
      });
    }

    return suggestions;
  }
}