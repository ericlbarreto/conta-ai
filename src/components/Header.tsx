import { Calculator, TrendingUp } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-primary shadow-soft">
            <Calculator className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">ContaAI</h1>
            <p className="text-xs text-muted-foreground">Análise Contábil Inteligente</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
            <TrendingUp className="h-4 w-4 text-primary" />
            <span>IA + RAG para Contabilidade</span>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;