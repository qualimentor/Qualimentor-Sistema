
'use client';

import Link from 'next/link';
import Image from 'next/image'; // Import Image component

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-green text-light-beige">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo e descrição */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <Link href="/home">
                {/* Use o logo da Qualimentor */}
                <Image 
                  src="/images/logo_qualimentor.png" 
                  alt="Qualimentor Logo"
                  width={180} // Ajuste conforme necessário
                  height={60} // Ajuste conforme necessário
                  className="h-12 w-auto filter brightness-0 invert" // Inverte as cores para ficar branco no fundo escuro
                />
              </Link>
              {/* <span className="ml-3 text-xl font-bold text-white">Qualimentor</span> */}
            </div>
            <p className="text-light-beige mb-4">
              Consultoria especializada em gestão da qualidade para laboratórios clínicos e de pesquisa.
              Elevamos o padrão de qualidade do seu laboratório com soluções personalizadas.
            </p>
          </div>

          {/* Links rápidos */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/home" className="text-light-beige hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/sobre" className="text-light-beige hover:text-white transition-colors">
                  Sobre
                </Link>
              </li>
              <li>
                <Link href="/cursos" className="text-light-beige hover:text-white transition-colors">
                  Cursos
                </Link>
              </li>
              <li>
                <Link href="/contato" className="text-light-beige hover:text-white transition-colors">
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          {/* Sistema */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Sistema</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/login" className="text-light-beige hover:text-white transition-colors">
                  Login
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-light-beige hover:text-white transition-colors">
                  Dashboard
                </Link>
              </li>
              {/* Adicionar link para Política de Privacidade se existir */}
              {/* <li>
                <Link href="/politica-privacidade" className="text-light-beige hover:text-white transition-colors">
                  Política de Privacidade
                </Link>
              </li> */}
            </ul>
          </div>
        </div>

        {/* Direitos autorais */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {currentYear} Qualimentor. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}

