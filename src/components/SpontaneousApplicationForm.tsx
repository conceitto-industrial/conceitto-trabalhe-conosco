
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { FileUpload } from "./FileUpload";
import { SpontaneousApplicationFormFields } from "./SpontaneousApplicationFormFields";

const formSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(10, "Telefone deve ter pelo menos 10 dígitos"),
  area: z.string().min(1, "Selecione uma área de interesse"),
  message: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

interface SpontaneousApplicationFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const SpontaneousApplicationForm = ({
  open,
  onOpenChange,
}: SpontaneousApplicationFormProps) => {
  const [file, setFile] = useState<File | null>(null);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      area: "",
      message: "",
    },
  });

  const onSubmit = (data: FormData) => {
    toast({
      title: "Sucesso!",
      description: "Seu cadastro foi enviado com sucesso. Entraremos em contato em breve!",
    });

    form.reset();
    setFile(null);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-conceitto-gray">
            Cadastro Espontâneo
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <SpontaneousApplicationFormFields control={form.control} />

            <FileUpload file={file} onFileChange={setFile} />

            <div className="flex gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="flex-1"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-priority hover:bg-priority-hover"
                disabled={!file}
              >
                Enviar Cadastro
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
