
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Upload, X } from "lucide-react";

interface FileUploadProps {
  file: File | null;
  onFileChange: (file: File | null) => void;
}

export const FileUpload = ({ file, onFileChange }: FileUploadProps) => {
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type === "application/pdf") {
        onFileChange(selectedFile);
      } else {
        toast({
          title: "Erro",
          description: "Por favor, envie apenas arquivos PDF.",
          variant: "destructive",
        });
      }
    }
  };

  const removeFile = () => {
    onFileChange(null);
  };

  return (
    <div>
      <label className="block text-sm font-medium mb-2">
        Currículo (PDF) *
      </label>
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-priority transition-colors">
        {file ? (
          <div className="flex items-center justify-between bg-gray-50 p-3 rounded">
            <span className="text-sm text-gray-700">{file.name}</span>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={removeFile}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          <div>
            <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
            <p className="text-sm text-gray-600 mb-2">
              Clique para enviar ou arraste seu currículo aqui
            </p>
            <p className="text-xs text-gray-500">Apenas arquivos PDF</p>
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
        )}
      </div>
    </div>
  );
};
