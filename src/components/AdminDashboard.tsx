
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Edit, Trash2, Download, LogOut, MapPin, DollarSign, Calendar } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { JobForm } from "./JobForm";

interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  salary: string;
  description: string;
  requirements: string[];
  is_active: boolean;
  created_at: string;
}

interface Application {
  id: string;
  name: string;
  email: string;
  phone: string;
  area: string;
  message: string;
  resume_url: string;
  created_at: string;
  job_id?: string;
  jobs?: { title: string };
}

interface AdminDashboardProps {
  onLogout: () => void;
}

export const AdminDashboard = ({ onLogout }: AdminDashboardProps) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [spontaneousApplications, setSpontaneousApplications] = useState<Application[]>([]);
  const [isJobFormOpen, setIsJobFormOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const fetchJobs = async () => {
    const { data, error } = await supabase
      .from("jobs")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({
        title: "Erro",
        description: "Erro ao carregar vagas: " + error.message,
        variant: "destructive",
      });
      return;
    }

    setJobs(data || []);
  };

  const fetchApplications = async () => {
    const { data, error } = await supabase
      .from("applications")
      .select(`
        *,
        jobs (title)
      `)
      .order("created_at", { ascending: false });

    if (error) {
      toast({
        title: "Erro",
        description: "Erro ao carregar candidaturas: " + error.message,
        variant: "destructive",
      });
      return;
    }

    setApplications(data || []);
  };

  const fetchSpontaneousApplications = async () => {
    const { data, error } = await supabase
      .from("spontaneous_applications")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({
        title: "Erro",
        description: "Erro ao carregar candidaturas espontâneas: " + error.message,
        variant: "destructive",
      });
      return;
    }

    setSpontaneousApplications(data || []);
  };

  useEffect(() => {
    fetchJobs();
    fetchApplications();
    fetchSpontaneousApplications();
  }, []);

  const handleDeleteJob = async (jobId: string) => {
    if (!confirm("Tem certeza que deseja excluir esta vaga?")) return;

    const { error } = await supabase
      .from("jobs")
      .delete()
      .eq("id", jobId);

    if (error) {
      toast({
        title: "Erro",
        description: "Erro ao excluir vaga: " + error.message,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Sucesso!",
      description: "Vaga excluída com sucesso!",
    });

    fetchJobs();
  };

  const handleToggleJobStatus = async (job: Job) => {
    const { error } = await supabase
      .from("jobs")
      .update({ is_active: !job.is_active })
      .eq("id", job.id);

    if (error) {
      toast({
        title: "Erro",
        description: "Erro ao atualizar status da vaga: " + error.message,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Sucesso!",
      description: `Vaga ${!job.is_active ? "ativada" : "desativada"} com sucesso!`,
    });

    fetchJobs();
  };

  const handleDownloadResume = async (resumeUrl: string, candidateName: string) => {
    try {
      const { data, error } = await supabase.storage
        .from("resumes")
        .download(resumeUrl);

      if (error) {
        toast({
          title: "Erro",
          description: "Erro ao baixar currículo: " + error.message,
          variant: "destructive",
        });
        return;
      }

      const url = URL.createObjectURL(data);
      const a = document.createElement("a");
      a.href = url;
      a.download = `curriculo_${candidateName.replace(" ", "_")}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao baixar currículo.",
        variant: "destructive",
      });
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    onLogout();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-conceitto-gray">
              Painel Administrativo
            </h1>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="border-red-200 text-red-600 hover:bg-red-50"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="jobs" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="jobs">Vagas ({jobs.length})</TabsTrigger>
            <TabsTrigger value="applications">
              Candidaturas ({applications.length})
            </TabsTrigger>
            <TabsTrigger value="spontaneous">
              Espontâneas ({spontaneousApplications.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="jobs" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-conceitto-gray">
                Gerenciar Vagas
              </h2>
              <Button
                onClick={() => setIsJobFormOpen(true)}
                className="bg-priority hover:bg-priority-hover"
              >
                <Plus className="w-4 h-4 mr-2" />
                Nova Vaga
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {jobs.map((job) => (
                <Card key={job.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start mb-2">
                      <Badge
                        variant={job.is_active ? "default" : "secondary"}
                        className={job.is_active ? "bg-green-100 text-green-800" : ""}
                      >
                        {job.is_active ? "Ativa" : "Inativa"}
                      </Badge>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setEditingJob(job);
                            setIsJobFormOpen(true);
                          }}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleToggleJobStatus(job)}
                        >
                          {job.is_active ? "Desativar" : "Ativar"}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteJob(job.id)}
                          className="text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <CardTitle className="text-lg mb-2">{job.title}</CardTitle>
                    <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        {job.location} • {job.department}
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="w-4 h-4 mr-2" />
                        {job.salary}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        {formatDate(job.created_at)}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">
                      {job.description.substring(0, 100)}...
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {job.requirements.slice(0, 3).map((req, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {req}
                        </Badge>
                      ))}
                      {job.requirements.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{job.requirements.length - 3}
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="applications" className="space-y-6">
            <h2 className="text-2xl font-semibold text-conceitto-gray">
              Candidaturas por Vaga
            </h2>
            
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Telefone</TableHead>
                      <TableHead>Vaga</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead>Currículo</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {applications.map((application) => (
                      <TableRow key={application.id}>
                        <TableCell className="font-medium">
                          {application.name}
                        </TableCell>
                        <TableCell>{application.email}</TableCell>
                        <TableCell>{application.phone}</TableCell>
                        <TableCell>
                          {application.jobs?.title || "Vaga removida"}
                        </TableCell>
                        <TableCell>{formatDate(application.created_at)}</TableCell>
                        <TableCell>
                          {application.resume_url && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() =>
                                handleDownloadResume(
                                  application.resume_url,
                                  application.name
                                )
                              }
                            >
                              <Download className="w-4 h-4 mr-2" />
                              Baixar
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="spontaneous" className="space-y-6">
            <h2 className="text-2xl font-semibold text-conceitto-gray">
              Candidaturas Espontâneas
            </h2>
            
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Telefone</TableHead>
                      <TableHead>Área</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead>Currículo</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {spontaneousApplications.map((application) => (
                      <TableRow key={application.id}>
                        <TableCell className="font-medium">
                          {application.name}
                        </TableCell>
                        <TableCell>{application.email}</TableCell>
                        <TableCell>{application.phone}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{application.area}</Badge>
                        </TableCell>
                        <TableCell>{formatDate(application.created_at)}</TableCell>
                        <TableCell>
                          {application.resume_url && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() =>
                                handleDownloadResume(
                                  application.resume_url,
                                  application.name
                                )
                              }
                            >
                              <Download className="w-4 h-4 mr-2" />
                              Baixar
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <JobForm
        open={isJobFormOpen}
        onOpenChange={(open) => {
          setIsJobFormOpen(open);
          if (!open) setEditingJob(null);
        }}
        job={editingJob}
        onSave={() => {
          fetchJobs();
          setEditingJob(null);
        }}
      />
    </div>
  );
};
