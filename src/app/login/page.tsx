'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff, User, Briefcase, GraduationCap, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    userType: 'candidate' as 'candidate' | 'employer' | 'student' | 'admin'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simular login
    setTimeout(() => {
      setIsLoading(false);

      // Redirecionar baseado no tipo de usuário
      switch (loginData.userType) {
        case 'candidate':
          window.location.href = '/candidate/dashboard';
          break;
        case 'employer':
          window.location.href = '/employer/dashboard';
          break;
        case 'student':
          window.location.href = '/student/dashboard';
          break;
        case 'admin':
          window.location.href = '/admin/dashboard';
          break;
        default:
          window.location.href = '/';
      }
    }, 1500);
  };

  const userTypes = [
    {
      id: 'candidate',
      label: 'Candidato',
      description: 'Buscar vagas e oportunidades',
      icon: User,
      color: 'text-blue-600'
    },
    {
      id: 'employer',
      label: 'Empregador',
      description: 'Publicar vagas e buscar talentos',
      icon: Briefcase,
      color: 'text-purple-600'
    },
    {
      id: 'student',
      label: 'Aluno',
      description: 'Fazer cursos e obter certificados',
      icon: GraduationCap,
      color: 'text-green-600'
    },
    {
      id: 'admin',
      label: 'Administrador',
      description: 'Gerenciar a plataforma',
      icon: Shield,
      color: 'text-red-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">AE</span>
            </div>
            <span className="text-2xl font-bold text-gray-900">AgênciaEmpregos</span>
          </Link>
          <p className="text-gray-600 mt-2">Entre na sua conta</p>
        </div>

        <Card className="shadow-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Login</CardTitle>
            <p className="text-center text-gray-600">
              Escolha seu tipo de usuário e faça login
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Seleção de Tipo de Usuário */}
            <div>
              <Label className="text-base font-medium">Tipo de Usuário</Label>
              <div className="grid grid-cols-2 gap-3 mt-2">
                {userTypes.map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setLoginData({...loginData, userType: type.id as any})}
                    className={`p-3 rounded-lg border-2 transition-all text-left ${
                      loginData.userType === type.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <type.icon className={`h-5 w-5 ${type.color}`} />
                      <div>
                        <p className="font-medium text-sm">{type.label}</p>
                        <p className="text-xs text-gray-500">{type.description}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <Separator />

            {/* Formulário de Login */}
            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <Alert className="border-red-200 bg-red-50">
                  <AlertDescription className="text-red-800">
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={loginData.email}
                  onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Sua senha"
                    value={loginData.password}
                    onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                    required
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300" />
                  <span className="ml-2 text-sm text-gray-600">Lembrar de mim</span>
                </label>
                <Link href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-700">
                  Esqueceu a senha?
                </Link>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Entrando...' : 'Entrar'}
              </Button>
            </form>

            <Separator />

            {/* Login Social */}
            <div className="space-y-3">
              <p className="text-center text-sm text-gray-600">Ou entre com</p>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" type="button" className="w-full">
                  <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Google
                </Button>
                <Button variant="outline" type="button" className="w-full">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z" clipRule="evenodd"/>
                  </svg>
                  Facebook
                </Button>
              </div>
            </div>

            <Separator />

            {/* Links de Cadastro */}
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Não tem uma conta?{' '}
                <Link href="/register" className="text-blue-600 hover:text-blue-700 font-medium">
                  Cadastre-se
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Contas de Demonstração */}
        <Card className="mt-6 bg-gray-50 border-dashed">
          <CardContent className="p-4">
            <h3 className="font-medium text-gray-900 mb-3">Contas de Demonstração</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Candidato:</span>
                <span className="font-mono">ana@demo.com / demo123</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Empregador:</span>
                <span className="font-mono">empresa@demo.com / demo123</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Aluno:</span>
                <span className="font-mono">aluno@demo.com / demo123</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
