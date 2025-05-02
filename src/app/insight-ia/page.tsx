
'use client';

import { useState } from 'react';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { useUserRole } from '@/context/UserRoleContext';
// Remove direct AI helper import: import { analyzeInsightIA } from '@/lib/ai-helpers';

export default function InsightIAPage() {
  // const { hasPermission } = useUserRole(); // Removed as not used
  const [indicatorsData, setIndicatorsData] = useState(''); // Example: Expecting JSON or structured text
  const [analysisResult, setAnalysisResult] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState('');

  const handleAnalyze = async () => {
    setError('');
    setAnalysisResult('');
    setAnalyzing(true);
    try {
      // Attempt to parse JSON, otherwise send as text
      let parsedData;
      try {
        parsedData = JSON.parse(indicatorsData);
      } catch (_) {
        parsedData = indicatorsData; // Send as plain text if not valid JSON
      }

      // Call the internal API route instead of OpenAI directly
      const response = await fetch('/api/insight-ia', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: parsedData }), // Send data in the request body
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Erro HTTP: ${response.status}`);
      }

      const result = await response.json();
      setAnalysisResult(result.analysis);

    } catch (err) {
      console.error("Error calling /api/insight-ia:", err);
      setError(err.message || 'Erro ao analisar indicadores.');
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-100">
        {/* Header */}
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">Insight-IA</h1>
          </div>
        </header>

        {/* Main content */}
        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="px-4 py-6 sm:px-0">
              <div className="bg-white overflow-hidden shadow rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Análise de Indicadores de Qualidade</h2>
                
                {/* Input Area */}
                <div className="space-y-4 mb-6">
                  <div>
                    <label htmlFor="indicatorsData" className="block text-sm font-medium text-gray-700 mb-1">Dados dos Indicadores (JSON ou Texto)</label>
                    <textarea 
                      id="indicatorsData" 
                      rows={8}
                      value={indicatorsData}
                      onChange={(e) => setIndicatorsData(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 font-mono text-sm"
                      placeholder='Cole aqui os dados dos indicadores. Ex: [{
  "nome": "Tempo de Liberação",
  "valor": "35 min",
  "meta": "< 45 min"
}, ...]' 
                    />
                  </div>
                  <button 
                    onClick={handleAnalyze}
                    disabled={analyzing}
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 disabled:opacity-50"
                  >
                    {analyzing ? 'Analisando...' : 'Analisar com Insight-IA'}
                  </button>
                </div>

                {/* Analysis Result */}
                {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
                {analysisResult && (
                  <div className="mt-6 border-t border-gray-200 pt-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Análise do Insight-IA</h3>
                    <div className="prose prose-sm max-w-none bg-gray-50 p-4 rounded-md whitespace-pre-wrap">
                      {analysisResult}
                    </div>
                  </div>
                )}

                {/* Placeholder for indicators list/charts */}
                <div className="mt-8 border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Histórico de Análises</h3>
                  <p className="text-gray-500">Nenhuma análise anterior encontrada.</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}

