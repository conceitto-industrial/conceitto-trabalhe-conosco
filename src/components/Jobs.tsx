
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { MapPin, DollarSign } from "lucide-react";
import { SpontaneousApplicationForm } from "./SpontaneousApplicationForm";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  salary: string;
  description: string;
  requirements: string[];
}

export const Jobs = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Erro ao buscar vagas:', error);
        toast({
          title: "Erro",
          description: "Não foi possível carregar as vagas.",
          variant: "destructive",
        });
        return;
      }

      setJobs(data || []);
    } catch (error) {
      console.error('Erro ao buscar vagas:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar as vagas.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <section id="vagas" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-conceitto-gray">
                Vagas Disponíveis
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Carregando vagas disponíveis...
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

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

          {jobs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg mb-4">
                Não há vagas disponíveis no momento.
              </p>
              <p className="text-muted-foreground">
                Mas você ainda pode enviar seu currículo através do cadastro espontâneo!
              </p>
            </div>
          ) : (
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
          )}

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              Não encontrou a vaga ideal? Envie seu currículo mesmo assim!
            </p>
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogTrigger asChild>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-2 border-priority text-priority hover:bg-priority hover:text-white"
                >
                  Cadastro Espontâneo
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <SpontaneousApplicationForm />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </section>
  );
};
