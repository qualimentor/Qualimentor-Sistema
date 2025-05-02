
'use client';

// import type { Metadata } from "next"; // Removido pois não está sendo usado
// import { Inter } from "next/font/google"; // REMOVIDO - Conflito com fontes globais
import "@/app/globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { UserRoleProvider } from "@/context/UserRoleContext";
import Header from "@/components/layout/Header"; // Import Header
import Footer from "@/components/layout/Footer"; // Import Footer

// const inter = Inter({ subsets: ["latin"] }); // REMOVIDO

// Metadata can be defined here if needed, or in specific page components
// export const metadata: Metadata = {
//   title: "Qualimentor - Consultoria e Treinamentos",
//   description: "Consultoria especializada em qualidade laboratorial e treinamentos.",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      {/* REMOVIDO inter.className do body */}
      <body className={`flex flex-col min-h-screen`}>
        <AuthProvider>
          <UserRoleProvider>
            <Header /> {/* Render Header */}
            <main className="flex-grow">{children}</main> {/* Ensure main content grows */}
            <Footer /> {/* Render Footer */}
          </UserRoleProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

