export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  attachments?: DocumentFile[];
}

export interface DocumentFile {
  id: string;
  name: string;
  type: 'pdf' | 'excel' | 'csv';
  size: number;
  uploadedAt: Date;
  content?: string; // Extracted content for RAG
  data?: any; // Parsed data for analysis
}

export interface ChartSuggestion {
  id: string;
  type: 'bar' | 'line' | 'pie' | 'area';
  title: string;
  description: string;
  data: any[];
  config: {
    xAxis?: string;
    yAxis?: string;
    dataKey?: string;
  };
}

export interface AnalysisResult {
  summary: string;
  keyMetrics: Record<string, number | string>;
  recommendations: string[];
  chartSuggestions: ChartSuggestion[];
}