'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
// import Link from 'next/link'; // Removido pois não está sendo usado

// Componente para proteger rotas que requerem autenticação
export default function ProtectedRoute({ children /*, requiredRole = null */ }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Se não estiver carregando e não houver usuário, redireciona para login
    if (!loading && !user) {
      router.push('/login');
    }
    
    // Verificação de perfil pode ser implementada aqui quando necessário
    // usando o contexto UserRoleContext
  }, [user, loading, router]);

  // Mostra um indicador de carregamento enquanto verifica a autenticação
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Se não estiver autenticado, não renderiza nada (vai redirecionar)
  if (!user) {
    return null;
  }

  // Se estiver autenticado, renderiza o conteúdo protegido
  return children;
}
