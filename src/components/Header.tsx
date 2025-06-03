'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Menu, X, User, Briefcase, GraduationCap, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface HeaderProps {
  isLoggedIn?: boolean;
  userType?: 'candidate' | 'employer' | 'student' | 'admin';
  userName?: string;
  notificationCount?: number;
}

export default function Header({
  isLoggedIn = false,
  userType = 'candidate',
  userName = 'Usuário',
  notificationCount = 0
}: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Redirecionar para página de resultados
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  const navigationItems = [
    { label: 'Vagas', href: '/jobs', icon: Briefcase },
    { label: 'Candidatos', href: '/candidates', icon: User },
    { label: 'Cursos', href: '/courses', icon: GraduationCap },
    { label: 'Blog', href: '/blog', icon: null },
  ];

  const getDashboardUrl = () => {
    switch (userType) {
      case 'employer': return '/employer/dashboard';
      case 'student': return '/student/dashboard';
      case 'admin': return '/admin/dashboard';
      default: return '/candidate/dashboard';
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">AE</span>
              </div>
              <span className="font-bold text-xl text-gray-900">AgênciaEmpregos</span>
            </Link>
          </div>

          {/* Barra de Pesquisa - Desktop */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Buscar vagas, candidatos ou cursos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-sm border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Button
                  type="submit"
                  size="sm"
                  className="absolute right-1 top-1/2 transform -translate-y-1/2"
                >
                  Buscar
                </Button>
              </div>
            </form>
          </div>

          {/* Navegação - Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Área do Usuário - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                {/* Notificações */}
                <div className="relative">
                  <Button variant="ghost" size="sm" className="relative p-2">
                    <Bell className="h-5 w-5" />
                    {notificationCount > 0 && (
                      <Badge className="absolute -top-1 -right-1 px-1 min-w-5 h-5 text-xs">
                        {notificationCount > 9 ? '9+' : notificationCount}
                      </Badge>
                    )}
                  </Button>
                </div>

                {/* Menu do Usuário */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src="" alt={userName} />
                        <AvatarFallback>
                          {userName.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <div className="flex flex-col space-y-1 p-2">
                      <p className="text-sm font-medium leading-none">{userName}</p>
                      <p className="text-xs leading-none text-muted-foreground capitalize">
                        {userType === 'candidate' ? 'Candidato' :
                         userType === 'employer' ? 'Empregador' :
                         userType === 'student' ? 'Aluno' : 'Administrador'}
                      </p>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href={getDashboardUrl()}>Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/profile">Meu Perfil</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/settings">Configurações</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      Sair
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" asChild>
                  <Link href="/login">Entrar</Link>
                </Button>
                <Button asChild>
                  <Link href="/register">Cadastrar</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Menu Mobile */}
          <div className="md:hidden">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="p-2">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col space-y-4 mt-8">
                  {/* Pesquisa Mobile */}
                  <form onSubmit={handleSearch}>
                    <div className="relative">
                      <Input
                        type="text"
                        placeholder="Buscar..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10"
                      />
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>
                  </form>

                  {/* Navegação Mobile */}
                  <nav className="flex flex-col space-y-2">
                    {navigationItems.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.icon && <item.icon className="h-5 w-5" />}
                        <span>{item.label}</span>
                      </Link>
                    ))}
                  </nav>

                  {/* Área do Usuário Mobile */}
                  <div className="border-t pt-4">
                    {isLoggedIn ? (
                      <div className="space-y-2">
                        <div className="flex items-center space-x-3 p-3">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback>
                              {userName.split(' ').map(n => n[0]).join('').toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{userName}</p>
                            <p className="text-sm text-gray-500 capitalize">
                              {userType === 'candidate' ? 'Candidato' :
                               userType === 'employer' ? 'Empregador' :
                               userType === 'student' ? 'Aluno' : 'Administrador'}
                            </p>
                          </div>
                        </div>
                        <Link
                          href={getDashboardUrl()}
                          className="block p-3 rounded-lg hover:bg-gray-100 transition-colors"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Dashboard
                        </Link>
                        <Link
                          href="/profile"
                          className="block p-3 rounded-lg hover:bg-gray-100 transition-colors"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Meu Perfil
                        </Link>
                        <button className="w-full text-left p-3 rounded-lg hover:bg-gray-100 transition-colors text-red-600">
                          Sair
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Button asChild className="w-full">
                          <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                            Entrar
                          </Link>
                        </Button>
                        <Button variant="outline" asChild className="w-full">
                          <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
                            Cadastrar
                          </Link>
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
