// Corrigir o aviso sobre serverActions no next.config.ts
import { NextConfig } from 'next';

const config: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['firebasestorage.googleapis.com'],
  },
  experimental: {
    // Configurar serverActions como objeto em vez de boolean
    serverActions: {
      allowedOrigins: ['localhost:3000', 'qualimentor.vercel.app'],
    },
  },
};

export default config;
