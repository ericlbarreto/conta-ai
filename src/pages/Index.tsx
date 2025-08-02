import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DocumentFile } from '@/types';
import Header from '@/components/Header';
import FileUpload from '@/components/FileUpload';
import ChatInterface from '@/components/ChatInterface';
import ChartsVisualization from '@/components/ChartsVisualization';
import { MessageSquare, BarChart3, Upload } from 'lucide-react';

const Index = () => {
  const [documents, setDocuments] = useState<DocumentFile[]>([]);

  const handleFilesUploaded = (newFiles: DocumentFile[]) => {
    setDocuments(prev => [...prev, ...newFiles]);
  };

  const handleRemoveFile = (fileId: string) => {
    setDocuments(prev => prev.filter(file => file.id !== fileId));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Welcome Section */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
              🚀 Powered by IA + RAG
            </div>
            <h1 className="text-4xl font-bold tracking-tight">
              Análise Contábil <span className="bg-gradient-primary bg-clip-text text-transparent">Inteligente</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Transforme seus documentos contábeis em insights poderosos com nossa IA especializada. 
              Upload, análise e visualização em segundos.
            </p>
          </div>

          {/* Main Interface */}
          <Tabs defaultValue="upload" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 bg-muted/50">
              <TabsTrigger value="upload" className="flex items-center gap-2">
                <Upload className="h-4 w-4" />
                Upload & Documentos
              </TabsTrigger>
              <TabsTrigger value="chat" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Chat Inteligente
              </TabsTrigger>
              <TabsTrigger value="charts" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Visualizações
              </TabsTrigger>
            </TabsList>

            <TabsContent value="upload" className="space-y-6">
              <div className="grid gap-6">
                <FileUpload
                  onFilesUploaded={handleFilesUploaded}
                  uploadedFiles={documents}
                  onRemoveFile={handleRemoveFile}
                />
                
                {documents.length > 0 && (
                  <div className="bg-gradient-card p-6 rounded-lg border shadow-soft">
                    <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                      ✅ Documentos Processados
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Seus documentos foram analisados com sucesso! Agora você pode:
                    </p>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div className="flex items-start gap-2">
                        <MessageSquare className="h-4 w-4 text-primary mt-0.5" />
                        <div>
                          <div className="font-medium">Fazer perguntas específicas</div>
                          <div className="text-muted-foreground">Use o chat para obter insights dos seus dados</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <BarChart3 className="h-4 w-4 text-primary mt-0.5" />
                        <div>
                          <div className="font-medium">Visualizar gráficos automáticos</div>
                          <div className="text-muted-foreground">Veja dashboards gerados automaticamente</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="chat" className="space-y-6">
              <ChatInterface documents={documents} />
            </TabsContent>

            <TabsContent value="charts" className="space-y-6">
              <ChartsVisualization documents={documents} />
            </TabsContent>
          </Tabs>

          {/* Features Section */}
          {documents.length === 0 && (
            <div className="grid md:grid-cols-3 gap-6 pt-8">
              <div className="text-center p-6 rounded-lg bg-gradient-card border shadow-soft">
                <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  🤖
                </div>
                <h3 className="font-semibold mb-2">IA Especializada</h3>
                <p className="text-sm text-muted-foreground">
                  Análise inteligente de documentos contábeis com respostas precisas e contextualizadas
                </p>
              </div>
              
              <div className="text-center p-6 rounded-lg bg-gradient-card border shadow-soft">
                <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  📊
                </div>
                <h3 className="font-semibold mb-2">Visualizações Automáticas</h3>
                <p className="text-sm text-muted-foreground">
                  Gráficos e dashboards gerados automaticamente a partir dos seus dados
                </p>
              </div>
              
              <div className="text-center p-6 rounded-lg bg-gradient-card border shadow-soft">
                <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  ⚡
                </div>
                <h3 className="font-semibold mb-2">Análise Instantânea</h3>
                <p className="text-sm text-muted-foreground">
                  Resultados em segundos com tecnologia RAG para maior precisão
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;