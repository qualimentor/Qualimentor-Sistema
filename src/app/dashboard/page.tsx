'use client';


import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

export default function DashboardPage() {
  const { user } = useAuth();
  
  // Módulos do sistema
  const modules = [
    {
      id: 'mentor-ia',
      title: 'Mentor-IA',
      description: 'Gestão de Não Conformidades e Eventos Adversos',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      id: 'insight-ia',
      title: 'Insight-IA',
      description: 'Análise de Indicadores de Qualidade',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
    {
      id: 'auditor-ia',
      title: 'Auditor-IA',
      description: 'Gestão de Documentos e Auditorias',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    {
      id: 'cadastro-usuario',
      title: 'Cadastro de Usuários',
      description: 'Gerenciamento de usuários do sistema',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
        </svg>
      ),
    },
  ];

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-100">
        {/* Header */}
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Olá, {user?.displayName || user?.email}</span>
              <button 
                onClick={() => {/* Implementar logout */}}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-1 rounded-md text-sm"
              >
                Sair
              </button>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            {/* Welcome section */}
            <div className="px-4 py-6 sm:px-0">
              <div className="bg-white overflow-hidden shadow rounded-lg p-6 mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Bem-vindo ao Sistema Interno Qualimentor</h2>
                <p className="text-gray-600">
                  Utilize os módulos abaixo para gerenciar a qualidade do seu laboratório de forma eficiente e integrada.
                </p>
              </div>

              {/* Modules grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {modules.map((module) => (
                  <Link 
                    key={module.id}
                    href={`/${module.id}`}
                    className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow"
                  >
                    <div className="p-6">
                      <div className="flex items-center justify-center mb-4">
                        {module.icon}
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 text-center mb-1">{module.title}</h3>
                      <p className="text-sm text-gray-500 text-center">{module.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
