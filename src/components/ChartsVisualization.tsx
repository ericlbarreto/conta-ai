import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DocumentFile } from '@/types';

interface ChartsVisualizationProps {
  documents: DocumentFile[];
}

const ChartsVisualization = ({ documents }: ChartsVisualizationProps) => {
  if (documents.length === 0) {
    return (
      <Card className="p-8 text-center bg-gradient-card">
        <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-muted flex items-center justify-center">
          <span className="text-2xl">📊</span>
        </div>
        <h3 className="mb-2 text-lg font-semibold">Visualizações Inteligentes</h3>
        <p className="text-sm text-muted-foreground">
          Envie documentos contábeis para gerar gráficos automaticamente
        </p>
      </Card>
    );
  }

  const data = documents[0]?.data;
  if (!data) return null;

  // Prepare data for charts
  const evolutionData = data.receitas.map((receita: any, index: number) => ({
    mes: receita.mes,
    receitas: receita.valor,
    despesas: data.despesas[index]?.valor || 0,
    lucro: receita.valor - (data.despesas[index]?.valor || 0)
  }));

  const categoryData = [
    { name: 'Receitas', value: data.receitas.reduce((sum: number, r: any) => sum + r.valor, 0), color: '#10B981' },
    { name: 'Despesas', value: data.despesas.reduce((sum: number, d: any) => sum + d.valor, 0), color: '#EF4444' },
    { name: 'Impostos', value: data.impostos, color: '#F59E0B' }
  ];

  const marginData = evolutionData.map(item => ({
    mes: item.mes,
    margem: ((item.lucro / item.receitas) * 100).toFixed(1)
  }));

  const COLORS = ['hsl(var(--primary))', 'hsl(var(--destructive))', 'hsl(var(--muted-foreground))'];

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">📊 Dashboard de Análise Contábil</h2>
        <p className="text-muted-foreground">Visualizações geradas automaticamente pelos seus dados</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Evolução Temporal */}
        <Card className="shadow-medium hover:shadow-strong transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              📈 Evolução Receitas vs Despesas
            </CardTitle>
            <CardDescription>
              Acompanhe a performance financeira mês a mês
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={evolutionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="mes" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                  formatter={(value: any) => [`R$ ${value.toLocaleString('pt-BR')}`, '']}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="receitas" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={3}
                  name="Receitas"
                  dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="despesas" 
                  stroke="hsl(var(--destructive))" 
                  strokeWidth={3}
                  name="Despesas"
                  dot={{ fill: 'hsl(var(--destructive))', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Comparativo Mensal */}
        <Card className="shadow-medium hover:shadow-strong transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              📊 Performance Mensal
            </CardTitle>
            <CardDescription>
              Comparativo de receitas, despesas e lucro
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={evolutionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="mes" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                  formatter={(value: any) => [`R$ ${value.toLocaleString('pt-BR')}`, '']}
                />
                <Legend />
                <Bar dataKey="receitas" fill="hsl(var(--primary))" name="Receitas" radius={[2, 2, 0, 0]} />
                <Bar dataKey="despesas" fill="hsl(var(--destructive))" name="Despesas" radius={[2, 2, 0, 0]} />
                <Bar dataKey="lucro" fill="hsl(var(--primary-light))" name="Lucro" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Distribuição de Recursos */}
        <Card className="shadow-medium hover:shadow-strong transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              🥧 Distribuição Financeira
            </CardTitle>
            <CardDescription>
              Composição das movimentações financeiras
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: any) => [`R$ ${value.toLocaleString('pt-BR')}`, 'Valor']}
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Margem de Lucro */}
        <Card className="shadow-medium hover:shadow-strong transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              📈 Evolução da Margem de Lucro
            </CardTitle>
            <CardDescription>
              Acompanhe a rentabilidade ao longo do tempo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={marginData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="mes" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickFormatter={(value) => `${value}%`}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                  formatter={(value: any) => [`${value}%`, 'Margem']}
                />
                <Area 
                  type="monotone" 
                  dataKey="margem" 
                  stroke="hsl(var(--primary))" 
                  fill="hsl(var(--primary))" 
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Key Metrics Summary */}
      <Card className="bg-gradient-primary text-primary-foreground shadow-strong">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🎯 Resumo de Indicadores Chave
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-white/10 rounded-lg">
              <div className="text-2xl font-bold">R$ {data.lucroLiquido.toLocaleString('pt-BR')}</div>
              <div className="text-sm opacity-90">Lucro Líquido</div>
            </div>
            <div className="text-center p-4 bg-white/10 rounded-lg">
              <div className="text-2xl font-bold">{data.margem}%</div>
              <div className="text-sm opacity-90">Margem de Lucro</div>
            </div>
            <div className="text-center p-4 bg-white/10 rounded-lg">
              <div className="text-2xl font-bold">
                R$ {data.receitas.reduce((s: number, r: any) => s + r.valor, 0).toLocaleString('pt-BR')}
              </div>
              <div className="text-sm opacity-90">Receitas Totais</div>
            </div>
            <div className="text-center p-4 bg-white/10 rounded-lg">
              <div className="text-2xl font-bold">R$ {data.impostos.toLocaleString('pt-BR')}</div>
              <div className="text-sm opacity-90">Impostos</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChartsVisualization;