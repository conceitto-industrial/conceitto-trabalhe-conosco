
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { FileUpload } from "@/components/FileUpload";
import { SpontaneousApplicationFormFields } from "@/components/SpontaneousApplicationFormFields";
import { useState } from "react";

const formSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("E-mail inválido"),
  phone: z.string().min(10, "Telefone deve ter pelo menos 10 dígitos"),
  area: z.string().min(1, "Área de interesse é obrigatória"),
  message: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export const SpontaneousApplicationForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
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

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      let resumeUrl = null;

      // Upload resume if provided
      if (resumeFile) {
        const fileExt = resumeFile.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random()}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('resumes')
          .upload(fileName, resumeFile);

        if (uploadError) {
          toast({
            title: "Erro no upload",
            description: "Erro ao fazer upload do currículo: " + uploadError.message,
            variant: "destructive",
          });
          return;
        }

        resumeUrl = fileName;
      }

      // Submit application
      const { error } = await supabase
        .from("spontaneous_applications")
        .insert({
          name: data.name,
          email: data.email,
          phone: data.phone,
          area: data.area,
          message: data.message || null,
          resume_url: resumeUrl,
        });

      if (error) {
        toast({
          title: "Erro",
          description: "Erro ao enviar candidatura: " + error.message,
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Sucesso!",
        description: "Sua candidatura espontânea foi enviada com sucesso!",
      });

      form.reset();
      setResumeFile(null);
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro inesperado.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-conceitto-gray">
          Candidatura Espontânea
        </CardTitle>
        <CardDescription>
          Deixe seus dados conosco e entraremos em contato quando surgir uma oportunidade adequada ao seu perfil.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <SpontaneousApplicationFormFields control={form.control} />
            
            <FileUpload
              onFileSelect={setResumeFile}
              selectedFile={resumeFile}
              accept=".pdf,.doc,.docx"
              label="Currículo (PDF, DOC ou DOCX)"
            />

            <Button
              type="submit"
              className="w-full bg-priority hover:bg-priority-hover"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Enviando..." : "Enviar Candidatura"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
