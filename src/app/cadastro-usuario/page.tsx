'use client';

import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { useUserRole } from '@/context/UserRoleContext';

export default function CadastroUsuarioPage() {
  const { hasPermission } = useUserRole() as { hasPermission: (requiredRole: string) => boolean };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">Cadastro de Usuário</h1>
          </div>
        </header>

        <main>
          <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <div className="bg-white overflow-hidden shadow rounded-lg p-6">
              {hasPermission('administrador') ? (
                <p className="text-gray-700">
                  O formulário de cadastro está em manutenção e será disponibilizado em breve.
                </p>
              ) : (
                <p className="text-red-600">Você não tem permissão para cadastrar usuários.</p>
              )}
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
