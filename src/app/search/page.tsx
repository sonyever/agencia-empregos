'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  Search,
  Filter,
  MapPin,
  Briefcase,
  User,
  GraduationCap,
  Calendar,
  DollarSign,
  Building,
  Star,
  Clock,
  ChevronDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { searchMockData } from '@/data/mockData';

function SearchResults() {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState<'all' | 'jobs' | 'candidates' | 'courses'>('all');
  const [results, setResults] = useState<any>({ jobs: [], candidates: [], courses: [] });
  const [filters, setFilters] = useState({
    location: '',
    salaryRange: '',
    employmentType: '',
    experienceLevel: '',
    category: ''
  });

  useEffect(() => {
    const query = searchParams.get('q') || '';
    const type = (searchParams.get('type') as any) || 'all';

    setSearchQuery(query);
    setSearchType(type);

    if (query) {
      const searchResults = searchMockData(query, type === 'all' ? undefined : type);
      setResults(searchResults);
    }
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const params = new URLSearchParams({
        q: searchQuery,
        ...(searchType !== 'all' && { type: searchType })
      });
      window.history.pushState({}, '', `/search?${params.toString()}`);

      const searchResults = searchMockData(searchQuery, searchType === 'all' ? undefined : searchType);
      setResults(searchResults);
    }
  };

  const totalResults = results.jobs.length + results.candidates.length + results.courses.length;

  const JobCard = ({ job }: { job: any }) => (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg hover:text-blue-600 cursor-pointer">
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
            <div className="flex items-center">
              <DollarSign className="h-4 w-4 mr-1" />
              R$ {job.salaryRange.min.toLocaleString()} - R$ {job.salaryRange.max.toLocaleString()}
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              {new Date(job.createdAt).toLocaleDateString('pt-BR')}
            </div>
          </div>

          <div className="flex flex-wrap gap-1">
            {job.tags.slice(0, 4).map((tag: string, index: number) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-sm text-gray-500 capitalize">{job.employmentType}</span>
            <Button size="sm" asChild>
              <Link href={`/jobs/${job.id}`}>Ver Detalhes</Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const CandidateCard = ({ candidate }: { candidate: any }) => (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader>
        <div className="flex items-start space-x-4">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
            {candidate.profilePicture ? (
              <img
                src={candidate.profilePicture}
                alt={`${candidate.firstName} ${candidate.lastName}`}
                className="w-16 h-16 rounded-full object-cover"
              />
            ) : (
              <User className="h-8 w-8 text-gray-400" />
            )}
          </div>
          <div className="flex-1">
            <CardTitle className="text-lg">
              {candidate.firstName} {candidate.lastName}
            </CardTitle>
            <p className="text-gray-600">{candidate.experience[0]?.position || 'Profissional'}</p>
            <p className="text-gray-500 text-sm flex items-center mt-1">
              <MapPin className="h-4 w-4 mr-1" />
              {candidate.address.city}, {candidate.address.state}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {candidate.bio && (
            <p className="text-gray-600 text-sm line-clamp-2">{candidate.bio}</p>
          )}

          <div className="flex flex-wrap gap-1">
            {candidate.skills.slice(0, 5).map((skill: string, index: number) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-sm text-gray-500">
              {candidate.experience.length} experiência(s)
            </span>
            <Button size="sm" variant="outline">
              Ver Perfil
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const CourseCard = ({ course }: { course: any }) => (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <div className="aspect-video bg-gray-200">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-full object-cover rounded-t-lg"
        />
      </div>
      <CardHeader>
        <CardTitle className="text-lg hover:text-blue-600 cursor-pointer">
          <Link href={`/courses/${course.id}`}>{course.title}</Link>
        </CardTitle>
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
            <span className="text-xl font-bold text-gray-900">
              R$ {course.price.toLocaleString()}
            </span>
            <div className="flex items-center text-gray-500 text-sm">
              <Clock className="h-4 w-4 mr-1" />
              {course.duration}h
            </div>
          </div>

          <Button size="sm" className="w-full" asChild>
            <Link href={`/courses/${course.id}`}>Ver Curso</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Barra de Pesquisa */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="flex flex-wrap gap-2 mb-4">
              {(['all', 'jobs', 'candidates', 'courses'] as const).map((type) => (
                <Button
                  key={type}
                  type="button"
                  variant={searchType === type ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSearchType(type)}
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
                placeholder="Digite sua busca..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-20"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Button
                type="submit"
                size="sm"
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
              >
                Buscar
              </Button>
            </div>
          </form>

          {searchQuery && (
            <div className="mt-4 flex items-center justify-between">
              <p className="text-gray-600">
                <strong>{totalResults}</strong> resultados encontrados para "{searchQuery}"
              </p>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filtros
              </Button>
            </div>
          )}
        </div>

        {/* Resultados */}
        {searchQuery ? (
          <Tabs value={searchType} onValueChange={(value) => setSearchType(value as any)}>
            <TabsList className="mb-6">
              <TabsTrigger value="all">
                Todos ({totalResults})
              </TabsTrigger>
              <TabsTrigger value="jobs">
                Vagas ({results.jobs.length})
              </TabsTrigger>
              <TabsTrigger value="candidates">
                Candidatos ({results.candidates.length})
              </TabsTrigger>
              <TabsTrigger value="courses">
                Cursos ({results.courses.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-8">
              {results.jobs.length > 0 && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <Briefcase className="h-5 w-5 mr-2" />
                    Vagas ({results.jobs.length})
                  </h2>
                  <div className="grid lg:grid-cols-2 gap-6">
                    {results.jobs.slice(0, 4).map((job: any) => (
                      <JobCard key={job.id} job={job} />
                    ))}
                  </div>
                  {results.jobs.length > 4 && (
                    <div className="text-center mt-4">
                      <Button variant="outline" onClick={() => setSearchType('jobs')}>
                        Ver todas as {results.jobs.length} vagas
                      </Button>
                    </div>
                  )}
                </div>
              )}

              {results.candidates.length > 0 && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    Candidatos ({results.candidates.length})
                  </h2>
                  <div className="grid lg:grid-cols-2 gap-6">
                    {results.candidates.slice(0, 4).map((candidate: any) => (
                      <CandidateCard key={candidate.id} candidate={candidate} />
                    ))}
                  </div>
                  {results.candidates.length > 4 && (
                    <div className="text-center mt-4">
                      <Button variant="outline" onClick={() => setSearchType('candidates')}>
                        Ver todos os {results.candidates.length} candidatos
                      </Button>
                    </div>
                  )}
                </div>
              )}

              {results.courses.length > 0 && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <GraduationCap className="h-5 w-5 mr-2" />
                    Cursos ({results.courses.length})
                  </h2>
                  <div className="grid lg:grid-cols-3 gap-6">
                    {results.courses.slice(0, 3).map((course: any) => (
                      <CourseCard key={course.id} course={course} />
                    ))}
                  </div>
                  {results.courses.length > 3 && (
                    <div className="text-center mt-4">
                      <Button variant="outline" onClick={() => setSearchType('courses')}>
                        Ver todos os {results.courses.length} cursos
                      </Button>
                    </div>
                  )}
                </div>
              )}

              {totalResults === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">
                    Nenhum resultado encontrado para "{searchQuery}"
                  </p>
                  <p className="text-gray-400 mt-2">
                    Tente usar termos diferentes ou verificar a ortografia
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="jobs">
              <div className="grid lg:grid-cols-2 gap-6">
                {results.jobs.map((job: any) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
              {results.jobs.length === 0 && (
                <div className="text-center py-12">
                  <Briefcase className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">Nenhuma vaga encontrada</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="candidates">
              <div className="grid lg:grid-cols-2 gap-6">
                {results.candidates.map((candidate: any) => (
                  <CandidateCard key={candidate.id} candidate={candidate} />
                ))}
              </div>
              {results.candidates.length === 0 && (
                <div className="text-center py-12">
                  <User className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">Nenhum candidato encontrado</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="courses">
              <div className="grid lg:grid-cols-3 gap-6">
                {results.courses.map((course: any) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
              {results.courses.length === 0 && (
                <div className="text-center py-12">
                  <GraduationCap className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">Nenhum curso encontrado</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        ) : (
          <div className="text-center py-12">
            <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Faça uma busca
            </h2>
            <p className="text-gray-500">
              Digite algo no campo de busca para encontrar vagas, candidatos ou cursos
            </p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">Carregando...</div>
        </div>
        <Footer />
      </div>
    }>
      <SearchResults />
    </Suspense>
  );
}
