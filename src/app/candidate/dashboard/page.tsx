'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  User,
  Briefcase,
  Eye,
  MessageSquare,
  Calendar,
  TrendingUp,
  FileText,
  Bell,
  Search,
  Star,
  MapPin,
  Clock,
  Building,
  Award,
  BookOpen,
  Target,
  CheckCircle,
  AlertCircle,
  Plus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { mockJobs, mockCourses, mockNotifications } from '@/data/mockData';

export default function CandidateDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  // Dados simulados do candidato logado
  const candidateData = {
    name: 'Ana Oliveira',
    profileCompleteness: 85,
    applications: [
      {
        id: '1',
        job: mockJobs[0],
        status: 'reviewing',
        appliedAt: '2024-11-28',
        lastUpdate: '2024-11-30'
      },
      {
        id: '2',
        job: mockJobs[1],
        status: 'interview',
        appliedAt: '2024-11-25',
        lastUpdate: '2024-11-29',
        interviewDate: '2024-12-05'
      },
      {
        id: '3',
        job: mockJobs[2],
        status: 'pending',
        appliedAt: '2024-11-30',
        lastUpdate: '2024-11-30'
      }
    ],
    savedJobs: mockJobs.slice(0, 2),
    enrolledCourses: [
      {
        id: '1',
        course: mockCourses[0],
        progress: 65,
        enrolledAt: '2024-11-01'
      },
      {
        id: '2',
        course: mockCourses[1],
        progress: 25,
        enrolledAt: '2024-11-15'
      }
    ],
    stats: {
      totalApplications: 8,
      interviewsScheduled: 2,
      profileViews: 23,
      completedCourses: 3
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'reviewing': return 'bg-blue-100 text-blue-800';
      case 'interview': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'accepted': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Pendente';
      case 'reviewing': return 'Em Análise';
      case 'interview': return 'Entrevista';
      case 'rejected': return 'Rejeitada';
      case 'accepted': return 'Aceita';
      default: return status;
    }
  };

  const recommendedJobs = mockJobs.filter(job =>
    job.tags.some(tag => ['React', 'TypeScript', 'Frontend'].includes(tag))
  ).slice(0, 3);

  const notifications = mockNotifications.slice(0, 5);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header isLoggedIn={true} userType="candidate" userName={candidateData.name} notificationCount={2} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header do Dashboard */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Olá, {candidateData.name}! 👋
          </h1>
          <p className="text-gray-600">
            Aqui está um resumo das suas atividades e oportunidades
          </p>
        </div>

        {/* Alerta de Perfil Incompleto */}
        {candidateData.profileCompleteness < 100 && (
          <Alert className="mb-6 border-orange-200 bg-orange-50">
            <AlertCircle className="h-4 w-4 text-orange-600" />
            <AlertDescription className="text-orange-800">
              Seu perfil está {candidateData.profileCompleteness}% completo.
              <Link href="/candidate/profile" className="font-medium underline ml-1">
                Complete seu perfil
              </Link> para receber mais oportunidades!
            </AlertDescription>
          </Alert>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="applications">Candidaturas</TabsTrigger>
            <TabsTrigger value="jobs">Vagas</TabsTrigger>
            <TabsTrigger value="courses">Cursos</TabsTrigger>
            <TabsTrigger value="profile">Perfil</TabsTrigger>
          </TabsList>

          {/* Visão Geral */}
          <TabsContent value="overview" className="space-y-6">
            {/* Cards de Estatísticas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Candidaturas</p>
                      <p className="text-2xl font-bold text-gray-900">{candidateData.stats.totalApplications}</p>
                    </div>
                    <Briefcase className="h-8 w-8 text-blue-600" />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">+2 esta semana</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Entrevistas</p>
                      <p className="text-2xl font-bold text-gray-900">{candidateData.stats.interviewsScheduled}</p>
                    </div>
                    <Calendar className="h-8 w-8 text-green-600" />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">1 agendada</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Visualizações</p>
                      <p className="text-2xl font-bold text-gray-900">{candidateData.stats.profileViews}</p>
                    </div>
                    <Eye className="h-8 w-8 text-purple-600" />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">+5 esta semana</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Cursos</p>
                      <p className="text-2xl font-bold text-gray-900">{candidateData.stats.completedCourses}</p>
                    </div>
                    <Award className="h-8 w-8 text-orange-600" />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Concluídos</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Atividade Recente */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Bell className="h-5 w-5 mr-2" />
                    Atividade Recente
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {notifications.map((notification) => (
                      <div key={notification.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                        <div className={`w-2 h-2 rounded-full mt-2 ${notification.read ? 'bg-gray-300' : 'bg-blue-500'}`} />
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 text-sm">{notification.title}</p>
                          <p className="text-gray-600 text-sm">{notification.message}</p>
                          <p className="text-gray-400 text-xs mt-1">
                            {new Date(notification.createdAt).toLocaleDateString('pt-BR')}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-4">
                    Ver Todas as Notificações
                  </Button>
                </CardContent>
              </Card>

              {/* Progresso do Perfil */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    Completude do Perfil
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm font-medium mb-2">
                        <span>Progresso Geral</span>
                        <span>{candidateData.profileCompleteness}%</span>
                      </div>
                      <Progress value={candidateData.profileCompleteness} className="h-2" />
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          <span>Informações básicas</span>
                        </div>
                        <span className="text-green-600">Completo</span>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          <span>Experiência profissional</span>
                        </div>
                        <span className="text-green-600">Completo</span>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center">
                          <AlertCircle className="h-4 w-4 text-orange-500 mr-2" />
                          <span>Upload de currículo</span>
                        </div>
                        <span className="text-orange-600">Pendente</span>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center">
                          <AlertCircle className="h-4 w-4 text-orange-500 mr-2" />
                          <span>Foto do perfil</span>
                        </div>
                        <span className="text-orange-600">Pendente</span>
                      </div>
                    </div>

                    <Button size="sm" className="w-full" asChild>
                      <Link href="/candidate/profile">Completar Perfil</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Vagas Recomendadas */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <Target className="h-5 w-5 mr-2" />
                    Vagas Recomendadas para Você
                  </CardTitle>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/jobs">Ver Todas</Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {recommendedJobs.map((job) => (
                    <div key={job.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <h3 className="font-medium text-gray-900 mb-1 hover:text-blue-600">
                        <Link href={`/jobs/${job.id}`}>{job.title}</Link>
                      </h3>
                      <p className="text-gray-600 text-sm mb-2 flex items-center">
                        <Building className="h-4 w-4 mr-1" />
                        {job.employer?.companyName}
                      </p>
                      <div className="flex items-center text-sm text-gray-500 mb-2">
                        <MapPin className="h-4 w-4 mr-1" />
                        {job.location}
                      </div>
                      <p className="text-green-600 font-medium text-sm mb-3">
                        R$ {job.salaryRange.min.toLocaleString()} - R$ {job.salaryRange.max.toLocaleString()}
                      </p>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {job.tags.slice(0, 2).map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <Button size="sm" className="w-full" asChild>
                        <Link href={`/jobs/${job.id}`}>Ver Vaga</Link>
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Candidaturas */}
          <TabsContent value="applications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Suas Candidaturas</CardTitle>
                <p className="text-gray-600">Acompanhe o status das suas aplicações</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {candidateData.applications.map((application) => (
                    <div key={application.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 hover:text-blue-600">
                            <Link href={`/jobs/${application.job.id}`}>
                              {application.job.title}
                            </Link>
                          </h3>
                          <p className="text-gray-600 text-sm flex items-center mt-1">
                            <Building className="h-4 w-4 mr-1" />
                            {application.job.employer?.companyName}
                          </p>
                        </div>
                        <Badge className={getStatusColor(application.status)}>
                          {getStatusText(application.status)}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                        <div>
                          <span className="font-medium">Candidatura:</span> {' '}
                          {new Date(application.appliedAt).toLocaleDateString('pt-BR')}
                        </div>
                        <div>
                          <span className="font-medium">Última atualização:</span> {' '}
                          {new Date(application.lastUpdate).toLocaleDateString('pt-BR')}
                        </div>
                      </div>

                      {application.interviewDate && (
                        <div className="bg-green-50 border border-green-200 rounded p-3 mb-3">
                          <p className="text-green-800 text-sm font-medium flex items-center">
                            <Calendar className="h-4 w-4 mr-2" />
                            Entrevista agendada para {new Date(application.interviewDate).toLocaleDateString('pt-BR')}
                          </p>
                        </div>
                      )}

                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline" asChild>
                          <Link href={`/jobs/${application.job.id}`}>Ver Vaga</Link>
                        </Button>
                        <Button size="sm" variant="outline">
                          <MessageSquare className="h-4 w-4 mr-1" />
                          Mensagens
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Vagas Salvas */}
          <TabsContent value="jobs" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Vagas Salvas</h2>
              <Button asChild>
                <Link href="/jobs">
                  <Search className="h-4 w-4 mr-2" />
                  Buscar Vagas
                </Link>
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {candidateData.savedJobs.map((job) => (
                <Card key={job.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg hover:text-blue-600">
                          <Link href={`/jobs/${job.id}`}>{job.title}</Link>
                        </CardTitle>
                        <p className="text-gray-600 flex items-center mt-1">
                          <Building className="h-4 w-4 mr-1" />
                          {job.employer?.companyName}
                        </p>
                      </div>
                      <Badge variant={job.remote ? "secondary" : "outline"}>
                        {job.remote ? 'Remoto' : 'Presencial'}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <p className="text-gray-600 text-sm line-clamp-2">{job.description}</p>

                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {job.location}
                        </div>
                        <div className="flex items-center text-green-600 font-medium">
                          R$ {job.salaryRange.min.toLocaleString()} - R$ {job.salaryRange.max.toLocaleString()}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {job.tags.slice(0, 3).map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex space-x-2 pt-2">
                        <Button size="sm" className="flex-1" asChild>
                          <Link href={`/jobs/${job.id}`}>Candidatar-se</Link>
                        </Button>
                        <Button size="sm" variant="outline">
                          Remover
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Cursos */}
          <TabsContent value="courses" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Meus Cursos</h2>
              <Button asChild>
                <Link href="/courses">
                  <Plus className="h-4 w-4 mr-2" />
                  Buscar Cursos
                </Link>
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {candidateData.enrolledCourses.map((enrollment) => (
                <Card key={enrollment.id}>
                  <div className="aspect-video relative">
                    <img
                      src={enrollment.course.thumbnail}
                      alt={enrollment.course.title}
                      className="w-full h-full object-cover rounded-t-lg"
                    />
                    <div className="absolute bottom-2 left-2 right-2">
                      <Progress value={enrollment.progress} className="h-2 bg-black/20" />
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg hover:text-blue-600">
                      <Link href={`/courses/${enrollment.course.id}`}>
                        {enrollment.course.title}
                      </Link>
                    </CardTitle>
                    <p className="text-gray-600 text-sm">por {enrollment.course.instructor}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Progresso</span>
                        <span className="font-medium">{enrollment.progress}%</span>
                      </div>

                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {enrollment.course.duration}h
                        </div>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 mr-1 text-yellow-500 fill-current" />
                          {enrollment.course.rating}
                        </div>
                      </div>

                      <Button size="sm" className="w-full" asChild>
                        <Link href={`/courses/${enrollment.course.id}`}>
                          Continuar Estudando
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Perfil */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informações do Perfil</CardTitle>
                <p className="text-gray-600">Mantenha suas informações sempre atualizadas</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                      <User className="h-10 w-10 text-gray-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">{candidateData.name}</h3>
                      <p className="text-gray-600">Desenvolvedora Frontend</p>
                      <p className="text-gray-500 text-sm">São Paulo, SP</p>
                    </div>
                    <Button variant="outline" asChild>
                      <Link href="/candidate/profile">Editar Perfil</Link>
                    </Button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Habilidades</h4>
                      <div className="flex flex-wrap gap-2">
                        {['React', 'TypeScript', 'Node.js', 'MongoDB', 'Git'].map((skill, index) => (
                          <Badge key={index} variant="secondary">{skill}</Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Experiência</h4>
                      <p className="text-gray-600 text-sm">2+ anos em desenvolvimento web</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-900">Ações Rápidas</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <Button variant="outline" size="sm" asChild>
                        <Link href="/candidate/profile">
                          <User className="h-4 w-4 mr-2" />
                          Editar Perfil
                        </Link>
                      </Button>
                      <Button variant="outline" size="sm">
                        <FileText className="h-4 w-4 mr-2" />
                        Upload CV
                      </Button>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        Preview Perfil
                      </Button>
                      <Button variant="outline" size="sm">
                        <TrendingUp className="h-4 w-4 mr-2" />
                        Estatísticas
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
}
