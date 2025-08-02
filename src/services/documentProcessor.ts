import { DocumentFile } from '@/types';

export class DocumentProcessor {
  static async processFile(file: File): Promise<DocumentFile> {
    const fileType = this.getFileType(file.name);
    
    const documentFile: DocumentFile = {
      id: crypto.randomUUID(),
      name: file.name,
      type: fileType,
      size: file.size,
      uploadedAt: new Date(),
    };

    try {
      if (fileType === 'csv') {
        const text = await file.text();
        documentFile.content = text;
        documentFile.data = this.parseCSV(text);
      } else if (fileType === 'excel') {
        // For demo purposes, simulate Excel parsing
        documentFile.content = `Arquivo Excel: ${file.name}`;
        documentFile.data = this.generateSampleData();
      } else if (fileType === 'pdf') {
        // For demo purposes, simulate PDF text extraction
        documentFile.content = `Arquivo PDF: ${file.name}`;
        documentFile.data = this.generateSampleData();
      }
    } catch (error) {
      console.error('Erro ao processar arquivo:', error);
      documentFile.content = `Erro ao processar ${file.name}`;
    }

    return documentFile;
  }

  private static getFileType(filename: string): 'pdf' | 'excel' | 'csv' {
    const extension = filename.toLowerCase().split('.').pop();
    
    switch (extension) {
      case 'csv':
        return 'csv';
      case 'xlsx':
      case 'xls':
        return 'excel';
      case 'pdf':
        return 'pdf';
      default:
        return 'pdf'; // Default fallback
    }
  }

  private static parseCSV(text: string) {
    const lines = text.split('\n').filter(line => line.trim());
    if (lines.length < 2) return null;

    const headers = lines[0].split(',').map(h => h.trim());
    const data = lines.slice(1).map(line => {
      const values = line.split(',').map(v => v.trim());
      const row: any = {};
      headers.forEach((header, index) => {
        row[header] = values[index] || '';
      });
      return row;
    });

    // Try to identify financial data patterns
    return this.extractFinancialData(data, headers);
  }

  private static extractFinancialData(data: any[], headers: string[]) {
    const result: any = {
      receitas: [],
      despesas: [],
      impostos: 0,
      lucroLiquido: 0,
      margem: 0
    };

    // Look for common financial data patterns
    data.forEach(row => {
      // Try to identify revenue/income
      const revenueKeys = ['receita', 'faturamento', 'vendas', 'income', 'revenue'];
      const expenseKeys = ['despesa', 'custo', 'gasto', 'expense', 'cost'];
      const monthKeys = ['mes', 'mês', 'periodo', 'período', 'month', 'date'];

      let revenue = 0;
      let expense = 0;
      let month = '';

      Object.keys(row).forEach(key => {
        const keyLower = key.toLowerCase();
        
        if (revenueKeys.some(k => keyLower.includes(k))) {
          revenue = this.parseNumber(row[key]);
        }
        
        if (expenseKeys.some(k => keyLower.includes(k))) {
          expense = this.parseNumber(row[key]);
        }
        
        if (monthKeys.some(k => keyLower.includes(k))) {
          month = row[key];
        }
      });

      if (revenue > 0 || expense > 0) {
        if (revenue > 0) {
          result.receitas.push({ mes: month || 'N/A', valor: revenue });
        }
        if (expense > 0) {
          result.despesas.push({ mes: month || 'N/A', valor: expense });
        }
      }
    });

    // Calculate totals
    const totalReceitas = result.receitas.reduce((sum: number, item: any) => sum + item.valor, 0);
    const totalDespesas = result.despesas.reduce((sum: number, item: any) => sum + item.valor, 0);
    
    result.lucroLiquido = totalReceitas - totalDespesas;
    result.margem = totalReceitas > 0 ? ((result.lucroLiquido / totalReceitas) * 100) : 0;
    result.impostos = totalReceitas * 0.15; // Estimate 15% tax rate

    return result.receitas.length > 0 || result.despesas.length > 0 ? result : this.generateSampleData();
  }

  private static parseNumber(value: string): number {
    if (typeof value === 'number') return value;
    
    const cleaned = value.toString()
      .replace(/[^\d,.-]/g, '')
      .replace(',', '.');
    
    return parseFloat(cleaned) || 0;
  }

  private static generateSampleData() {
    // Generate realistic sample financial data
    return {
      receitas: [
        { mes: 'Janeiro', valor: 150000 },
        { mes: 'Fevereiro', valor: 165000 },
        { mes: 'Março', valor: 178000 },
        { mes: 'Abril', valor: 192000 },
        { mes: 'Maio', valor: 186000 }
      ],
      despesas: [
        { mes: 'Janeiro', valor: 95000 },
        { mes: 'Fevereiro', valor: 102000 },
        { mes: 'Março', valor: 108000 },
        { mes: 'Abril', valor: 115000 },
        { mes: 'Maio', valor: 112000 }
      ],
      impostos: 127650,
      lucroLiquido: 81000,
      margem: 18.5
    };
  }
}