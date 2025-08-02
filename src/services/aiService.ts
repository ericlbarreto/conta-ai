import { DocumentFile, ChatMessage, ChartSuggestion, AnalysisResult } from '@/types';

// Simulated AI Service with RAG capabilities
export class AIService {
  private documents: DocumentFile[] = [];
  
  setDocuments(documents: DocumentFile[]) {
    this.documents = documents;
  }

  async processQuery(query: string): Promise<string> {
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    
    const lowerQuery = query.toLowerCase();
    
    // Check if user is asking about specific financial metrics
    if (this.documents.length === 0) {
      return this.getNoDocumentsResponse();
    }

    // Extract simulated data from documents
    const financialData = this.extractFinancialData();
    
    if (lowerQuery.includes('lucro') && lowerQuery.includes('líquido')) {
      return this.getLucroLiquidoResponse(financialData);
    }
    
    if (lowerQuery.includes('resumo') || lowerQuery.includes('sumário')) {
      return this.getResumoResponse(financialData);
    }
    
    if (lowerQuery.includes('gráfico') || lowerQuery.includes('visualiz')) {
      return this.getGraficoSuggestionResponse(financialData);
    }
    
    if (lowerQuery.includes('receita') || lowerQuery.includes('faturamento')) {
      return this.getReceitaResponse(financialData);
    }
    
    if (lowerQuery.includes('despesa') || lowerQuery.includes('custo')) {
      return this.getDespesaResponse(financialData);
    }
    
    if (lowerQuery.includes('tendência') || lowerQuery.includes('análise')) {
      return this.getTendenciaResponse(financialData);
    }
    
    if (lowerQuery.includes('imposto') || lowerQuery.includes('tribut')) {
      return this.getImpostoResponse(financialData);
    }
    
    if (lowerQuery.includes('abril') || lowerQuery.includes('período')) {
      return this.getAbrilResponse(financialData);
    }

    // Default response for other questions
    return this.getDefaultResponse(financialData);
  }

  private extractFinancialData() {
    if (this.documents.length === 0) return null;
    
    // Simulate extracting data from uploaded documents
    return this.documents[0].data;
  }

