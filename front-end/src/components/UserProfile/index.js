import React from 'react';
import Image from 'next/image'; // Para otimização de imagens no Next.js
import style from "@/components/UserProfile/UserProfile.module.css";

const UserCard = ({ user, onLogout }) => {
  const defaultUser = {
    nome: "Larissa",
    usuario: "ltoyohashi",
    email: "ltoyohashi@gmail.com",
    atribuicao: "Administrador", // ou "Usuário Padrão"
    fotoPerfil: "/logo_quadrado.png" 
  };

  const currentUser = user || defaultUser;

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    alert('Usuário deslogado!'); 
  };

  return (
    <div className={style.userCardContainer}>
      <div className={style.userCard}>
        {/* Espaço para Foto de Perfil */}
        <div className={style.profileImageWrapper}>
          <Image
            src={currentUser.fotoPerfil}
            alt="Foto de Perfil"
            width={120} // Largura da imagem
            height={120} // Altura da imagem
            className={style.profileImage}
            priority // Otimiza o carregamento da imagem principal
          />
        </div>

        {/* Informações do Usuário */}
        <h2 className={style.userName}>{currentUser.nome}</h2>
        <p className={style.userInfo}>@{currentUser.usuario}</p>
        <p className={style.userInfo}>{currentUser.email}</p>
        <span className={style.userRole}>{currentUser.atribuicao}</span>

        {/* Botão de Logoff */}
        <button onClick={handleLogout} className={style.logoutButton}>
          <a href='http://localhost:3000/login'>Sair</a>
        </button>
      </div>
    </div>
  );
};

export default UserCard;