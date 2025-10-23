/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

 async rewrites() {
    return [
      {
        source: '/api/:path*', // Regra 1: Para as chamadas da API
        destination: 'http://localhost:4000/api/:path*', // (Seu backend está na 4000)
      },
      {
        source: '/uploads/:path*', // Regra 2 (NOVA): Para os arquivos de imagem
        destination: 'http://localhost:4000/uploads/:path*', // Redireciona para o backend
      },
    ];
  },
};


export default nextConfig;
