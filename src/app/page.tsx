'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Search,
  Briefcase,
  User,
  GraduationCap,
  TrendingUp,
  Award,
  Users,
  Building,
  ArrowRight,
  Star,
  CheckCircle,
  Target,
  Zap,
  Shield
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { mockJobs, mockCourses, mockAnalytics } from '@/data/mockData';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState<'all' | 'jobs' | 'candidates' | 'courses'>('all');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const params = new URLSearchParams({
        q: searchQuery,
        ...(searchType !== 'all' && { type: searchType })
      });
      window.location.href = `/search?${params.toString()}`;
    }
  };

  const searchSuggestions = [
    'Desenvolvedor React',
    'Marketing Digital',
    'Analista de Dados',
    'Designer UX/UI',
    'Vendedor',
    'Programador Python'
  ];

  const featuredJobs = mockJobs.slice(0, 3);
  const featuredCourses = mockCourses.slice(0, 3);

  const stats = [
    { icon: Briefcase, label: 'Vagas Ativas', value: mockAnalytics.totalJobs.toLocaleString() },
    { icon: User, label: 'Candidatos', value: mockAnalytics.totalCandidates.toLocaleString() },
    { icon: Building, label: 'Empresas', value: mockAnalytics.totalEmployers.toLocaleString() },
    { icon: GraduationCap, label: 'Cursos', value: mockAnalytics.totalCourses.toLocaleString() }
  ];

  const features = [
    {
      icon: Target,
      title: 'Match Inteligente',
      description: 'Nossa IA conecta candidatos e vagas com alta compatibilidade'
    },
    {
      icon: Zap,
      title: 'Processo Ágil',
      description: 'Candidaturas e contratações mais rápidas e eficientes'
    },
    {
      icon: Shield,
      title: 'Segurança Total',
      description: 'Seus dados protegidos com a melhor tecnologia de segurança'
    }
  ];

  const testimonials = [
    {
      name: 'Maria Silva',
      role: 'Desenvolvedora Frontend',
      company: 'TechCorp',
      content: 'Encontrei minha vaga dos sonhos em apenas 2 semanas. A plataforma é incrível!',
      rating: 5
    },
    {
      name: 'João Santos',
      role: 'Gerente de RH',
      company: 'InnovaGroup',
      content: 'Conseguimos contratar os melhores talentos de forma rápida e eficiente.',
      rating: 5
    },
    {
      name: 'Ana Costa',
      role: 'Marketing Manager',
      company: 'StartupX',
      content: 'Os cursos me ajudaram a conseguir uma promoção. Recomendo para todos!',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Conectamos <span className="text-yellow-300">Talentos</span> e{' '}
              <span className="text-yellow-300">Oportunidades</span>
            </h1>
            <p className="text-xl lg:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto">
              A plataforma completa para candidatos, empregadores e cursos profissionalizantes.
              Sua próxima oportunidade está aqui!
            </p>

            {/* Pesquisa Unificada */}
            <div className="max-w-4xl mx-auto">
              <form onSubmit={handleSearch} className="space-y-4">
                <div className="flex flex-wrap justify-center gap-2 mb-4">
                  {(['all', 'jobs', 'candidates', 'courses'] as const).map((type) => (
                    <Button
                      key={type}
                      type="button"
                      variant={searchType === type ? 'secondary' : 'outline'}
                      size="sm"
                      onClick={() => setSearchType(type)}
                      className={searchType === type ? 'bg-white text-blue-600' : 'border-white text-white hover:bg-white hover:text-blue-600'}
                    >
                      {type === 'all' ? 'Tudo' :
                       type === 'jobs' ? 'Vagas' :
                       type === 'candidates' ? 'Candidatos' : 'Cursos'}
                    </Button>
                  ))}
                </div>

                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Digite sua busca: cargo, empresa, habilidade ou curso..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-14 pl-6 pr-32 text-lg border-0 rounded-xl bg-white text-gray-900 placeholder-gray-500 focus:ring-4 focus:ring-white/20"
                  />
                  <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" />
                  <Button
                    type="submit"
                    size="lg"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-10 bg-blue-600 hover:bg-blue-700"
                  >
                    Buscar
                  </Button>
                </div>
              </form>

              {/* Sugestões de Busca */}
              <div className="mt-6">
                <p className="text-blue-100 mb-3">Sugestões populares:</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {searchSuggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => setSearchQuery(suggestion)}
                      className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full text-sm transition-all duration-200 backdrop-blur-sm"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Estatísticas */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                  <stat.icon className="h-8 w-8 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Áreas Principais */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Três Caminhos para o Sucesso
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Escolha sua jornada e descubra como podemos ajudar você a alcançar seus objetivos profissionais
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Empregados */}
            <Card className="relative overflow-hidden group hover:shadow-2xl transition-all duration-300 border-0 bg-gradient-to-br from-blue-50 to-blue-100">
              <CardHeader className="text-center pb-6">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
                  <User className="h-10 w-10 text-white" />
                </div>
                <CardTitle className="text-2xl text-gray-900">Para Candidatos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600 text-center mb-6">
                  Encontre sua vaga ideal e construa a carreira dos seus sonhos
                </p>
                <ul className="space-y-3">
                  {[
                    'Perfil profissional completo',
                    'Busca inteligente de vagas',
                    'Candidaturas com um clique',
                    'Recomendações personalizadas',
                    'Acompanhamento de aplicações'
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-blue-600" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button asChild className="w-full mt-6 bg-blue-600 hover:bg-blue-700">
                  <Link href="/candidate/register">
                    Criar Perfil <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Empregadores */}
            <Card className="relative overflow-hidden group hover:shadow-2xl transition-all duration-300 border-0 bg-gradient-to-br from-purple-50 to-purple-100">
              <CardHeader className="text-center pb-6">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-purple-600 rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Briefcase className="h-10 w-10 text-white" />
                </div>
                <CardTitle className="text-2xl text-gray-900">Para Empregadores</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600 text-center mb-6">
                  Encontre os melhores talentos para sua empresa
                </p>
                <ul className="space-y-3">
                  {[
                    'Publicação de vagas gratuita',
                    'Busca avançada de candidatos',
                    'Gestão de processos seletivos',
                    'Relatórios e analytics',
                    'Suporte especializado'
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-purple-600" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button asChild className="w-full mt-6 bg-purple-600 hover:bg-purple-700">
                  <Link href="/employer/register">
                    Cadastrar Empresa <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Cursos */}
            <Card className="relative overflow-hidden group hover:shadow-2xl transition-all duration-300 border-0 bg-gradient-to-br from-green-50 to-green-100">
              <CardHeader className="text-center pb-6">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-green-600 rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
                  <GraduationCap className="h-10 w-10 text-white" />
                </div>
                <CardTitle className="text-2xl text-gray-900">Cursos Online</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600 text-center mb-6">
                  Desenvolva suas habilidades e conquiste novas oportunidades
                </p>
                <ul className="space-y-3">
                  {[
                    'Cursos certificados',
                    'Professores especialistas',
                    'Conteúdo sempre atualizado',
                    'Certificado reconhecido',
                    'Suporte durante o curso'
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button asChild className="w-full mt-6 bg-green-600 hover:bg-green-700">
                  <Link href="/courses">
                    Ver Cursos <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Vagas em Destaque */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Vagas em Destaque</h2>
              <p className="text-gray-600">Oportunidades selecionadas para você</p>
            </div>
            <Button asChild variant="outline">
              <Link href="/jobs">Ver Todas as Vagas</Link>
            </Button>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {featuredJobs.map((job) => (
              <Card key={job.id} className="hover:shadow-lg transition-shadow duration-200">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{job.title}</CardTitle>
                      <p className="text-gray-600">{job.employer?.companyName}</p>
                    </div>
                    <Badge variant={job.remote ? "secondary" : "outline"}>
                      {job.remote ? 'Remoto' : 'Presencial'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-gray-600 text-sm line-clamp-2">{job.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-green-600 font-semibold">
                        R$ {job.salaryRange.min.toLocaleString()} - R$ {job.salaryRange.max.toLocaleString()}
                      </span>
                      <span className="text-gray-500 text-sm">{job.location}</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {job.tags.slice(0, 3).map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Cursos Populares */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Cursos Populares</h2>
              <p className="text-gray-600">Desenvolva suas habilidades com nossos cursos</p>
            </div>
            <Button asChild variant="outline">
              <Link href="/courses">Ver Todos os Cursos</Link>
            </Button>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {featuredCourses.map((course) => (
              <Card key={course.id} className="hover:shadow-lg transition-shadow duration-200">
                <div className="aspect-video bg-gray-200 rounded-t-lg">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover rounded-t-lg"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">{course.title}</CardTitle>
                  <p className="text-gray-600 text-sm">por {course.instructor}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-gray-600 text-sm line-clamp-2">{course.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium">{course.rating}</span>
                        <span className="text-gray-500 text-sm">({course.enrollmentCount})</span>
                      </div>
                      <Badge className="capitalize">{course.level}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-gray-900">
                        R$ {course.price.toLocaleString()}
                      </span>
                      <span className="text-gray-500 text-sm">{course.duration}h</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Por que escolher a AgênciaEmpregos?
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Tecnologia de ponta e experiência humana para conectar talentos e oportunidades
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-6">
                  <feature.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-blue-100">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">O que nossos usuários dizem</h2>
            <p className="text-gray-600">Histórias reais de sucesso na nossa plataforma</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-8">
                  <div className="flex justify-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-500 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6 italic">"{testimonial.content}"</p>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                    <p className="text-gray-500 text-sm">{testimonial.company}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Pronto para dar o próximo passo?
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            Junte-se a milhares de profissionais que já encontraram sucesso na nossa plataforma
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Link href="/candidate/register">Sou Candidato</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900">
              <Link href="/employer/register">Sou Empregador</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
