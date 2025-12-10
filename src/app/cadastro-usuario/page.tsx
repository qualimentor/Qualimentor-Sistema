'use client';

import { useState } from 'react';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { useUserRole } from '@/context/UserRoleContext';
import { useAuth } from '@/context/AuthContext';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, storage } from '@/lib/firebase-server';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default function CadastroUsuarioPage() {
  const { hasPermission } = useUserRole();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    cpf: '',
    dataNascimento: '',
    telefone: '',
    cargo: '',
    perfil: 'analista',
  });
  const [diploma, setDiploma] = useState(null);
  const [documentosExtras, setDocumentosExtras] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDiplomaChange = (e) => {
    if (e.target.files[0]) {
      setDiploma(e.target.files[0]);
    }
  };

  const handleDocumentosExtrasChange = (e) => {
    if (e.target.files) {
      setDocumentosExtras(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!hasPermission('administrador')) {
      setError('Você não tem permissão para cadastrar usuários.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      let diplomaUrl = '';
      if (diploma) {
        const diplomaRef = ref(storage, `usuarios/diplomas/${Date.now()}_${diploma.name}`);
        await uploadBytes(diplomaRef, diploma);
        diplomaUrl = await getDownloadURL(diplomaRef);
      }

      const documentosUrls = [];
      for (const doc of documentosExtras) {
        const docRef = ref(storage, `usuarios/documentos/${Date.now()}_${doc.name}`);
        await uploadBytes(docRef, doc);
        const docUrl = await getDownloadURL(docRef);
        documentosUrls.push({
          nome: doc.name,
          url: docUrl,
          tipo: doc.type,
          tamanho: doc.size,
        });
      }

      await addDoc(collection(db, 'users'), {
        ...formData,
        diplomaUrl,
        documentosExtras: documentosUrls,
        cadastradoPor: user.uid,
        dataCadastro: serverTimestamp(),
      });

      setSuccess('Usuário cadastrado com sucesso!');
      setFormData({ nome: '', email: '', cpf: '', dataNascimento: '', telefone: '', cargo: '', perfil: 'analista' });
      setDiploma(null);
      setDocumentosExtras([]);

      const diplomaInput = document.getElementById('diploma');
      const documentosInput = document.getElementById('documentos-extras');
      if (diplomaInput) diplomaInput.value = '';
      if (documentosInput) documentosInput.value = '';

    } catch (err) {
      console.error('Erro ao cadastrar usuário:', err);
      setError('Falha ao cadastrar usuário. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-100">
        <div className="mx-auto max-w-5xl py-10 px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Cadastro de Usuários</h1>
            <p className="text-gray-600">Registre novos usuários e faça upload da documentação necessária.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 rounded-lg bg-white p-6 shadow">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label htmlFor="nome" className="block text-sm font-medium text-gray-700">
                  Nome completo
                </label>
                <input
                  id="nome"
                  name="nome"
                  type="text"
                  value={formData.nome}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  E-mail
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="cpf" className="block text-sm font-medium text-gray-700">
                  CPF
                </label>
                <input
                  id="cpf"
                  name="cpf"
                  type="text"
                  value={formData.cpf}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="dataNascimento" className="block text-sm font-medium text-gray-700">
                  Data de nascimento
                </label>
                <input
                  id="dataNascimento"
                  name="dataNascimento"
                  type="date"
                  value={formData.dataNascimento}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="telefone" className="block text-sm font-medium text-gray-700">
                  Telefone
                </label>
                <input
                  id="telefone"
                  name="telefone"
                  type="tel"
                  value={formData.telefone}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="cargo" className="block text-sm font-medium text-gray-700">
                  Cargo
                </label>
                <input
                  id="cargo"
                  name="cargo"
                  type="text"
                  value={formData.cargo}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="perfil" className="block text-sm font-medium text-gray-700">
                  Perfil
                </label>
                <select
                  id="perfil"
                  name="perfil"
                  value={formData.perfil}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                >
                  <option value="analista">Analista</option>
                  <option value="gestor">Gestor</option>
                  <option value="administrador">Administrador</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label htmlFor="diploma" className="block text-sm font-medium text-gray-700">
                  Diploma (opcional)
                </label>
                <input
                  id="diploma"
                  name="diploma"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleDiplomaChange}
                  className="mt-1 block w-full text-sm text-gray-700"
                />
              </div>

              <div>
                <label htmlFor="documentos-extras" className="block text-sm font-medium text-gray-700">
                  Documentos extras (opcional)
                </label>
                <input
                  id="documentos-extras"
                  name="documentos-extras"
                  type="file"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleDocumentosExtrasChange}
                  className="mt-1 block w-full text-sm text-gray-700"
                />
              </div>
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}
            {success && <p className="text-sm text-green-600">{success}</p>}

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="rounded-md bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? 'Cadastrando...' : 'Cadastrar usuário'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </ProtectedRoute>
  );
}