  private getNoDocumentsResponse(): string {
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

  private getLucroLiquidoResponse(data: any): string {
    if (!data) return "❌ Não encontrei dados sobre lucro líquido nos documentos enviados.";
    
    const lucro = data.lucroLiquido;
    const margem = data.margem;
    
    return `💰 **Análise do Lucro Líquido**

📈 **Lucro Líquido**: R$ ${lucro.toLocaleString('pt-BR')}
📊 **Margem de Lucro**: ${margem}%

**Análise:**
• O lucro líquido representa um resultado **${lucro > 30000 ? 'positivo' : 'que merece atenção'}**
• A margem de ${margem}% está **${margem > 15 ? 'dentro de um patamar saudável' : 'abaixo do ideal para o setor'}**

**Recomendações:**
${lucro > 30000 
  ? '✅ Mantenha o foco na eficiência operacional\n✅ Considere investimentos em crescimento'
  : '⚠️ Revise custos operacionais\n⚠️ Analise oportunidades de aumento de receita'
}

💡 **Gostaria que eu gere gráficos para visualizar melhor esses dados?**`;
  }

  private getResumoResponse(data: any): string {
    if (!data) return "❌ Não encontrei dados suficientes para gerar um resumo nos documentos enviados.";
    
    const totalReceitas = data.receitas.reduce((sum: number, item: any) => sum + item.valor, 0);
    const totalDespesas = data.despesas.reduce((sum: number, item: any) => sum + item.valor, 0);
    
    return `📋 **Resumo Executivo do Período**

## 💰 **Resumo Financeiro**
• **Total de Receitas**: R$ ${totalReceitas.toLocaleString('pt-BR')}
• **Total de Despesas**: R$ ${totalDespesas.toLocaleString('pt-BR')}
• **Lucro Líquido**: R$ ${data.lucroLiquido.toLocaleString('pt-BR')}
• **Margem de Lucro**: ${data.margem}%

## 📊 **Indicadores de Performance**
• **Crescimento médio mensal**: +8,5%
• **Controle de custos**: ${((totalDespesas/totalReceitas) * 100).toFixed(1)}% das receitas
• **Impostos**: R$ ${data.impostos.toLocaleString('pt-BR')}

## 🎯 **Principais Insights**
✅ **Pontos Positivos:**
• Tendência de crescimento nas receitas
• Margem de lucro sustentável
• Controle adequado de despesas

⚠️ **Pontos de Atenção:**
• Monitorar crescimento das despesas
• Otimizar carga tributária

**Este resumo está baseado nos dados dos documentos enviados. Posso detalhar qualquer aspecto específico!** 😊`;
  }

  private getGraficoSuggestionResponse(data: any): string {
    if (!data) return "❌ Não encontrei dados para sugerir gráficos nos documentos enviados.";
    
    return `📊 **Sugestões de Visualizações para seus Dados**

Baseado na análise dos seus documentos, sugiro os seguintes gráficos:

## 📈 **1. Gráfico de Evolução Mensal**
• **Tipo**: Gráfico de Linhas
• **Dados**: Receitas vs Despesas por mês
• **Objetivo**: Visualizar tendências temporais

## 📊 **2. Gráfico de Composição**
• **Tipo**: Gráfico de Barras Empilhadas
• **Dados**: Receitas, Despesas e Lucro por período
• **Objetivo**: Comparar performance mensal

## 🥧 **3. Gráfico de Distribuição**
• **Tipo**: Gráfico de Pizza
• **Dados**: Composição das despesas por categoria
• **Objetivo**: Identificar principais gastos

## 📈 **4. Gráfico de Margem**
• **Tipo**: Gráfico de Área
• **Dados**: Evolução da margem de lucro
• **Objetivo**: Acompanhar rentabilidade

💡 **Dica**: Estes gráficos ajudarão você a:
• 🔍 Identificar padrões e tendências
• 📋 Criar relatórios mais impactantes
• 🎯 Tomar decisões baseadas em dados

**Gostaria que eu implemente algum desses gráficos específicos?** ✨`;
  }

  private getReceitaResponse(data: any): string {
    if (!data) return "❌ Não encontrei dados sobre receitas nos documentos enviados.";
    
    const receitas = data.receitas;
    const totalReceitas = receitas.reduce((sum: number, item: any) => sum + item.valor, 0);
    const mediaReceitas = totalReceitas / receitas.length;
    
    return `💰 **Análise Detalhada das Receitas**

## 📈 **Resumo Geral**
• **Total do Período**: R$ ${totalReceitas.toLocaleString('pt-BR')}
• **Média Mensal**: R$ ${mediaReceitas.toLocaleString('pt-BR')}
• **Maior Receita**: ${receitas.reduce((max: any, item: any) => item.valor > max.valor ? item : max).mes} - R$ ${receitas.reduce((max: any, item: any) => item.valor > max.valor ? item : max).valor.toLocaleString('pt-BR')}

## 📊 **Evolução Mensal**
${receitas.map((item: any) => `• **${item.mes}**: R$ ${item.valor.toLocaleString('pt-BR')}`).join('\n')}

## 🎯 **Insights e Tendências**
• **Crescimento**: Tendência positiva observada
• **Sazonalidade**: Abril apresentou melhor performance
• **Variação**: Oscilação controlada entre os meses

**💡 Sugestão**: Considere implementar estratégias para manter o crescimento sustentável das receitas!`;
  }

  private getDespesaResponse(data: any): string {
    if (!data) return "❌ Não encontrei dados sobre despesas nos documentos enviados.";
    
    const despesas = data.despesas;
    const totalDespesas = despesas.reduce((sum: number, item: any) => sum + item.valor, 0);
    
    return `💸 **Análise Detalhada das Despesas**

## 📊 **Resumo Geral**
• **Total do Período**: R$ ${totalDespesas.toLocaleString('pt-BR')}
• **Média Mensal**: R$ ${(totalDespesas / despesas.length).toLocaleString('pt-BR')}

## 📈 **Evolução Mensal**
${despesas.map((item: any) => `• **${item.mes}**: R$ ${item.valor.toLocaleString('pt-BR')}`).join('\n')}

## ⚠️ **Análise de Controle**
• **Tendência**: ${despesas[despesas.length-1].valor > despesas[0].valor ? 'Crescimento' : 'Redução'} ao longo do período
• **Eficiência**: Despesas representam ${((totalDespesas / (data.receitas.reduce((s: number, i: any) => s + i.valor, 0))) * 100).toFixed(1)}% das receitas

**🎯 Recomendação**: Monitore regularmente para manter controle dos custos operacionais!`;
  }

  private getTendenciaResponse(data: any): string {
    if (!data) return "❌ Não encontrei dados suficientes para análise de tendências.";
    
    return `📈 **Análise de Tendências dos Dados Contábeis**

## 🔍 **Tendências Identificadas**

### 💰 **Receitas**
• **Direção**: Crescimento consistente ↗️
• **Padrão**: Variação positiva mês a mês
• **Projeção**: Tendência de continuidade

### 💸 **Despesas**
• **Direção**: Aumento controlado ↗️
• **Padrão**: Crescimento proporcional às receitas
• **Controle**: Dentro de parâmetros aceitáveis

### 📊 **Margem de Lucro**
• **Estabilidade**: Margem de ${data.margem}% mantida
• **Sustentabilidade**: Indicadores positivos
• **Oportunidade**: Espaço para otimização

## 🎯 **Insights Estratégicos**
✅ **Pontos Fortes**: Crescimento sustentável e controle de custos
⚠️ **Atenção**: Monitorar proporção receita/despesa
🚀 **Oportunidades**: Potencial para melhorar margem

**Esta análise pode orientar decisões estratégicas para os próximos períodos!** 📋`;
  }

  private getImpostoResponse(data: any): string {
    if (!data) return "❌ Não encontrei dados sobre impostos nos documentos enviados.";
    
    const impostos = data.impostos;
    const totalReceitas = data.receitas.reduce((sum: number, item: any) => sum + item.valor, 0);
    const percentualImpostos = (impostos / totalReceitas * 100).toFixed(1);
    
    return `🏛️ **Análise Tributária**

## 💰 **Resumo Fiscal**
• **Total de Impostos**: R$ ${impostos.toLocaleString('pt-BR')}
• **Carga Tributária**: ${percentualImpostos}% sobre receitas
• **Impacto no Resultado**: ${((impostos / data.lucroLiquido) * 100).toFixed(1)}% do lucro líquido

## 📊 **Análise da Carga Tributária**
• **Percentual**: ${percentualImpostos}% ${parseFloat(percentualImpostos) > 20 ? '(acima da média)' : '(dentro da normalidade)'}
• **Oportunidades**: ${parseFloat(percentualImpostos) > 25 ? 'Revisar planejamento tributário' : 'Carga adequada ao porte'}

## 🎯 **Recomendações**
${parseFloat(percentualImpostos) > 20 
  ? '• Considerar planejamento tributário\n• Avaliar regimes fiscais alternativos\n• Revisar benefícios disponíveis'
  : '• Manter regime atual\n• Monitorar mudanças na legislação\n• Otimizar aproveitamento de créditos'
}

**💡 Importante**: Sempre consulte um contador para otimizações fiscais!`;
  }

  private getAbrilResponse(data: any): string {
    if (!data) return "❌ Não encontrei dados específicos de abril nos documentos enviados.";
    
    const abrilReceita = data.receitas.find((r: any) => r.mes === 'Abril')?.valor || 0;
    const abrilDespesa = data.despesas.find((d: any) => d.mes === 'Abril')?.valor || 0;
    const abrilLucro = abrilReceita - abrilDespesa;
    
    return `📅 **Análise Específica de Abril**

## 💰 **Performance de Abril**
• **Receita**: R$ ${abrilReceita.toLocaleString('pt-BR')}
• **Despesas**: R$ ${abrilDespesa.toLocaleString('pt-BR')}
• **Resultado**: R$ ${abrilLucro.toLocaleString('pt-BR')}
• **Margem**: ${((abrilLucro/abrilReceita) * 100).toFixed(1)}%

## 📈 **Comparativo com Outros Meses**
• **Melhor mês**: ${abrilReceita === Math.max(...data.receitas.map((r: any) => r.valor)) ? 'Sim! 🏆' : 'Não'}
• **Crescimento**: ${abrilReceita > data.receitas[0].valor ? '+' : ''}${(((abrilReceita / data.receitas[0].valor) - 1) * 100).toFixed(1)}% vs Janeiro

## 🎯 **Insights de Abril**
${abrilReceita > 190000 
  ? '✅ Excelente performance!\n✅ Resultado acima da média\n🎯 Identificar fatores de sucesso'
  : '📊 Performance dentro da média\n🔍 Avaliar oportunidades de melhoria'
}

**Este resultado pode servir como referência para os próximos meses!** 😊`;
  }

  private getDefaultResponse(data: any): string {
    if (!data) {
      return "😊 **Olá! Sou seu assistente contábil inteligente.**\n\nAnalisei sua pergunta, mas preciso que você seja mais específico sobre o que gostaria de saber dos documentos enviados.\n\n**Posso ajudá-lo com:**\n• Análise de receitas e despesas\n• Cálculos de margem e lucro\n• Resumos executivos\n• Sugestões de gráficos\n• Identificação de tendências\n\n**Faça uma pergunta mais específica e terei prazer em ajudar!** ✨";
    }
    
    return `📊 **Análise dos Seus Dados Contábeis**

Identifiquei informações importantes nos documentos enviados:

## 💰 **Resumo Rápido**
• **Receitas totais**: R$ ${data.receitas.reduce((s: number, i: any) => s + i.valor, 0).toLocaleString('pt-BR')}
• **Lucro líquido**: R$ ${data.lucroLiquido.toLocaleString('pt-BR')}
• **Margem**: ${data.margem}%

## 🤖 **Como posso ajudar especificamente?**

Faça perguntas como:
• "Qual foi o lucro líquido em abril?"
• "Gere um resumo das receitas"
• "Sugira gráficos para visualização"
• "Analise as tendências dos dados"

**Estou aqui para tornar sua análise contábil mais eficiente!** 😊✨`;
  }

  generateChartSuggestions(data: any): ChartSuggestion[] {
    if (!data) return [];
    
    return [
      {
        id: '1',
        type: 'line',
        title: 'Evolução Receitas vs Despesas',
        description: 'Acompanhe a evolução mensal das receitas e despesas',
        data: data.receitas.map((r: any, i: number) => ({
          mes: r.mes,
          receitas: r.valor,
          despesas: data.despesas[i]?.valor || 0
        })),
        config: {
          xAxis: 'mes',
          yAxis: 'valor'
        }
      },
      {
        id: '2',
        type: 'bar',
        title: 'Comparativo de Performance Mensal',
        description: 'Compare receitas, despesas e lucro por mês',
        data: data.receitas.map((r: any, i: number) => ({
          mes: r.mes,
          receitas: r.valor,
          despesas: data.despesas[i]?.valor || 0,
          lucro: r.valor - (data.despesas[i]?.valor || 0)
        })),
        config: {
          xAxis: 'mes'
        }
      }
    ];
  }
}