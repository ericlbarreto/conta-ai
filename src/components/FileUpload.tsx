import { useCallback, useState } from 'react';
import { Upload, File, X, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { DocumentFile } from '@/types';
import { toast } from '@/hooks/use-toast';

interface FileUploadProps {
  onFilesUploaded: (files: DocumentFile[]) => void;
  uploadedFiles: DocumentFile[];
  onRemoveFile: (fileId: string) => void;
}

const FileUpload = ({ onFilesUploaded, uploadedFiles, onRemoveFile }: FileUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const processFile = useCallback(async (file: File): Promise<DocumentFile> => {
    // Simulate file processing
    return new Promise((resolve) => {
      setTimeout(() => {
        const documentFile: DocumentFile = {
          id: Math.random().toString(36).substr(2, 9),
          name: file.name,
          type: file.name.includes('.pdf') ? 'pdf' : file.name.includes('.xls') ? 'excel' : 'csv',
          size: file.size,
          uploadedAt: new Date(),
          content: `Conteúdo extraído de ${file.name} - Dados contábeis simulados para demonstração`,
          data: {
            // Simulated accounting data
            receitas: [
              { mes: 'Janeiro', valor: 150000 },
              { mes: 'Fevereiro', valor: 180000 },
              { mes: 'Março', valor: 165000 },
              { mes: 'Abril', valor: 195000 }
            ],
            despesas: [
              { mes: 'Janeiro', valor: 120000 },
              { mes: 'Fevereiro', valor: 140000 },
              { mes: 'Março', valor: 135000 },
              { mes: 'Abril', valor: 155000 }
            ],
            lucroLiquido: 40000,
            impostos: 25000,
            margem: 20.5
          }
        };
        resolve(documentFile);
      }, 1500);
    });
  }, []);

  const handleFileUpload = useCallback(async (files: FileList) => {
    setIsProcessing(true);
    const validFiles = Array.from(files).filter(file => {
      const validTypes = ['.pdf', '.xlsx', '.xls', '.csv'];
      return validTypes.some(type => file.name.toLowerCase().includes(type));
    });

    if (validFiles.length === 0) {
      toast({
        title: "Formato não suportado",
        description: "Por favor, envie arquivos PDF, Excel ou CSV.",
        variant: "destructive"
      });
      setIsProcessing(false);
      return;
    }

    try {
      const processedFiles = await Promise.all(validFiles.map(processFile));
      onFilesUploaded(processedFiles);
      
      toast({
        title: "Arquivos processados! 📊",
        description: `${processedFiles.length} arquivo(s) carregado(s) com sucesso.`
      });
    } catch (error) {
      toast({
        title: "Erro no processamento",
        description: "Não foi possível processar os arquivos.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  }, [onFilesUploaded, processFile]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileUpload(e.dataTransfer.files);
  }, [handleFileUpload]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFileUpload(e.target.files);
    }
  }, [handleFileUpload]);

  return (
    <div className="space-y-4">
      <Card
        className={`relative border-2 border-dashed transition-all duration-300 ${
          isDragging 
            ? 'border-primary bg-primary/5 shadow-medium' 
            : 'border-border hover:border-primary/50'
        } ${isProcessing ? 'animate-pulse' : ''}`}
        onDragOver={(e) => e.preventDefault()}
        onDragEnter={() => setIsDragging(true)}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
      >
        <div className="p-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-primary">
            <Upload className="h-8 w-8 text-primary-foreground" />
          </div>
          
          <h3 className="mb-2 text-lg font-semibold">
            {isProcessing ? 'Processando arquivos...' : 'Envie seus documentos contábeis'}
          </h3>
          
          <p className="mb-4 text-sm text-muted-foreground">
            Arraste e solte ou clique para selecionar arquivos PDF, Excel ou CSV
          </p>
          
          <input
            id="file-upload"
            type="file"
            multiple
            accept=".pdf,.xlsx,.xls,.csv"
            onChange={handleFileSelect}
            className="hidden"
            disabled={isProcessing}
          />
          
          <Button asChild disabled={isProcessing}>
            <label htmlFor="file-upload" className="cursor-pointer">
              {isProcessing ? 'Processando...' : 'Selecionar Arquivos'}
            </label>
          </Button>
        </div>
      </Card>

      {uploadedFiles.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Arquivos carregados:</h4>
          {uploadedFiles.map((file) => (
            <Card key={file.id} className="flex items-center justify-between p-3">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded bg-primary/10">
                  <File className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">{file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {(file.size / 1024 / 1024).toFixed(2)} MB • {file.type.toUpperCase()}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onRemoveFile(file.id)}
                  className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUpload;