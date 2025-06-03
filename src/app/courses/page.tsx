'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Search,
  Filter,
  Star,
  Clock,
  Users,
  GraduationCap,
  Play,
  BookOpen,
  Award,
  TrendingUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { mockCourses } from '@/data/mockData';

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    level: '',
    priceRange: '',
    duration: ''
  });
  const [sortBy, setSortBy] = useState('popularity');

  // Filtrar cursos baseado nos filtros
  const filteredCourses = mockCourses.filter(course => {
    if (searchQuery && !course.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !course.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !course.instructor.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    if (filters.category && course.category !== filters.category) {
      return false;
    }

    if (filters.level && course.level !== filters.level) {
      return false;
    }

    // Filtro de preço
    if (filters.priceRange) {
      const price = course.price;
      switch (filters.priceRange) {
        case 'free':
          if (price > 0) return false;
          break;
        case 'under-500':
          if (price >= 500) return false;
          break;
        case '500-1000':
          if (price < 500 || price > 1000) return false;
          break;
        case 'over-1000':
          if (price <= 1000) return false;
          break;
      }
    }

    // Filtro de duração
    if (filters.duration) {
      const duration = course.duration;
      switch (filters.duration) {
        case 'short':
          if (duration > 20) return false;
          break;
        case 'medium':
          if (duration < 20 || duration > 60) return false;
          break;
        case 'long':
          if (duration <= 60) return false;
          break;
      }
    }

    return true;
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const resetFilters = () => {
    setFilters({
      category: '',
      level: '',
      priceRange: '',
      duration: ''
    });
    setSearchQuery('');
  };

  const categories = ['Tecnologia', 'Marketing', 'Design', 'Negócios', 'Dados', 'Idiomas'];
  const levels = ['beginner', 'intermediate', 'advanced'];

  const CourseCard = ({ course }: { course: any }) => (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <div className="aspect-video relative overflow-hidden rounded-t-lg">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3">
          <Badge className="bg-black/70 text-white">
            {course.duration}h
          </Badge>
        </div>
        <div className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
          <Play className="h-12 w-12 text-white" />
        </div>
      </div>

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg hover:text-blue-600 cursor-pointer line-clamp-2">
              <Link href={`/courses/${course.id}`}>{course.title}</Link>
            </CardTitle>
            <p className="text-gray-600 text-sm mt-1">por {course.instructor}</p>
          </div>
          <Badge variant="outline" className="ml-2 capitalize">
            {course.level === 'beginner' ? 'Iniciante' :
             course.level === 'intermediate' ? 'Intermediário' : 'Avançado'}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-3">
          <p className="text-gray-600 text-sm line-clamp-2">{course.description}</p>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-3">
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-500 fill-current mr-1" />
                <span className="font-medium">{course.rating}</span>
              </div>
              <div className="flex items-center text-gray-500">
                <Users className="h-4 w-4 mr-1" />
                <span>{course.enrollmentCount}</span>
              </div>
            </div>
            <Badge variant="secondary">{course.category}</Badge>
          </div>

          <div className="flex flex-wrap gap-1">
            {course.tags.slice(0, 3).map((tag: string, index: number) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex items-center justify-between pt-2 border-t">
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-gray-900">
                {course.price === 0 ? 'Gratuito' : `R$ ${course.price.toLocaleString()}`}
              </span>
              {course.price > 0 && (
                <span className="text-xs text-gray-500">pagamento único</span>
              )}
            </div>
            <Button size="sm" asChild>
              <Link href={`/courses/${course.id}`}>
                Ver Curso
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const topCategories = [
    { name: 'Tecnologia', count: 25, icon: '💻', color: 'bg-blue-100 text-blue-800' },
    { name: 'Marketing', count: 18, icon: '📈', color: 'bg-purple-100 text-purple-800' },
    { name: 'Design', count: 15, icon: '🎨', color: 'bg-pink-100 text-pink-800' },
    { name: 'Negócios', count: 12, icon: '💼', color: 'bg-green-100 text-green-800' },
    { name: 'Dados', count: 10, icon: '📊', color: 'bg-orange-100 text-orange-800' },
    { name: 'Idiomas', count: 8, icon: '🌍', color: 'bg-indigo-100 text-indigo-800' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Desenvolva suas <span className="text-yellow-300">Habilidades</span>
            </h1>
            <p className="text-xl text-green-100 mb-8 max-w-3xl mx-auto">
              Cursos online de qualidade para impulsionar sua carreira profissional
            </p>

            {/* Pesquisa de Cursos */}
            <div className="max-w-2xl mx-auto">
              <form onSubmit={handleSearch}>
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Buscar cursos por título, instrutor ou habilidade..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-12 pl-12 pr-20 text-gray-900 bg-white border-0 rounded-lg"
                  />
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Button
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8"
                  >
                    Buscar
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Categorias Populares */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Categorias Populares</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {topCategories.map((category, index) => (
              <button
                key={index}
                onClick={() => setFilters({...filters, category: category.name})}
                className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow text-center"
              >
                <div className="text-2xl mb-2">{category.icon}</div>
                <h3 className="font-medium text-gray-900 mb-1">{category.name}</h3>
                <p className="text-sm text-gray-500">{category.count} cursos</p>
              </button>
            ))}
          </div>
        </section>

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

                {/* Nível */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nível
                  </label>
                  <Select value={filters.level} onValueChange={(value) => setFilters({...filters, level: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Todos os níveis" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Todos os níveis</SelectItem>
                      <SelectItem value="beginner">Iniciante</SelectItem>
                      <SelectItem value="intermediate">Intermediário</SelectItem>
                      <SelectItem value="advanced">Avançado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Preço */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preço
                  </label>
                  <Select value={filters.priceRange} onValueChange={(value) => setFilters({...filters, priceRange: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Qualquer preço" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Qualquer preço</SelectItem>
                      <SelectItem value="free">Gratuito</SelectItem>
                      <SelectItem value="under-500">Até R$ 500</SelectItem>
                      <SelectItem value="500-1000">R$ 500 - R$ 1.000</SelectItem>
                      <SelectItem value="over-1000">Acima de R$ 1.000</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Duração */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duração
                  </label>
                  <Select value={filters.duration} onValueChange={(value) => setFilters({...filters, duration: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Qualquer duração" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Qualquer duração</SelectItem>
                      <SelectItem value="short">Até 20 horas</SelectItem>
                      <SelectItem value="medium">20 - 60 horas</SelectItem>
                      <SelectItem value="long">Mais de 60 horas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Stats */}
              <div className="mt-8 pt-6 border-t space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <BookOpen className="h-4 w-4 mr-2" />
                  {mockCourses.length} cursos disponíveis
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Award className="h-4 w-4 mr-2" />
                  Certificados reconhecidos
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Conteúdo sempre atualizado
                </div>
              </div>
            </div>
          </div>

          {/* Lista de Cursos */}
          <div className="flex-1">
            {/* Header com contagem e ordenação */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <div className="flex items-center justify-between">
                <p className="text-gray-600">
                  <strong>{filteredCourses.length}</strong> cursos encontrados
                </p>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-500">Ordenar por:</span>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="popularity">Popularidade</SelectItem>
                      <SelectItem value="rating">Avaliação</SelectItem>
                      <SelectItem value="price-low">Menor Preço</SelectItem>
                      <SelectItem value="price-high">Maior Preço</SelectItem>
                      <SelectItem value="newest">Mais Recente</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Grade de Cursos */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.length > 0 ? (
                filteredCourses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <GraduationCap className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Nenhum curso encontrado
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

            {/* Paginação */}
            {filteredCourses.length > 0 && (
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
