'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  Play,
  Clock,
  Users,
  Star,
  Calendar,
  Award,
  CheckCircle,
  ArrowLeft,
  BookOpen,
  Download,
  Globe,
  Share2,
  Heart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { mockCourses, mockJobs } from '@/data/mockData';

export default function CourseDetailPage() {
  const params = useParams();
  const courseId = params.id as string;
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [enrollmentSuccess, setEnrollmentSuccess] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  // Encontrar o curso pelos dados mock
  const course = mockCourses.find(c => c.id === courseId);

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Curso não encontrado</h1>
            <p className="text-gray-600 mb-6">O curso que você procura não existe ou foi removido.</p>
            <Button asChild>
              <Link href="/courses">Ver Todos os Cursos</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const handleEnrollment = () => {
    setIsEnrolled(true);
    setEnrollmentSuccess(true);
  };

  // Vagas relacionadas baseadas nas tags do curso
  const relatedJobs = mockJobs.filter(job =>
    job.tags.some(tag => course.tags.includes(tag))
  ).slice(0, 3);

  const otherCourses = mockCourses.filter(c =>
    c.id !== course.id && c.category === course.category
  ).slice(0, 3);

  const reviews = [
    {
      id: '1',
      studentName: 'Maria Santos',
      rating: 5,
      comment: 'Curso excelente! O instrutor explica muito bem e o conteúdo é super atualizado.',
      date: '2024-11-15'
    },
    {
      id: '2',
      studentName: 'João Silva',
      rating: 4,
      comment: 'Muito bom curso, aprendi bastante. Recomendo para quem está começando.',
      date: '2024-11-10'
    },
    {
      id: '3',
      studentName: 'Ana Costa',
      rating: 5,
      comment: 'Conteúdo de alta qualidade e projeto prático muito útil!',
      date: '2024-11-08'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header isLoggedIn={true} userType="student" userName="Carlos Santos" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link href="/courses" className="flex items-center text-blue-600 hover:text-blue-700">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar para cursos
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Conteúdo Principal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header do Curso */}
            <Card>
              <div className="aspect-video relative">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-full object-cover rounded-t-lg"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <Button size="lg" className="rounded-full w-16 h-16">
                    <Play className="h-8 w-8" />
                  </Button>
                </div>
                <div className="absolute top-4 left-4">
                  <Badge className="bg-black/70 text-white">
                    Preview Gratuito
                  </Badge>
                </div>
              </div>

              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-2xl text-gray-900 mb-2">
                      {course.title}
                    </CardTitle>
                    <p className="text-gray-600 mb-4">{course.description}</p>

                    <div className="flex items-center space-x-6 text-sm text-gray-600 mb-4">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {course.duration} horas
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {course.enrollmentCount} alunos
                      </div>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 mr-1 text-yellow-500 fill-current" />
                        {course.rating} ({reviews.length} avaliações)
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        Atualizado em Nov 2024
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 mb-4">
                      <span className="text-gray-600">Instrutor:</span>
                      <span className="font-medium text-gray-900">{course.instructor}</span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="capitalize">
                        {course.level === 'beginner' ? 'Iniciante' :
                         course.level === 'intermediate' ? 'Intermediário' : 'Avançado'}
                      </Badge>
                      <Badge variant="secondary">{course.category}</Badge>
                      {course.tags.slice(0, 3).map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
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

            {/* Alert de matrícula realizada */}
            {enrollmentSuccess && (
              <Alert className="border-green-200 bg-green-50">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  Matrícula realizada com sucesso! Você já pode começar a estudar.
                </AlertDescription>
              </Alert>
            )}

            {/* Conteúdo do Curso */}
            <Tabs defaultValue="curriculum" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="curriculum">Conteúdo</TabsTrigger>
                <TabsTrigger value="instructor">Instrutor</TabsTrigger>
                <TabsTrigger value="reviews">Avaliações</TabsTrigger>
                <TabsTrigger value="related">Relacionados</TabsTrigger>
              </TabsList>

              <TabsContent value="curriculum" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Conteúdo Programático</CardTitle>
                    <p className="text-gray-600">
                      {course.curriculum.length} aulas • {course.duration} horas totais
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {course.curriculum.map((lesson, index) => (
                        <div key={lesson.id} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-medium text-blue-600">
                                {lesson.order}
                              </div>
                              <div>
                                <h4 className="font-medium text-gray-900">{lesson.title}</h4>
                                <p className="text-gray-600 text-sm">{lesson.description}</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <div className="flex items-center">
                                <Clock className="h-4 w-4 mr-1" />
                                {lesson.duration} min
                              </div>
                              {lesson.materials.length > 0 && (
                                <div className="flex items-center">
                                  <Download className="h-4 w-4 mr-1" />
                                  {lesson.materials.length} arquivos
                                </div>
                              )}
                              {index === 0 && (
                                <Badge variant="secondary" className="text-xs">
                                  Preview
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}

                      {/* Placeholder para mais aulas */}
                      <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 text-center">
                        <p className="text-gray-500">+ 15 aulas adicionais disponíveis após matrícula</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="instructor">
                <Card>
                  <CardHeader>
                    <CardTitle>Sobre o Instrutor</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-start space-x-4">
                      <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-xl font-bold text-gray-600">
                          {course.instructor.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {course.instructor}
                        </h3>
                        <p className="text-gray-600 mb-4">
                          Especialista em {course.category} com mais de 10 anos de experiência.
                          Já treinou mais de 5.000 profissionais e tem vasta experiência em projetos reais.
                        </p>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium">Cursos:</span> 12
                          </div>
                          <div>
                            <span className="font-medium">Alunos:</span> 15.430
                          </div>
                          <div>
                            <span className="font-medium">Avaliação:</span> 4.8 ⭐
                          </div>
                          <div>
                            <span className="font-medium">Experiência:</span> 10+ anos
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews">
                <Card>
                  <CardHeader>
                    <CardTitle>Avaliações dos Alunos</CardTitle>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <Star className="h-5 w-5 text-yellow-500 fill-current mr-1" />
                        <span className="text-xl font-bold">{course.rating}</span>
                      </div>
                      <span className="text-gray-600">({reviews.length} avaliações)</span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {reviews.map((review) => (
                      <div key={review.id} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                        <div className="flex items-start space-x-3">
                          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium text-gray-600">
                              {review.studentName.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="font-medium text-gray-900">{review.studentName}</span>
                              <div className="flex">
                                {[...Array(review.rating)].map((_, i) => (
                                  <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                                ))}
                              </div>
                              <span className="text-gray-500 text-sm">
                                {new Date(review.date).toLocaleDateString('pt-BR')}
                              </span>
                            </div>
                            <p className="text-gray-700">{review.comment}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="related" className="space-y-6">
                {relatedJobs.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Vagas Relacionadas</CardTitle>
                      <p className="text-gray-600">
                        Oportunidades que valorizam as habilidades deste curso
                      </p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {relatedJobs.map((job) => (
                        <div key={job.id} className="border rounded-lg p-4">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-medium text-gray-900 hover:text-blue-600">
                                <Link href={`/jobs/${job.id}`}>{job.title}</Link>
                              </h4>
                              <p className="text-gray-600 text-sm">{job.employer?.companyName}</p>
                              <p className="text-green-600 font-medium text-sm">
                                R$ {job.salaryRange.min.toLocaleString()} - R$ {job.salaryRange.max.toLocaleString()}
                              </p>
                            </div>
                            <Button size="sm" variant="outline" asChild>
                              <Link href={`/jobs/${job.id}`}>Ver Vaga</Link>
                            </Button>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                )}

                <Card>
                  <CardHeader>
                    <CardTitle>Outros Cursos de {course.category}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {otherCourses.map((otherCourse) => (
                      <div key={otherCourse.id} className="flex items-center space-x-4 border rounded-lg p-4">
                        <img
                          src={otherCourse.thumbnail}
                          alt={otherCourse.title}
                          className="w-16 h-16 rounded object-cover"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 hover:text-blue-600">
                            <Link href={`/courses/${otherCourse.id}`}>{otherCourse.title}</Link>
                          </h4>
                          <p className="text-gray-600 text-sm">por {otherCourse.instructor}</p>
                          <div className="flex items-center space-x-2 text-sm">
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            <span>{otherCourse.rating}</span>
                            <span className="text-gray-500">•</span>
                            <span className="text-gray-500">{otherCourse.duration}h</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-gray-900">
                            R$ {otherCourse.price.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Card de Matrícula */}
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {course.price === 0 ? 'Gratuito' : `R$ ${course.price.toLocaleString()}`}
                  </div>
                  {course.price > 0 && (
                    <p className="text-gray-600 text-sm">Pagamento único • Acesso vitalício</p>
                  )}
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Duração total</span>
                    <span className="font-medium">{course.duration} horas</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Aulas</span>
                    <span className="font-medium">{course.curriculum.length}+ aulas</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Nível</span>
                    <span className="font-medium capitalize">
                      {course.level === 'beginner' ? 'Iniciante' :
                       course.level === 'intermediate' ? 'Intermediário' : 'Avançado'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Idioma</span>
                    <span className="font-medium">Português</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Certificado</span>
                    <span className="font-medium">Incluído</span>
                  </div>
                </div>

                <div className="space-y-3">
                  {!isEnrolled ? (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="w-full" size="lg">
                          {course.price === 0 ? 'Matricular-se Grátis' : 'Comprar Curso'}
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Confirmar Matrícula</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="border rounded-lg p-4">
                            <h3 className="font-semibold">{course.title}</h3>
                            <p className="text-gray-600 text-sm">por {course.instructor}</p>
                            <div className="text-xl font-bold text-gray-900 mt-2">
                              {course.price === 0 ? 'Gratuito' : `R$ ${course.price.toLocaleString()}`}
                            </div>
                          </div>
                          <div className="flex space-x-3">
                            <Button
                              variant="outline"
                              className="flex-1"
                            >
                              Cancelar
                            </Button>
                            <Button
                              className="flex-1"
                              onClick={handleEnrollment}
                            >
                              Confirmar
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  ) : (
                    <Button className="w-full" size="lg">
                      <Play className="h-4 w-4 mr-2" />
                      Continuar Estudando
                    </Button>
                  )}

                  <Button variant="outline" className="w-full">
                    Adicionar à Lista de Desejos
                  </Button>
                </div>

                <div className="mt-6 pt-6 border-t">
                  <h4 className="font-semibold text-gray-900 mb-3">Este curso inclui:</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      {course.duration} horas de vídeo
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Materiais para download
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Acesso vitalício
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Certificado de conclusão
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Suporte do instrutor
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Garantia */}
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4 text-center">
                <Award className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <h3 className="font-semibold text-green-900 mb-1">
                  Garantia de 30 dias
                </h3>
                <p className="text-green-700 text-sm">
                  Devolução total do investimento se não ficar satisfeito
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
