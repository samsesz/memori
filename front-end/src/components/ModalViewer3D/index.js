import { Suspense } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls, Html, useProgress } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

// Reutiliza os estilos do seu formulário para o popup
import formStyle from "@/components/ConsultarModelagens/ConsultarModelagens.module.css";
// CSS específico para o canvas 3D
import style from './ModalViewer3D.module.css';

// Componente interno que exibe um "Carregando..."
function Loader() {
  const { progress } = useProgress();
  return <Html center>{progress.toFixed(1)} % carregado</Html>;
}

// Componente interno que carrega e exibe o modelo 3D
function Modelo3D({ urlModelo }) {
  // useLoader é um hook do react-three-fiber que usa o Suspense
  const gltf = useLoader(GLTFLoader, urlModelo);
  
  // <primitive> renderiza a cena 3D inteira do arquivo
  return <primitive object={gltf.scene} scale={1.5} />;
}

// O componente principal do Modal
const ModalViewer3D = ({ onClose, urlModelo }) => {
  return (
    // 1. O Fundo escuro (Overlay)
    <div className={formStyle.modalOverlay} onClick={onClose}>
      
      {/* 2. O Card do Modal (reutiliza .formModelagens) */}
      <div 
        className={`${formStyle.formModelagens} ${formStyle.modalContent}`} 
        onClick={(e) => e.stopPropagation()}
      >
        {/* 3. Botão de Fechar */}
        <button onClick={onClose} className={formStyle.closeButton}>&times;</button>
        
        <p className={formStyle.formTitle}>Visualizador 3D</p>

        {/* 4. O Container do Canvas 3D */}
        <div className={style.canvasContainer}>
          <Canvas camera={{ position: [5, 5, 5], fov: 30 }}>
            {/* Luz ambiente para o modelo não ficar preto */}
            <ambientLight intensity={1.5} />
            {/* Luz direcional (como o sol) */}
            <directionalLight position={[10, 10, 5]} intensity={2} />
            
            {/* <Suspense> mostra o <Loader> enquanto o modelo carrega */}
            <Suspense fallback={<Loader />}>
              <Modelo3D urlModelo={urlModelo} />
            </Suspense>
            
            {/* Permite que o usuário rotacione o modelo com o mouse */}
            <OrbitControls />
          </Canvas>
        </div>
      </div>
    </div>
  );
};

export default ModalViewer3D;