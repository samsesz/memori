import Head from 'next/head';
import { useEffect, useState } from 'react';

// Componente para a Página de Realidade Aumentada
const ARExperience = () => {
    // Estado para controlar a exibição do conteúdo de AR
    const [arReady, setArReady] = useState(false);

    useEffect(() => {
        // O A-Frame e AR.js dependem de tags de script que manipulam o DOM.
        // A melhor prática no Next.js é carregá-los dinamicamente no lado do cliente.
        
        const loadScripts = () => {
            const scripts = [
                "https://aframe.io/releases/1.5.0/aframe.min.js", // Dependência: A-Frame
                "https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar.js" // AR.js
            ];

            let loadedCount = 0;
            const scriptsToLoad = scripts.length;

            const onScriptLoad = () => {
                loadedCount++;
                if (loadedCount === scriptsToLoad) {
                    // Todos os scripts carregados, agora podemos renderizar a cena A-Frame
                    setArReady(true);
                }
            };

            scripts.forEach(src => {
                // Previne o carregamento duplicado (importante para o Next.js Dev Mode)
                if (!document.querySelector(`script[src="${src}"]`)) {
                    const script = document.createElement('script');
                    script.src = src;
                    script.async = true;
                    script.onload = onScriptLoad;
                    document.head.appendChild(script);
                } else {
                    // Se o script já existe (no HMR), considera-o carregado
                    onScriptLoad(); 
                }
            });
        };

        loadScripts();

        // Cleanup: Garante que os scripts não causem problemas ao sair da página (embora o A-Frame seja persistente)
        return () => {
             // Você pode adicionar uma lógica de 'cleanup' do A-Frame aqui se necessário, 
             // mas carregar dinamicamente é o suficiente para este exemplo.
        };
    }, []);

    if (!arReady) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
                <p>Carregando bibliotecas de Realidade Aumentada...</p>
            </div>
        );
    }

    // O AR.js e A-Frame usam a tag <a-scene> para iniciar a experiência.
    // O React renderiza esta string HTML bruta.
    return (
        <>
            <Head>
                <title>Experiência de Realidade Aumentada</title>
                {/* Estilos mínimos para garantir que a cena ocupe a tela toda */}
                <style>{`
                    body { margin: 0; overflow: hidden; }
                    .a-enter-vr { display: none !important; } /* Esconde botão nativo do A-Frame */
                `}</style>
            </Head>
            
            {/* A Cena AR deve ser injetada no DOM após o carregamento dos scripts.
                Usamos perigosamente o dangerouslySetInnerHTML para injetar a cena HTML/A-Frame.
                Isso é aceitável para o A-Frame/AR.js que dependem de tags customizadas.
            */}
            <div
                dangerouslySetInnerHTML={{
                    __html: `
                        <a-scene 
                            embedded 
                            vr-mode-ui="enabled: false" 
                            arjs='sourceType: webcam; detectionMode: mono; maxDetectionRate: 30; canvasWidth: 1280; canvasHeight: 960;'>

                            <a-marker type='pattern' url='/marcadores/pattern-hiro.patt'>
                            <a-marker preset='hiro'>
                                <!-- O Modelo 3D (Substitua por seu modelo GLTF ou GLB) -->
                                <a-box 
                                    position='0 0.5 0' 
                                    material='color: red; opacity: 0.8;' 
                                    animation="property: rotation; to: 0 360 0; loop: true; dur: 3000"
                                >
                                </a-box>
                                <!-- Você pode usar um modelo GLTF aqui:
                                <a-entity
                                    gltf-model="url(/modelos/teste/scene.gltf)"
                                    scale="0.5 0.5 0.5"
                                    rotation="0 0 0"
                                ></a-entity>
                                -->
                            </a-marker>

                            <!-- Câmera AR -->
                            <a-entity camera></a-entity>
                        </a-scene>
                    `
                }}
            />
        </>
    );
};

export default ARExperience;
