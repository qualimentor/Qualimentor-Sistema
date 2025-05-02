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
      {/* ...interface mantida como antes, sem alterações... */}
    </ProtectedRoute>
  );
}