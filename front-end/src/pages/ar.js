import Head from 'next/head';
import { useState } from 'react';

// Componente para a Página de Realidade Aumentada
const ARExperience = () => {
  const [arReady, setArReady] = useState(false);

  // Função para carregar os scripts do A-Frame e AR.js
  const loadScripts = () => {
    const scripts = [
      "https://aframe.io/releases/1.5.0/aframe.min.js",
      "https://cdn.jsdelivr.net/gh/AR-js-org/AR.js/aframe/build/aframe-ar.js"
    ];

    let loadedCount = 0;

    const onScriptLoad = () => {
      loadedCount++;
      if (loadedCount === scripts.length) {
        setArReady(true);
      }
    };

    scripts.forEach(src => {
      if (!document.querySelector(`script[src="${src}"]`)) {
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.onload = onScriptLoad;
        document.head.appendChild(script);
      } else {
        onScriptLoad();
      }
    });
  };

  // Solicita permissão da câmera e depois carrega os scripts
  const startAR = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      stream.getTracks().forEach(track => track.stop());
      loadScripts();
    } catch (err) {
      console.error('Erro ao acessar a câmera:', err);
      alert('Não foi possível acessar a câmera. Verifique permissões do navegador.');
    }
  };

  // Tela inicial antes do AR ser carregado
  if (!arReady) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
        <div style={{ textAlign: 'center' }}>
          <p>Pronto para iniciar a experiência AR.</p>
          <p>Permita o uso da câmera quando solicitado.</p>
          <button
            onClick={startAR}
            style={{ marginTop: 12, padding: '8px 16px', fontSize: 16 }}
          >
            Iniciar AR (ativar câmera)
          </button>

          <div style={{ marginTop: 18 }}>
            <p style={{ marginBottom: 8 }}>Marcador (imprima e aponte a câmera para ele):</p>
            <img
              src="/markers/hiro.png"
              alt="Hiro marker"
              style={{ width: 150, height: 150, border: '1px solid #ccc', display: 'block', margin: '0 auto' }}
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
            <p style={{ fontSize: 13, marginTop: 8 }}>
              Se a imagem acima não carregar, baixe o marcador via este link (fallback):
              <br />
              <a
                href="https://cdn.jsdelivr.net/gh/AR-js-org/AR.js@master/aframe/examples/marker-training/examples/markers/hiro.png"
                target="_blank"
                rel="noreferrer"
              >
                Abrir/baixar marcador hiro (jsDelivr)
              </a>
            </p>
            <p style={{ fontSize: 12, color: '#ccc', marginTop: 6 }}>
              Dica: salve o arquivo em <code>/public/markers/hiro.png</code> para uso offline.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Tela da experiência AR
  return (
    <>
      <Head>
        <title>Experiência de Realidade Aumentada</title>
        <style>{`
          body { margin: 0; overflow: hidden; }
          .a-enter-vr { display: none !important; }
        `}</style>
      </Head>

      <div
        dangerouslySetInnerHTML={{
          __html: `
            <a-scene 
              embedded 
              vr-mode-ui="enabled: false" 
              arjs='sourceType: webcam; detectionMode: mono; maxDetectionRate: 30; canvasWidth: 1280; canvasHeight: 960;'>

              <a-marker preset='hiro'>
                <a-entity
                  gltf-model="url(/modelagem/suburban_house/scene.gltf)"
                  scale="0.5 0.5 0.5"
                  position="0 0 0"
                  rotation="0 0 0"
                ></a-entity>
              </a-marker>

              <a-entity camera></a-entity>
            </a-scene>
          `
        }}
      />
    </>
  );
};

export default ARExperience;