
import { Control, FieldValues } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FormData {
  name: string;
  email: string;
  phone: string;
  area: string;
  message: string;
}

interface SpontaneousApplicationFormFieldsProps {
  control: Control<FormData>;
}

export const SpontaneousApplicationFormFields = ({
  control,
}: SpontaneousApplicationFormFieldsProps) => {
  return (
    <>
      <FormField
        control={control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nome Completo *</FormLabel>
            <FormControl>
              <Input placeholder="Seu nome completo" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>E-mail *</FormLabel>
            <FormControl>
              <Input
                type="email"
                placeholder="seu.email@exemplo.com"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="phone"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Telefone *</FormLabel>
            <FormControl>
              <Input placeholder="(11) 99999-9999" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="area"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Área de Interesse *</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma área" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="tecnologia">Tecnologia</SelectItem>
                <SelectItem value="vendas">Vendas</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
                <SelectItem value="financeiro">Financeiro</SelectItem>
                <SelectItem value="recursos-humanos">Recursos Humanos</SelectItem>
                <SelectItem value="operacoes">Operações</SelectItem>
                <SelectItem value="outros">Outros</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="message"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Mensagem</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Conte-nos um pouco sobre você e por que gostaria de trabalhar conosco..."
                className="min-h-[100px]"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
