
'use client';

import { useState } from 'react';

export default function ContatoPage() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    assunto: '',
    mensagem: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    setSuccess(false);

    // TODO: Implementar envio do formulário (ex: para uma API, Firebase Functions, etc.)
    // Simulação de envio:
    try {
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simula tempo de envio
      console.log('Formulário enviado:', formData);
      setSuccess(true);
      setFormData({ nome: '', email: '', telefone: '', assunto: '', mensagem: '' }); // Limpa o formulário
    } catch (err) {
      console.error('Erro ao enviar formulário:', err);
      setError('Ocorreu um erro ao enviar sua mensagem. Tente novamente mais tarde.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-4 text-gray-800">Entre em Contato</h1>
        <p className="text-lg text-center text-gray-600 mb-12 max-w-3xl mx-auto">
          Tem alguma dúvida, sugestão ou gostaria de solicitar uma proposta? Preencha o formulário abaixo e nossa equipe entrará em contato em breve.
        </p>
        
        <div className="max-w-2xl mx-auto bg-gray-50 p-8 rounded-lg shadow-md">
          {success ? (
            <div className="text-center p-6 bg-green-100 text-green-800 rounded-md">
              <h2 className="text-2xl font-semibold mb-2">Mensagem Enviada!</h2>
              <p>Obrigado por entrar em contato. Responderemos o mais breve possível.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
                <input 
                  type="text" 
                  id="nome" 
                  name="nome" 
                  value={formData.nome}
                  onChange={handleInputChange}
                  required 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={formData.email}
                    onChange={handleInputChange}
                    required 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="telefone" className="block text-sm font-medium text-gray-700 mb-1">Telefone (Opcional)</label>
                  <input 
                    type="tel" 
                    id="telefone" 
                    name="telefone" 
                    value={formData.telefone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="assunto" className="block text-sm font-medium text-gray-700 mb-1">Assunto</label>
                <input 
                  type="text" 
                  id="assunto" 
                  name="assunto" 
                  value={formData.assunto}
                  onChange={handleInputChange}
                  required 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label htmlFor="mensagem" className="block text-sm font-medium text-gray-700 mb-1">Mensagem</label>
                <textarea 
                  id="mensagem" 
                  name="mensagem" 
                  rows={5}
                  value={formData.mensagem}
                  onChange={handleInputChange}
                  required 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              {error && <p className="text-red-600 text-sm">{error}</p>}
              
              <div>
                <button 
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md transition duration-300 disabled:opacity-50"
                >
                  {submitting ? 'Enviando...' : 'Enviar Mensagem'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

