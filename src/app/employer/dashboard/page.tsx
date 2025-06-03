'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Users, Briefcase, Plus, Calendar, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function EmployerDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header isLoggedIn={true} userType="employer" userName="TechNova Soluções" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Dashboard - Empregador
            </h1>
            <p className="text-gray-600">Gerencie suas vagas e candidatos</p>
          </div>
          <Button asChild>
            <Link href="/employer/jobs/new">
              <Plus className="h-4 w-4 mr-2" />
              Nova Vaga
            </Link>
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="jobs">Vagas</TabsTrigger>
            <TabsTrigger value="applications">Candidaturas</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Vagas Ativas</p>
                      <p className="text-2xl font-bold text-gray-900">3</p>
                    </div>
                    <Briefcase className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Candidaturas</p>
                      <p className="text-2xl font-bold text-gray-900">24</p>
                    </div>
                    <Users className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Entrevistas</p>
                      <p className="text-2xl font-bold text-gray-900">4</p>
                    </div>
                    <Calendar className="h-8 w-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Taxa Conversão</p>
                      <p className="text-2xl font-bold text-gray-900">12%</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Candidaturas Recentes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                    <div className="flex-1">
                      <h4 className="font-medium">Ana Oliveira</h4>
                      <p className="text-sm text-gray-600">Desenvolvedora Frontend React</p>
                    </div>
                    <Badge>Pendente</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="jobs">
            <div className="text-center py-12">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Suas Vagas</h3>
              <Button asChild>
                <Link href="/employer/jobs/new">Criar Nova Vaga</Link>
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="applications">
            <div className="text-center py-12">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Candidaturas</h3>
              <p className="text-gray-600">Visualize todas as candidaturas recebidas</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
}
