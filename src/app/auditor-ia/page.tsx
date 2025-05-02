
'use client';

import { useState } from 'react';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { useUserRole } from '@/context/UserRoleContext';
// Remove direct AI helper import: import { analyzeAuditorIA } from '@/lib/ai-helpers';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, storage } from '@/lib/firebase-client'; // Use client-side firebase config
import { useAuth } from '@/context/AuthContext';

export default function AuditorIAPage() {
  const { user } = useAuth();
  const { hasPermission } = useUserRole();
  const [file, setFile] = useState(null);
  const [documentName, setDocumentName] = useState('');
  const [documentType, setDocumentType] = useState('');
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // AI analysis states
  const [documentToAnalyze, setDocumentToAnalyze] = useState({
    name: '',
    type: '',
    description: '',
    content: '' // Content might be added later if file parsing is implemented
  });
  const [analysisResult, setAnalysisResult] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisError, setAnalysisError] = useState('');

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    
    if (!user) {
      setError('Você precisa estar logado para fazer upload.');
      return;
    }
    if (!file) {
      setError('Por favor, selecione um arquivo para upload.');
      return;
    }
    if (!documentName.trim()) {
      setError('Por favor, informe o nome do documento.');
      return;
    }

    setError('');
    setSuccess('');
    setUploading(true);

    try {
      const storageRef = ref(storage, `documents/${user.uid}/${Date.now()}_${file.name}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);

      await addDoc(collection(db, 'documents'), {
        name: documentName,
        type: documentType,
        description: description,
        fileUrl: downloadURL,
        fileName: file.name,
        fileType: file.type,
        fileSize: file.size,
        uploadedBy: user.uid,
        uploadedAt: serverTimestamp(),
      });

      setSuccess('Documento enviado com sucesso!');
      
      // Set document for analysis based on metadata
      setDocumentToAnalyze({
        name: documentName,
        type: documentType,
        description: description,
        content: `Análise baseada nos metadados do documento: Nome='${documentName}', Tipo='${documentType || 'Não especificado'}', Descrição='${description || 'Nenhuma'}'. O conteúdo do arquivo não foi processado.`
      });
      
      setFile(null);
      setDocumentName('');
      setDocumentType('');
      setDescription('');
      const fileInput = document.getElementById('document-file');
      if (fileInput) fileInput.value = '';

    } catch (err) {
      console.error('Erro ao fazer upload:', err);
      setError('Falha ao enviar documento. Verifique sua conexão e permissões do Firebase Storage.');
    } finally {
      setUploading(false);
    }
  };
  
  const handleAnalyze = async () => {
    if (!documentToAnalyze.name && !documentToAnalyze.description && !documentToAnalyze.content) {
      setAnalysisError('Faça upload de um documento ou preencha os dados para análise.');
      return;
    }
    
    setAnalysisError('');
    setAnalysisResult('');
    setAnalyzing(true);
    
    try {
      // Call the internal API route instead of OpenAI directly
      const response = await fetch('/api/auditor-ia', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Send relevant data for analysis
        body: JSON.stringify({ data: documentToAnalyze }), 
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Erro HTTP: ${response.status}`);
      }

      const result = await response.json();
      setAnalysisResult(result.analysis);

    } catch (err) {
      console.error("Error calling /api/auditor-ia:", err);
      setAnalysisError(err.message || 'Erro ao analisar documento.');
    } finally {
      setAnalyzing(false);
    }
  };

  // Check permission
  if (!hasPermission('auditor')) {
    // Redirect or show message if needed, ProtectedRoute handles basic auth
    // return <p>Acesso negado.</p>;
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-100">
        {/* Header */}
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">Auditor-IA</h1>
          </div>
        </header>

        {/* Main content */}
        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="px-4 py-6 sm:px-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Upload Form */}
                <div className="bg-white overflow-hidden shadow rounded-lg p-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Upload de Documento</h2>
                  <form onSubmit={handleUpload} className="space-y-4">
                    <div>
                      <label htmlFor="document-name" className="block text-sm font-medium text-gray-700 mb-1">Nome do Documento</label>
                      <input 
                        type="text" 
                        id="document-name" 
                        value={documentName}
                        onChange={(e) => setDocumentName(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="document-type" className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
                      <select 
                        id="document-type" 
                        value={documentType}
                        onChange={(e) => setDocumentType(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                      >
                        <option value="">Selecione...</option>
                        <option value="procedimento">Procedimento</option>
                        <option value="instrucao">Instrução</option>
                        <option value="formulario">Formulário</option>
                        <option value="manual">Manual</option>
                        <option value="relatorio">Relatório</option>
                        <option value="outro">Outro</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="document-description" className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                      <textarea 
                        id="document-description" 
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="document-file" className="block text-sm font-medium text-gray-700 mb-1">Arquivo</label>
                      <input 
                        type="file" 
                        id="document-file" 
                        onChange={handleFileChange}
                        className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.xls,.xlsx"
                        required
                      />
                    </div>
                    {error && <p className="text-red-600 text-sm">{error}</p>}
                    {success && <p className="text-green-600 text-sm">{success}</p>}
                    <button 
                      type="submit"
                      disabled={uploading}
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 disabled:opacity-50"
                    >
                      {uploading ? 'Enviando...' : 'Enviar Documento'}
                    </button>
                  </form>
                </div>

                {/* AI Analysis */}
                <div className="bg-white overflow-hidden shadow rounded-lg p-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Análise de Documento</h2>
                  
                  <div className="space-y-4 mb-6">
                    <p className="text-gray-600 text-sm">
                      Após enviar um documento, clique em "Analisar" para obter uma análise de conformidade e sugestões.
                    </p>
                    
                    {/* Document info for analysis */}
                    {documentToAnalyze.name && (
                      <div className="bg-purple-50 p-4 rounded-md">
                        <h3 className="text-md font-medium text-purple-800 mb-2">Documento para Análise</h3>
                        <p className="text-sm text-purple-700">Nome: {documentToAnalyze.name}</p>
                        {documentToAnalyze.type && <p className="text-sm text-purple-700">Tipo: {documentToAnalyze.type}</p>}
                        {documentToAnalyze.description && <p className="text-sm text-purple-700">Descrição: {documentToAnalyze.description}</p>}
                        <p className="text-xs text-purple-600 mt-1">Nota: A análise atual é baseada nos metadados. A análise do conteúdo do arquivo requer implementação adicional.</p>
                      </div>
                    )}
                    
                    <button 
                      onClick={handleAnalyze}
                      disabled={analyzing || !documentToAnalyze.name}
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {analyzing ? 'Analisando...' : 'Analisar com Auditor-IA'}
                    </button>
                  </div>
                  
                  {/* Analysis Result */}
                  {analysisError && <p className="text-red-600 text-sm mb-4">{analysisError}</p>}
                  {analysisResult && (
                    <div className="mt-4 border-t border-gray-200 pt-4">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Resultado da Análise</h3>
                      <div className="prose prose-sm max-w-none bg-gray-50 p-4 rounded-md whitespace-pre-wrap">
                        {analysisResult}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}

