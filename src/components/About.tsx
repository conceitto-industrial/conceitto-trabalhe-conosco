
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Zap, Globe, Shield } from "lucide-react";

export const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Bem-estar",
      description: "Priorizamos o equilíbrio entre vida pessoal e profissional, oferecendo benefícios que cuidam de você e sua família."
    },
    {
      icon: Zap,
      title: "Inovação",
      description: "Incentivamos a criatividade e o pensamento disruptivo para encontrar soluções que impactem positivamente o mercado."
    },
    {
      icon: Globe,
      title: "Diversidade",
      description: "Valorizamos diferentes perspectivas e experiências, criando um ambiente inclusivo e colaborativo."
    },
    {
      icon: Shield,
      title: "Confiança",
      description: "Construímos relacionamentos baseados na transparência, integridade e respeito mútuo."
    }
  ];

  return (
    <section className="py-20 bg-conceitto-light-gray">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-conceitto-gray">
              Por que trabalhar conosco?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Somos uma empresa que acredita no poder das pessoas. Oferecemos um ambiente 
              onde você pode crescer profissionalmente enquanto faz a diferença no mundo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {values.map((value, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300 border-0 bg-white">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-conceitto-blue/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <value.icon className="w-8 h-8 text-conceitto-blue" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-conceitto-gray">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-bold mb-6 text-conceitto-gray">
                  Nossa Cultura
                </h3>
                <p className="text-lg text-muted-foreground mb-6">
                  Acreditamos que grandes resultados vêm de pessoas felizes e engajadas. 
                  Nossa cultura é baseada na colaboração, aprendizado contínuo e celebração 
                  das conquistas de cada membro da equipe.
                </p>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-conceitto-green rounded-full mr-3"></div>
                    Horários flexíveis e trabalho remoto
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-conceitto-green rounded-full mr-3"></div>
                    Programa de desenvolvimento pessoal
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-conceitto-green rounded-full mr-3"></div>
                    Ambiente colaborativo e inclusivo
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-conceitto-green rounded-full mr-3"></div>
                    Oportunidades de crescimento internacional
                  </li>
                </ul>
              </div>
              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-conceitto-blue to-conceitto-light-blue rounded-2xl p-8 text-white">
                  <div className="h-full flex flex-col justify-center">
                    <h4 className="text-2xl font-bold mb-4">Junte-se a nós!</h4>
                    <p className="text-blue-100">
                      Mais de 500 profissionais já escolheram crescer conosco. 
                      Seja o próximo a fazer parte desta jornada extraordinária.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
