'use client';


import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function HomePage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Qualimentor
              </h1>
              <h2 className="text-2xl md:text-3xl font-semibold mb-6">
                Excelência em Qualidade Laboratorial
              </h2>
              <p className="text-lg mb-8">
                Consultoria especializada e treinamentos para laboratórios clínicos e de pesquisa.
                Elevamos o padrão de qualidade do seu laboratório com soluções personalizadas.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/cursos" 
                  className="bg-white text-blue-700 hover:bg-gray-100 px-6 py-3 rounded-lg font-medium text-center"
                >
                  Nossos Cursos
                </Link>
                <Link 
                  href="/contato" 
                  className="bg-transparent hover:bg-blue-700 border border-white px-6 py-3 rounded-lg font-medium text-center"
                >
                  Fale Conosco
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              {/* Placeholder for hero image */}
              <div className="w-full max-w-md h-64 bg-blue-700 rounded-lg flex items-center justify-center">
                <p className="text-xl font-semibold">Imagem Ilustrativa</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Nossos Serviços
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-center text-gray-800">Consultoria em Qualidade</h3>
              <p className="text-gray-600 text-center">
                Implementação de sistemas de gestão da qualidade, preparação para acreditações e auditorias internas.
              </p>
            </div>
            
            {/* Service 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-center text-gray-800">Treinamentos</h3>
              <p className="text-gray-600 text-center">
                Capacitação de equipes em boas práticas laboratoriais, gestão da qualidade e normas técnicas.
              </p>
            </div>
            
            {/* Service 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-center text-gray-800">Sistema Interno de Qualidade</h3>
              <p className="text-gray-600 text-center">
                Plataforma digital para gestão de não conformidades, indicadores e documentos da qualidade.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Acesse o Sistema Interno Qualimentor
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Gerencie a qualidade do seu laboratório com nossa plataforma digital integrada.
            Controle de documentos, gestão de não conformidades e indicadores em um só lugar.
          </p>
          {user ? (
            <Link 
              href="/dashboard" 
              className="bg-white text-blue-700 hover:bg-gray-100 px-8 py-3 rounded-lg font-medium inline-block"
            >
              Acessar Dashboard
            </Link>
          ) : (
            <Link 
              href="/login" 
              className="bg-white text-blue-700 hover:bg-gray-100 px-8 py-3 rounded-lg font-medium inline-block"
            >
              Fazer Login
            </Link>
          )}
        </div>
      </section>
    </div>
  );
}
