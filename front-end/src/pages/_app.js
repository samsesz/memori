import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

// As rotas que não exigem que o usuário esteja logado
const publicRoutes = ['/login', '/register']; 
// A rota principal do seu site após o login
const homeRoute = '/'; // Como você tem o index.js, vamos usar a raiz (/)

// Componente Guardião de Autenticação
const AuthGuard = ({ children }) => {
  const router = useRouter();
  const [isAuthReady, setIsAuthReady] = useState(false);
  
  // Efeito para checar o estado de autenticação
  useEffect(() => {
    // Essa lógica precisa rodar apenas no lado do cliente (browser)
    const token = localStorage.getItem('token');
    const isPublic = publicRoutes.includes(router.pathname);

    if (!token && !isPublic) {
      // 1. Não tem token E está em uma rota privada (ex: /, /perfil) -> Redireciona para o login
      console.log(`Redirecionando para /login (Token ausente).`);
      router.replace('/login'); // Usamos replace para não permitir voltar para a tela privada no histórico
    } else {
      // 3. Permite a renderização (ou está logado em rota privada, ou deslogado em rota pública)
      setIsAuthReady(true);
    }
  }, [router.pathname]);


  // Enquanto a checagem não termina em rotas privadas, mostra um loading.
  if (!isAuthReady && !publicRoutes.includes(router.pathname)) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontSize: '24px' }}>
        Carregando...
      </div>
    );
  }

  // Renderiza o conteúdo da página ou a própria página de login/register
  return children;
};


// Função App principal do Next.js
export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        {/* Aqui você pode adicionar meta tags globais, se necessário */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {/* Envolve todas as páginas com o guardião */}
      <AuthGuard>
        <Component {...pageProps} />
      </AuthGuard>
    </>
  );
}


