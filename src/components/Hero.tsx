
import { Button } from "@/components/ui/button";
import { ArrowDown, Users, Target, Award } from "lucide-react";

export const Hero = () => {
  const scrollToJobs = () => {
    document.getElementById('vagas')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-conceitto-dark-blue via-conceitto-blue to-conceitto-light-blue text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full blur-xl"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-white rounded-full blur-lg"></div>
        <div className="absolute bottom-32 left-1/3 w-20 h-20 bg-white rounded-full blur-lg"></div>
      </div>

      <div className="relative container mx-auto px-4 py-20 flex flex-col justify-center min-h-screen">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            Trabalhe <span className="text-priority">Conosco</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-blue-100 animate-fade-in">
            Faça parte de uma equipe inovadora que está transformando o futuro. 
            Aqui, seu talento encontra o ambiente perfeito para crescer.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              onClick={scrollToJobs}
              size="lg" 
              className="bg-priority hover:bg-priority-hover text-white font-semibold px-8 py-4 text-lg"
            >
              Ver Vagas Disponíveis
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-white text-white hover:bg-white hover:text-conceitto-blue px-8 py-4 text-lg"
            >
              Conhecer a Empresa
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="flex flex-col items-center">
              <Users className="w-12 h-12 mb-4 text-priority" />
              <div className="text-3xl font-bold mb-2">500+</div>
              <div className="text-blue-100">Colaboradores</div>
            </div>
            <div className="flex flex-col items-center">
              <Target className="w-12 h-12 mb-4 text-priority" />
              <div className="text-3xl font-bold mb-2">15+</div>
              <div className="text-blue-100">Anos no Mercado</div>
            </div>
            <div className="flex flex-col items-center">
              <Award className="w-12 h-12 mb-4 text-priority" />
              <div className="text-3xl font-bold mb-2">50+</div>
              <div className="text-blue-100">Prêmios Recebidos</div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="w-6 h-6 text-white" />
        </div>
      </div>
    </section>
  );
};
