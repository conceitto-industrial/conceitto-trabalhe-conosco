
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";

const jobSchema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  department: z.string().min(1, "Departamento é obrigatório"),
  location: z.string().min(1, "Localização é obrigatória"),
  type: z.string().min(1, "Tipo é obrigatório"),
  salary: z.string().min(1, "Salário é obrigatório"),
  description: z.string().min(1, "Descrição é obrigatória"),
  requirements: z.string().min(1, "Requisitos são obrigatórios"),
});

type JobData = z.infer<typeof jobSchema>;

interface JobFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  job?: any;
  onSave: () => void;
}

export const JobForm = ({ open, onOpenChange, job, onSave }: JobFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<JobData>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      title: job?.title || "",
      department: job?.department || "",
      location: job?.location || "",
      type: job?.type || "",
      salary: job?.salary || "",
      description: job?.description || "",
      requirements: job?.requirements?.join(", ") || "",
    },
  });

  const onSubmit = async (data: JobData) => {
    setIsLoading(true);
    try {
      const requirementsArray = data.requirements.split(",").map(req => req.trim());
      
      const jobData = {
        title: data.title,
        department: data.department,
        location: data.location,
        type: data.type,
        salary: data.salary,
        description: data.description,
        requirements: requirementsArray,
        is_active: true,
      };

      let error;
      
      if (job) {
        const { error: updateError } = await supabase
          .from("jobs")
          .update({ ...jobData, updated_at: new Date().toISOString() })
          .eq("id", job.id);
        error = updateError;
      } else {
        const { error: insertError } = await supabase
          .from("jobs")
          .insert(jobData);
        error = insertError;
      }

      if (error) {
        toast({
          title: "Erro",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Sucesso!",
        description: job ? "Vaga atualizada com sucesso!" : "Vaga criada com sucesso!",
      });

      form.reset();
      onOpenChange(false);
      onSave();
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro inesperado.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-conceitto-gray">
            {job ? "Editar Vaga" : "Nova Vaga"}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título da Vaga *</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Desenvolvedor Frontend Senior" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="department"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Departamento *</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Tecnologia" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo *</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: CLT, PJ" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Localização *</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: São Paulo, SP" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="salary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Salário *</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: R$ 8.000 - R$ 12.000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição *</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Descreva a vaga e responsabilidades..."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="requirements"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Requisitos * (separados por vírgula)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Ex: React, TypeScript, 5+ anos exp."
                      className="min-h-[80px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                disabled={isLoading}
              >
                {isLoading ? "Salvando..." : job ? "Atualizar" : "Criar Vaga"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
