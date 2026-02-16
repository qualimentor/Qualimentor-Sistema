declare module '@/context/AuthContext' {
  import type { ReactNode } from 'react';

  export type AuthUser = {
    uid: string;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
  };

  export type AuthContextValue = {
    user: AuthUser | null;
    loading: boolean;
    signIn: (email: string, password: string) => Promise<unknown>;
    signUp: (email: string, password: string) => Promise<unknown>;
    signOut: () => Promise<void>;
    updateUserProfile: (profile: { displayName?: string; photoURL?: string }) => Promise<void>;
  };

  export function useAuth(): AuthContextValue;
  export function AuthProvider(props: { children: ReactNode }): JSX.Element;
}

declare module '@/context/UserRoleContext' {
  import type { ReactNode } from 'react';

  export type UserRole = 'administrador' | 'gestor' | 'auditor' | 'analista' | null;

  export type UserRoleContextValue = {
    userRole: UserRole;
    loading: boolean;
    hasPermission: (requiredRole: Exclude<UserRole, null>) => boolean;
    fetchUserRole: (uid: string) => Promise<void>;
  };

  export function useUserRole(): UserRoleContextValue;
  export function UserRoleProvider(props: { children: ReactNode }): JSX.Element;
}
