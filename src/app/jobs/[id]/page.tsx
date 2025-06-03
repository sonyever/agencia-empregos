'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  MapPin,
  Building,
  Calendar,
  DollarSign,
  Clock,
  Users,
  Share2,
  Heart,
  ArrowLeft,
  CheckCircle,
  X,
  Briefcase,
  GraduationCap,
  Award,
  Globe
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { mockJobs } from '@/data/mockData';

export default function JobDetailPage() {
  const params = useParams();
  const jobId = params.id as string;
  const [isFavorited, setIsFavorited] = useState(false);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [applicationSent, setApplicationSent] = useState(false);
  const [coverLetter, setCoverLetter] = useState('');

  // Encontrar a vaga pelos dados mock
  const job = mockJobs.find(j => j.id === jobId);

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Vaga não encontrada</h1>
            <p className="text-gray-600 mb-6">A vaga que você procura não existe ou foi removida.</p>
            <Button asChild>
              <Link href="/jobs">Ver Todas as Vagas</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const handleApplication = () => {
    // Simular envio da candidatura
    setApplicationSent(true);
    setShowApplicationModal(false);
    setCoverLetter('');
  };

  const relatedJobs = mockJobs.filter(j =>
    j.id !== job.id &&
    (j.category === job.category || j.tags.some(tag => job.tags.includes(tag)))
  ).slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header isLoggedIn={true} userType="candidate" userName="Ana Oliveira" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link href="/jobs" className="flex items-center text-blue-600 hover:text-blue-700">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar para vagas
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Conteúdo Principal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header da Vaga */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-2xl text-gray-900 mb-2">
                      {job.title}
                    </CardTitle>
                    <div className="flex items-center space-x-4 text-gray-600 mb-4">
                      <div className="flex items-center">
                        <Building className="h-4 w-4 mr-1" />
                        {job.employer?.companyName}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {job.location}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(job.createdAt).toLocaleDateString('pt-BR')}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant={job.remote ? "secondary" : "outline"}>
                        {job.remote ? 'Remoto' : 'Presencial'}
                      </Badge>
                      <Badge variant="outline" className="capitalize">
                        {job.employmentType.replace('-', ' ')}
                      </Badge>
                      <Badge variant="outline" className="capitalize">
                        {job.experienceLevel}
                      </Badge>
                      <Badge variant="outline">
                        {job.category}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsFavorited(!isFavorited)}
                    >
                      <Heart className={`h-4 w-4 ${isFavorited ? 'fill-red-500 text-red-500' : ''}`} />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Alert de candidatura enviada */}
            {applicationSent && (
              <Alert className="border-green-200 bg-green-50">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  Sua candidatura foi enviada com sucesso! O empregador foi notificado e entrará em contato em breve.
                </AlertDescription>
              </Alert>
            )}

            {/* Descrição da Vaga */}
            <Card>
              <CardHeader>
                <CardTitle>Descrição da Vaga</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 leading-relaxed">{job.description}</p>

                <Separator />

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Responsabilidades</h3>
                  <ul className="space-y-2">
                    {job.responsibilities.map((responsibility, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-gray-700">{responsibility}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Requisitos</h3>
                  <ul className="space-y-2">
                    {job.requirements.map((requirement, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-gray-700">{requirement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Habilidades</h3>
                  <div className="flex flex-wrap gap-2">
                    {job.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Informações da Empresa */}
            <Card>
              <CardHeader>
                <CardTitle>Sobre a Empresa</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                    {job.employer?.logo ? (
                      <img
                        src={job.employer.logo}
                        alt={job.employer.companyName}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                    ) : (
                      <Building className="h-8 w-8 text-gray-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {job.employer?.companyName}
                    </h3>
                    <p className="text-gray-600 mb-2">{job.employer?.industry}</p>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {job.employer?.description}
                    </p>
                    <div className="flex items-center space-x-4 mt-3 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {job.employer?.companySize}
                      </div>
                      {job.employer?.website && (
                        <div className="flex items-center">
                          <Globe className="h-4 w-4 mr-1" />
                          <a
                            href={job.employer.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-700"
                          >
                            Website
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Card de Candidatura */}
            <Card>
              <CardHeader>
                <CardTitle>Informações da Vaga</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Salário</span>
                  <span className="font-semibold text-green-600">
                    R$ {job.salaryRange.min.toLocaleString()} - R$ {job.salaryRange.max.toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Tipo</span>
                  <span className="font-medium capitalize">
                    {job.employmentType.replace('-', ' ')}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Experiência</span>
                  <span className="font-medium capitalize">{job.experienceLevel}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Localização</span>
                  <span className="font-medium">{job.location}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Modalidade</span>
                  <span className="font-medium">
                    {job.remote ? 'Remoto' : 'Presencial'}
                  </span>
                </div>

                <Separator />

                <div className="space-y-3">
                  <Dialog open={showApplicationModal} onOpenChange={setShowApplicationModal}>
                    <DialogTrigger asChild>
                      <Button className="w-full" size="lg" disabled={applicationSent}>
                        {applicationSent ? (
                          <>
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Candidatura Enviada
                          </>
                        ) : (
                          'Candidatar-se'
                        )}
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Candidatar-se para {job.title}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Carta de Apresentação (Opcional)
                          </label>
                          <Textarea
                            placeholder="Conte um pouco sobre você e por que é o candidato ideal para esta vaga..."
                            value={coverLetter}
                            onChange={(e) => setCoverLetter(e.target.value)}
                            rows={6}
                          />
                        </div>
                        <div className="flex space-x-3">
                          <Button
                            variant="outline"
                            className="flex-1"
                            onClick={() => setShowApplicationModal(false)}
                          >
                            Cancelar
                          </Button>
                          <Button
                            className="flex-1"
                            onClick={handleApplication}
                          >
                            Enviar Candidatura
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Button variant="outline" className="w-full" asChild>
                    <Link href={`/employer/${job.employerId}`}>
                      Ver Empresa
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Vagas Relacionadas */}
            {relatedJobs.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Vagas Similares</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {relatedJobs.map((relatedJob) => (
                    <div key={relatedJob.id} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                      <Link href={`/jobs/${relatedJob.id}`} className="block">
                        <h4 className="font-medium text-gray-900 hover:text-blue-600 mb-1">
                          {relatedJob.title}
                        </h4>
                        <p className="text-gray-600 text-sm mb-2">
                          {relatedJob.employer?.companyName}
                        </p>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">{relatedJob.location}</span>
                          <span className="text-green-600 font-medium">
                            R$ {relatedJob.salaryRange.min.toLocaleString()}+
                          </span>
                        </div>
                      </Link>
                    </div>
                  ))}
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <Link href="/jobs">Ver Mais Vagas</Link>
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Tips Card */}
            <Card className="bg-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-900 flex items-center">
                  <Award className="h-5 w-5 mr-2" />
                  Dicas para sua Candidatura
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-blue-800">
                <p>• Revise seu perfil antes de se candidatar</p>
                <p>• Personalize sua carta de apresentação</p>
                <p>• Destaque experiências relevantes</p>
                <p>• Seja claro e objetivo</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
