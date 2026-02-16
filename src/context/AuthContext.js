'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  updateProfile
} from 'firebase/auth';
import { auth, hasFirebaseConfig } from '@/lib/firebase-client'; // Corrigido! Agora puxa do firebase-client, não do server

// Criação do contexto de autenticação
const AuthContext = createContext({});

// Hook personalizado para usar o contexto
export const useAuth = () => useContext(AuthContext);

// Componente Provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Monitora o estado de autenticação
  useEffect(() => {
    if (!hasFirebaseConfig || !auth) {
      setLoading(false);
      return () => {};
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const requireAuth = () => {
    if (!auth) {
      throw new Error('Firebase Auth não está configurado. Verifique as variáveis NEXT_PUBLIC_FIREBASE_*');
    }
    return auth;
  };

  // Métodos de autenticação
  const signIn = (email, password) => signInWithEmailAndPassword(requireAuth(), email, password);
  const signUp = (email, password) => createUserWithEmailAndPassword(requireAuth(), email, password);
  const signOut = () => {
    setUser(null);
    return firebaseSignOut(requireAuth());
  };
  const updateUserProfile = (profile) => updateProfile(requireAuth().currentUser, profile);

  // Valor do contexto
  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
