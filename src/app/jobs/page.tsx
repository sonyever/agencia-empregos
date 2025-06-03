'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Search,
  Filter,
  MapPin,
  Briefcase,
  Calendar,
  DollarSign,
  Building,
  Clock,
  ChevronDown,
  SlidersHorizontal
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { mockJobs } from '@/data/mockData';

export default function JobsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    location: '',
    category: '',
    employmentType: '',
    experienceLevel: '',
    salaryRange: '',
    remote: ''
  });
  const [sortBy, setSortBy] = useState('relevance');
  const [showFilters, setShowFilters] = useState(false);

  // Filtrar vagas baseado nos filtros
  const filteredJobs = mockJobs.filter(job => {
    if (searchQuery && !job.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !job.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !job.employer?.companyName.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    if (filters.location && !job.location.toLowerCase().includes(filters.location.toLowerCase())) {
      return false;
    }

    if (filters.category && job.category !== filters.category) {
      return false;
    }

    if (filters.employmentType && job.employmentType !== filters.employmentType) {
      return false;
    }

    if (filters.experienceLevel && job.experienceLevel !== filters.experienceLevel) {
      return false;
    }

    if (filters.remote === 'remote' && !job.remote) {
      return false;
    }

    if (filters.remote === 'onsite' && job.remote) {
      return false;
    }

    return true;
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // A busca já é feita em tempo real através do filtro
  };

  const resetFilters = () => {
    setFilters({
      location: '',
      category: '',
      employmentType: '',
      experienceLevel: '',
      salaryRange: '',
      remote: ''
    });
    setSearchQuery('');
  };

  const categories = ['Tecnologia', 'Marketing', 'Vendas', 'Design', 'Administração', 'Finanças'];
  const employmentTypes = ['full-time', 'part-time', 'contract', 'freelance', 'internship'];
  const experienceLevels = ['entry', 'mid', 'senior', 'executive'];

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

          <Separator />

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span className="capitalize">{job.employmentType.replace('-', ' ')}</span>
              <span className="capitalize">{job.experienceLevel}</span>
            </div>
            <div className="flex space-x-2">
              <Button size="sm" variant="outline">
                Favoritar
              </Button>
              <Button size="sm" asChild>
                <Link href={`/jobs/${job.id}`}>Ver Vaga</Link>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Cabeçalho */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Vagas de Emprego</h1>
          <p className="text-gray-600">Encontre sua próxima oportunidade profissional</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar com Filtros */}
          <div className="lg:w-80">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Filtros</h2>
                <Button variant="ghost" size="sm" onClick={resetFilters}>
                  Limpar
                </Button>
              </div>

              <div className="space-y-6">
                {/* Busca */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Buscar
                  </label>
                  <form onSubmit={handleSearch}>
                    <div className="relative">
                      <Input
                        type="text"
                        placeholder="Cargo, empresa..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>
                  </form>
                </div>

                {/* Localização */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Localização
                  </label>
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="Cidade, estado..."
                      value={filters.location}
                      onChange={(e) => setFilters({...filters, location: e.target.value})}
                      className="pl-10"
                    />
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                </div>

                {/* Categoria */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Categoria
                  </label>
                  <Select value={filters.category} onValueChange={(value) => setFilters({...filters, category: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Todas as categorias" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Todas as categorias</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Tipo de Emprego */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo de Emprego
                  </label>
                  <Select value={filters.employmentType} onValueChange={(value) => setFilters({...filters, employmentType: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Todos os tipos" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Todos os tipos</SelectItem>
                      <SelectItem value="full-time">Tempo Integral</SelectItem>
                      <SelectItem value="part-time">Meio Período</SelectItem>
                      <SelectItem value="contract">Contrato</SelectItem>
                      <SelectItem value="freelance">Freelance</SelectItem>
                      <SelectItem value="internship">Estágio</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Nível de Experiência */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nível de Experiência
                  </label>
                  <Select value={filters.experienceLevel} onValueChange={(value) => setFilters({...filters, experienceLevel: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Todos os níveis" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Todos os níveis</SelectItem>
                      <SelectItem value="entry">Júnior</SelectItem>
                      <SelectItem value="mid">Pleno</SelectItem>
                      <SelectItem value="senior">Sênior</SelectItem>
                      <SelectItem value="executive">Executivo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Modalidade */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Modalidade
                  </label>
                  <Select value={filters.remote} onValueChange={(value) => setFilters({...filters, remote: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Todas as modalidades" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Todas as modalidades</SelectItem>
                      <SelectItem value="remote">Remoto</SelectItem>
                      <SelectItem value="onsite">Presencial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          {/* Lista de Vagas */}
          <div className="flex-1">
            {/* Header com contagem e ordenação */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <div className="flex items-center justify-between">
                <p className="text-gray-600">
                  <strong>{filteredJobs.length}</strong> vagas encontradas
                </p>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-500">Ordenar por:</span>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="relevance">Relevância</SelectItem>
                      <SelectItem value="date">Data</SelectItem>
                      <SelectItem value="salary">Salário</SelectItem>
                      <SelectItem value="company">Empresa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Lista de Vagas */}
            <div className="space-y-4">
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))
              ) : (
                <div className="text-center py-12">
                  <Briefcase className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Nenhuma vaga encontrada
                  </h3>
                  <p className="text-gray-500 mb-4">
                    Tente ajustar os filtros ou usar termos diferentes
                  </p>
                  <Button onClick={resetFilters}>
                    Limpar Filtros
                  </Button>
                </div>
              )}
            </div>

            {/* Paginação (placeholder) */}
            {filteredJobs.length > 0 && (
              <div className="flex justify-center mt-8">
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" disabled>
                    Anterior
                  </Button>
                  <Button variant="default" size="sm">1</Button>
                  <Button variant="outline" size="sm">2</Button>
                  <Button variant="outline" size="sm">3</Button>
                  <Button variant="outline" size="sm">
                    Próximo
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
