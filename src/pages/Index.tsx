import Header from '@/components/Header';
import ChatInterface from '@/components/ChatInterface';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8">
        <div className="max-w-7xl mx-auto">
          {/* Layout de duas colunas */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Coluna Esquerda - Conteúdo Principal */}
            <div className="space-y-8">
              {/* Welcome Section */}
              <div className="text-center space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
                  🚀 Powered by IA
                </div>
                <h1 className="text-4xl font-bold tracking-tight">
                  Análise Contábil <span className="bg-gradient-primary bg-clip-text text-transparent">Inteligente</span>
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Transforme seus documentos contábeis em insights poderosos com nossa IA especializada. 
                  Upload, análise e visualização em segundos.
                </p>
              </div>

              {/* Features Section */}
              <div className="grid md:grid-cols-2 gap-6">
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
                  <h3 className="font-semibold mb-2">Análise Completa</h3>
                  <p className="text-sm text-muted-foreground">
                    Receitas, despesas, lucros, impostos e tendências em uma única interface
                  </p>
                </div>
                
                <div className="text-center p-6 rounded-lg bg-gradient-card border shadow-soft">
                  <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    ⚡
                  </div>
                  <h3 className="font-semibold mb-2">Resposta Instantânea</h3>
                  <p className="text-sm text-muted-foreground">
                    Resultados em segundos com tecnologia avançada para maior precisão
                  </p>
                </div>
                
                <div className="text-center p-6 rounded-lg bg-gradient-card border shadow-soft">
                  <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    🔒
                  </div>
                  <h3 className="font-semibold mb-2">Seguro e Privado</h3>
                  <p className="text-sm text-muted-foreground">
                    Seus dados ficam protegidos com criptografia de ponta a ponta
                  </p>
                </div>
              </div>

              {/* Como usar */}
              <div className="bg-gradient-card p-6 rounded-lg border shadow-soft">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  🚀 Como usar
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-medium">
                      1
                    </div>
                    <p className="text-muted-foreground">
                      <strong className="text-foreground">Envie seus documentos</strong> - PDF, Excel ou CSV
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-medium">
                      2
                    </div>
                    <p className="text-muted-foreground">
                      <strong className="text-foreground">Faça perguntas</strong> - sobre receitas, despesas, lucros
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-medium">
                      3
                    </div>
                    <p className="text-muted-foreground">
                      <strong className="text-foreground">Receba insights</strong> - análises detalhadas e sugestões
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Coluna Direita - Chat Interface */}
            <div className="lg:sticky lg:top-8">
              <div className="h-[calc(100vh-8rem)]">
                <ChatInterface />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;