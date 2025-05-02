
'use client';

import { useState } from 'react';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { useUserRole } from '@/context/UserRoleContext';
// Remove direct AI helper import: import { analyzeMentorIA } from '@/lib/ai-helpers';

export default function MentorIAPage() {
  const { hasPermission } = useUserRole();
  const [nonConformity, setNonConformity] = useState({
    description: '',
    area: '',
    process: '',
    impact: '',
  });
  const [analysisResult, setAnalysisResult] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNonConformity((prev) => ({ ...prev, [name]: value }));
  };

  const handleAnalyze = async () => {
    setError('');
    setAnalysisResult('');
    setAnalyzing(true);
    try {
      // Call the internal API route instead of OpenAI directly
      const response = await fetch('/api/mentor-ia', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: nonConformity }), // Send data in the request body
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Erro HTTP: ${response.status}`);
      }

      const result = await response.json();
      setAnalysisResult(result.analysis);

    } catch (err) {
      console.error("Error calling /api/mentor-ia:", err);
      setError(err.message || 'Erro ao analisar ocorrência.');
    } finally {
      setAnalyzing(false);
    }
  };

  // Example: Check if user has at least 'analista' role
  if (!hasPermission('analista')) {
    // return <p>Você não tem permissão para acessar este módulo.</p>;
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-100">
        {/* Header */}
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">Mentor-IA</h1>
          </div>
        </header>

        {/* Main content */}
        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="px-4 py-6 sm:px-0">
              <div className="bg-white overflow-hidden shadow rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Análise de Não Conformidades e Eventos Adversos</h2>
                
                {/* Input Form */}
                <div className="space-y-4 mb-6">
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Descrição da Ocorrência</label>
                    <textarea 
                      id="description" 
                      name="description"
                      rows={4}
                      value={nonConformity.description}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Descreva detalhadamente a não conformidade ou evento adverso..."
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="area" className="block text-sm font-medium text-gray-700 mb-1">Área</label>
                      <input type="text" id="area" name="area" value={nonConformity.area} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" />
                    </div>
                    <div>
                      <label htmlFor="process" className="block text-sm font-medium text-gray-700 mb-1">Processo</label>
                      <input type="text" id="process" name="process" value={nonConformity.process} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" />
                    </div>
                    <div>
                      <label htmlFor="impact" className="block text-sm font-medium text-gray-700 mb-1">Impacto</label>
                      <input type="text" id="impact" name="impact" value={nonConformity.impact} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" />
                    </div>
                  </div>
                  <button 
                    onClick={handleAnalyze}
                    disabled={analyzing}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 disabled:opacity-50"
                  >
                    {analyzing ? 'Analisando...' : 'Analisar com Mentor-IA'}
                  </button>
                </div>

                {/* Analysis Result */}
                {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
                {analysisResult && (
                  <div className="mt-6 border-t border-gray-200 pt-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Análise do Mentor-IA</h3>
                    <div className="prose prose-sm max-w-none bg-gray-50 p-4 rounded-md whitespace-pre-wrap">
                      {analysisResult}
                    </div>
                  </div>
                )}
                
                {/* Placeholder for list/table */}
                <div className="mt-8 border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Histórico de Análises</h3>
                  <p className="text-gray-500">Nenhuma análise anterior encontrada.</p>
                  {/* Tabela/Lista virá aqui */}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}

