
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Instagram, Linkedin, Twitter, Facebook, Settings } from "lucide-react";

export const Footer = () => {
  const handleAdminAccess = () => {
    // Por enquanto, apenas um console.log - depois implementaremos a navegação para a área admin
    console.log("Acessar área administrativa");
  };

  return (
    <footer className="bg-conceitto-gray text-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {/* Company Info */}
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold mb-4">Nossa Empresa</h3>
              <p className="text-gray-300 mb-6 max-w-md">
                Somos uma empresa inovadora comprometida em criar soluções 
                que transformam vidas e impulsionam o futuro. Junte-se a nós 
                nesta jornada extraordinária.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-priority rounded-full flex items-center justify-center hover:bg-priority-hover transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-priority rounded-full flex items-center justify-center hover:bg-priority-hover transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-priority rounded-full flex items-center justify-center hover:bg-priority-hover transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-priority rounded-full flex items-center justify-center hover:bg-priority-hover transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Links Rápidos</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-priority transition-colors">Sobre Nós</a></li>
                <li><a href="#vagas" className="hover:text-priority transition-colors">Vagas</a></li>
                <li><a href="#" className="hover:text-priority transition-colors">Cultura</a></li>
                <li><a href="#" className="hover:text-priority transition-colors">Benefícios</a></li>
                <li><a href="#" className="hover:text-priority transition-colors">Blog</a></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Suporte</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-priority transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-priority transition-colors">Contato</a></li>
                <li><a href="#" className="hover:text-priority transition-colors">Política de Privacidade</a></li>
                <li><a href="#" className="hover:text-priority transition-colors">Termos de Uso</a></li>
                <li><a href="#" className="hover:text-priority transition-colors">LGPD</a></li>
              </ul>
            </div>
          </div>

          <Separator className="bg-gray-700 mb-8" />

          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-col md:flex-row items-center gap-4 mb-4 md:mb-0">
              <p className="text-gray-400 text-sm">
                © 2024 Nossa Empresa. Todos os direitos reservados.
              </p>
              <Button 
                onClick={handleAdminAccess}
                variant="ghost" 
                size="sm"
                className="text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
              >
                <Settings className="w-4 h-4 mr-2" />
                Admin
              </Button>
            </div>
            <p className="text-gray-400 text-sm">
              Desenvolvido com ❤️ pela equipe de tecnologia
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
