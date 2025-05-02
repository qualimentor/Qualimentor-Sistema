
'use client';

import Link from 'next/link';

export default function SobrePage() {
  return (
    <div className="min-h-screen bg-white py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">Sobre a Qualimentor</h1>
        
        <div className="max-w-3xl mx-auto bg-gray-50 p-8 rounded-lg shadow-md">
          <p className="text-lg text-gray-700 mb-6">
            A Qualimentor é uma consultoria especializada em gestão da qualidade para laboratórios clínicos e de pesquisa. Nossa missão é auxiliar laboratórios a alcançarem a excelência em seus processos, garantindo resultados confiáveis e conformidade com as normas e regulamentações.
          </p>
          <p className="text-lg text-gray-700 mb-6">
            Com uma equipe experiente e apaixonada pela qualidade, oferecemos soluções personalizadas que abrangem desde a implementação de sistemas de gestão da qualidade (SGQ) até a preparação para processos de acreditação e auditorias internas.
          </p>
          <p className="text-lg text-gray-700 mb-6">
            Além da consultoria, oferecemos treinamentos e capacitações para equipes laboratoriais, abordando temas como boas práticas, controle de qualidade, gestão de riscos e normas técnicas relevantes (ISO 15189, RDC 786/2023, etc.).
          </p>
          <p className="text-lg text-gray-700">
            Nosso compromisso é com a melhoria contínua e a segurança do paciente, contribuindo para um diagnóstico mais preciso e confiável.
          </p>
          
          <div className="mt-10 text-center">
            <Link 
              href="/contato" 
              className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 rounded-lg font-medium"
            >
              Entre em Contato
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

