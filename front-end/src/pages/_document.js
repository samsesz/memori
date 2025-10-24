import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        {/* 1. CARREGAR A-FRAME PRIMEIRO
          Isso garante que todas as classes e utilitários do A-Frame (como o EventDispatcher) 
          estejam definidos globalmente antes que o AR.js tente usá-los.
        */}
        <script src="https://aframe.io/releases/1.5.0/aframe.min.js"></script>
        
        {/* 2. CARREGAR AR.JS DEPOIS
          O AR.js depende do A-Frame estar carregado.
        */}
        <script src="https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar.js"></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
