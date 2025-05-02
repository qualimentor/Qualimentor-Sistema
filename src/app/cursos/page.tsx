'use client';

import Link from 'next/link';

export default function CursosPage() {
  // Dados dos cursos (em um projeto real, viriam de uma API ou banco de dados)
  const cursos = [
    {
      id: 1,
      titulo: "Gestão da Qualidade em Laboratórios Clínicos",
      descricao: "Aprenda a implementar e gerenciar um sistema de gestão da qualidade eficiente em laboratórios clínicos, seguindo as diretrizes da ISO 15189 e RDC 786/2023.",
      duracao: "40 horas",
      modalidade: "Online e Presencial",
    },
    {
      id: 2,
      titulo: "Controle Interno da Qualidade",
      descricao: "Técnicas e ferramentas para implementação de um programa de controle interno da qualidade eficaz, garantindo a confiabilidade dos resultados laboratoriais.",
      duracao: "24 horas",
      modalidade: "Online",
    },
    {
      id: 3,
      titulo: "Auditorias Internas da Qualidade",
      descricao: "Capacitação para realização de auditorias internas em laboratórios, identificando não conformidades e oportunidades de melhoria.",
      duracao: "16 horas",
      modalidade: "Presencial",
    },
    {
      id: 4,
      titulo: "Gestão de Riscos em Laboratórios",
      descricao: "Metodologias para identificação, análise e mitigação de riscos em processos laboratoriais, conforme requisitos normativos.",
      duracao: "20 horas",
      modalidade: "Online",
    },
  ];

  return (
    <div className="min-h-screen bg-white py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-4 text-gray-800">Nossos Cursos</h1>
        <p className="text-lg text-center text-gray-600 mb-12 max-w-3xl mx-auto">
          Capacitação especializada em gestão da qualidade laboratorial, ministrada por profissionais com vasta experiência no setor.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {cursos.map((curso) => (
            <div key={curso.id} className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{curso.titulo}</h3>
                <p className="text-gray-600 mb-4">{curso.descricao}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    {curso.duracao}
                  </span>
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    {curso.modalidade}
                  </span>
                </div>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded">
                  Saiba mais
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Cursos In-Company</h2>
          <p className="text-lg text-gray-600 mb-6 max-w-3xl mx-auto">
            Oferecemos treinamentos personalizados para equipes laboratoriais, adaptados às necessidades específicas da sua instituição.
          </p>
          <Link 
            href="/contato" 
            className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 rounded-lg font-medium"
          >
            Solicite uma Proposta
          </Link>
        </div>
      </div>
    </div>
  );
}
