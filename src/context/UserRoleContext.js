'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase-server';
import { useAuth } from './AuthContext';

const roleHierarchy = {
  'administrador': 4,
  'gestor': 3,
  'auditor': 2,
  'analista': 1,
};

const UserRoleContext = createContext({});

export const useUserRole = () => useContext(UserRoleContext);

export const UserRoleProvider = ({ children }) => {
  const { user, loading: authLoading } = useAuth();
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserRole = async (uid) => {
    if (!uid) {
      setUserRole(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const userDocRef = doc(db, 'users', uid);
      const userDocSnap = await getDoc(userDocRef);
      if (userDocSnap.exists()) {
        setUserRole(userDocSnap.data().role || 'analista');
      } else {
        setUserRole(null);
        console.warn(`User document not found for UID: ${uid}`);
      }
    } catch (error) {
      console.error('Error fetching user role:', error);
      setUserRole(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading && user) {
      fetchUserRole(user.uid);
    } else if (!authLoading && !user) {
      setUserRole(null);
      setLoading(false);
    }
  }, [user, authLoading]);

  const hasPermission = (requiredRole) => {
    if (!userRole || !requiredRole) return false;

    const userLevel = roleHierarchy[userRole.toLowerCase()] || 0;
    const requiredLevel = roleHierarchy[requiredRole.toLowerCase()] || 0;

    return userLevel >= requiredLevel;
  };

  const value = {
    userRole,
    loading: authLoading || loading,
    hasPermission,
    fetchUserRole,
  };

  return (
    <UserRoleContext.Provider value={value}>
      {children}
    </UserRoleContext.Provider>
  );
};
