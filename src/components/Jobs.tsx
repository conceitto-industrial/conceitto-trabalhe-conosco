import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, DollarSign } from "lucide-react";

export const Jobs = () => {
  const jobs = [
    {
      id: 1,
      title: "Desenvolvedor Frontend Senior",
      department: "Tecnologia",
      location: "São Paulo, SP",
      type: "CLT",
      salary: "R$ 8.000 - R$ 12.000",
      description: "Buscamos um desenvolvedor frontend experiente para liderar projetos inovadores usando React, TypeScript e tecnologias modernas.",
      requirements: ["React", "TypeScript", "Tailwind CSS", "5+ anos exp."]
    },
    {
      id: 2,
      title: "UX/UI Designer",
      department: "Design",
      location: "Remoto",
      type: "CLT",
      salary: "R$ 6.000 - R$ 9.000",
      description: "Procuramos um designer criativo para criar experiências digitais excepcionais e interfaces intuitivas.",
      requirements: ["Figma", "Adobe Creative", "Design Systems", "3+ anos exp."]
    },
    {
      id: 3,
      title: "Product Manager",
      department: "Produto",
      location: "Híbrido - RJ",
      type: "CLT",
      salary: "R$ 10.000 - R$ 15.000",
      description: "Oportunidade para liderar a estratégia de produto e trabalhar com equipes multidisciplinares.",
      requirements: ["Agile/Scrum", "Analytics", "Estratégia", "4+ anos exp."]
    },
    {
      id: 4,
      title: "Analista de Marketing Digital",
      department: "Marketing",
      location: "São Paulo, SP",
      type: "CLT",
      salary: "R$ 4.500 - R$ 7.000",
      description: "Gerencie campanhas digitais e analise métricas para otimizar nossa presença online.",
      requirements: ["Google Ads", "Facebook Ads", "Analytics", "2+ anos exp."]
    }
  ];

  return (
    <section id="vagas" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-conceitto-gray">
              Vagas Disponíveis
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Encontre a oportunidade perfeita para dar o próximo passo na sua carreira. 
              Todas as nossas vagas oferecem excelentes benefícios e ambiente de crescimento.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {jobs.map((job) => (
              <Card key={job.id} className="hover:shadow-xl transition-all duration-300 border-0 bg-gray-50 hover:bg-white">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="secondary" className="bg-priority/10 text-priority">
                      {job.department}
                    </Badge>
                    <Badge variant="outline" className="border-priority text-priority">
                      {job.type}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl mb-3 text-conceitto-gray">{job.title}</CardTitle>
                  
                  <div className="flex flex-col sm:flex-row gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      {job.location}
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="w-4 h-4 mr-2" />
                      {job.salary}
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <p className="text-muted-foreground mb-4">{job.description}</p>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold mb-2 text-conceitto-gray">Requisitos:</h4>
                    <div className="flex flex-wrap gap-2">
                      {job.requirements.map((req, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {req}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button className="w-full bg-priority hover:bg-priority-hover">
                    Candidatar-se
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              Não encontrou a vaga ideal? Envie seu currículo mesmo assim!
            </p>
            <Button variant="outline" size="lg" className="border-2 border-priority text-priority hover:bg-priority hover:text-white">
              Cadastro Espontâneo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
