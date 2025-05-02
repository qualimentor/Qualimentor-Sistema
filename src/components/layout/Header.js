
'use client';

import Link from 'next/link';
import Image from 'next/image'; // Import Image component
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function Header() {
  const pathname = usePathname();
  const { user, signOut } = useAuth();

  // Verifica se está em uma rota do sistema interno
  const isInternalSystem = pathname.startsWith('/dashboard') || 
                          pathname.startsWith('/mentor-ia') || 
                          pathname.startsWith('/insight-ia') || 
                          pathname.startsWith('/auditor-ia') || 
                          pathname.startsWith('/cadastro-usuario');

  // Links de navegação do site público
  const publicNavLinks = [
    { name: 'Home', href: '/home' },
    { name: 'Sobre', href: '/sobre' },
    { name: 'Cursos', href: '/cursos' },
    { name: 'Contato', href: '/contato' },
  ];

  // Links de navegação do sistema interno
  const internalNavLinks = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Mentor-IA', href: '/mentor-ia' },
    { name: 'Insight-IA', href: '/insight-ia' },
    { name: 'Auditor-IA', href: '/auditor-ia' },
    // { name: 'Cadastro de Usuários', href: '/cadastro-usuario' }, // Conditionally show based on role later
  ];

  // Determina quais links mostrar com base na rota atual
  const navLinks = isInternalSystem ? internalNavLinks : publicNavLinks;

  const handleSignOut = async () => {
    try {
      await signOut();
      // Redirect to login or home after sign out might be needed
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  return (
    <header className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20"> {/* Increased height for logo */}
          {/* Logo e nome */}
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/home">
                <Image 
                  src="/images/logo_qualimentor.png" 
                  alt="Qualimentor Logo"
                  width={180} // Adjust width as needed
                  height={60} // Adjust height as needed
                  className="h-12 w-auto" // Maintain aspect ratio
                />
              </Link>
              {/* <span className="ml-3 text-xl font-bold text-dark-green">Qualimentor</span> */}
            </div>
          </div>

          {/* Links de navegação */}
          <nav className="hidden md:ml-6 md:flex md:space-x-8 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium font-primary transition-colors duration-300 ease-in-out ${
                  pathname === link.href
                    ? 'border-turquoise text-dark-green'
                    : 'border-transparent text-gray hover:border-turquoise hover:text-turquoise'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Botão de login/logout */}
          <div className="flex items-center">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray hidden sm:inline-block">
                  {user.displayName || user.email}
                </span>
                {isInternalSystem ? (
                  <button
                    onClick={handleSignOut}
                    className="btn bg-light-gray hover:bg-gray-300 text-dark-gray px-4 py-2 rounded-md text-sm"
                  >
                    Sair
                  </button>
                ) : (
                  <Link
                    href="/dashboard"
                    className="btn btn-primary px-4 py-2 text-sm"
                  >
                    Acessar Sistema
                  </Link>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="btn btn-primary px-4 py-2 text-sm"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

