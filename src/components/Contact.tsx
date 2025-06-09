
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, Upload } from "lucide-react";

export const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    experience: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate form submission
    toast({
      title: "Candidatura enviada com sucesso!",
      description: "Entraremos em contato em breve. Obrigado pelo seu interesse!",
    });

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      position: "",
      experience: "",
      message: ""
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Entre em Contato
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Pronto para dar o próximo passo? Envie sua candidatura ou tire suas dúvidas conosco.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <Card className="bg-blue-600 text-white border-0">
                <CardHeader>
                  <CardTitle className="text-2xl">Fale Conosco</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <Mail className="w-6 h-6 mt-1 text-blue-200" />
                    <div>
                      <h4 className="font-semibold mb-1">Email</h4>
                      <p className="text-blue-100">rh@empresa.com.br</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <Phone className="w-6 h-6 mt-1 text-blue-200" />
                    <div>
                      <h4 className="font-semibold mb-1">Telefone</h4>
                      <p className="text-blue-100">(11) 9999-9999</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <MapPin className="w-6 h-6 mt-1 text-blue-200" />
                    <div>
                      <h4 className="font-semibold mb-1">Endereço</h4>
                      <p className="text-blue-100">
                        Av. Paulista, 1000<br />
                        São Paulo, SP - 01310-100
                      </p>
                    </div>
                  </div>

                  <div className="pt-6">
                    <h4 className="font-semibold mb-3">Horário de Atendimento</h4>
                    <p className="text-blue-100 text-sm">
                      Segunda a Sexta: 9h às 18h<br />
                      Sábado: 9h às 12h
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="border-0 bg-white shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl text-gray-900">Envie sua Candidatura</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nome Completo *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          placeholder="Seu nome completo"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          placeholder="seu@email.com"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Telefone</Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          placeholder="(11) 99999-9999"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="position">Vaga de Interesse</Label>
                        <Select value={formData.position} onValueChange={(value) => handleInputChange("position", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione uma vaga" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="frontend">Desenvolvedor Frontend Senior</SelectItem>
                            <SelectItem value="designer">UX/UI Designer</SelectItem>
                            <SelectItem value="product">Product Manager</SelectItem>
                            <SelectItem value="marketing">Analista de Marketing Digital</SelectItem>
                            <SelectItem value="other">Cadastro Espontâneo</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="experience">Experiência Profissional</Label>
                      <Select value={formData.experience} onValueChange={(value) => handleInputChange("experience", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione sua experiência" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="junior">Júnior (0-2 anos)</SelectItem>
                          <SelectItem value="pleno">Pleno (2-5 anos)</SelectItem>
                          <SelectItem value="senior">Sênior (5+ anos)</SelectItem>
                          <SelectItem value="especialista">Especialista (8+ anos)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Mensagem</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        placeholder="Conte-nos um pouco sobre você e suas motivações..."
                        rows={4}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Currículo (PDF)</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer">
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">
                          Clique aqui ou arraste seu currículo (PDF, máx. 5MB)
                        </p>
                      </div>
                    </div>

                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-3">
                      Enviar Candidatura
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
