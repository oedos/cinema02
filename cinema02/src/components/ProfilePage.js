import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfilePage.css';

const userProfile = {
  nome: "Usuário Exemplo",
  email: "usuario@exemplo.com",
  avatar: "/images/avatar.png" // imagem do /public/images/
};

const ProfilePage = () => {
  const navigate = useNavigate();

  return (
    <div className="profilepage-bg">
      <div className="profilepage-container">
        <h1 className="profilepage-title">Perfil</h1>
        <div className="profilepage-main">
          <img src={userProfile.avatar} alt="Avatar" className="profilepage-avatar" />
          <div className="profilepage-info">
            <div className="profilepage-row">
              <span className="profilepage-label">Nome:</span>
              <span className="profilepage-value">{userProfile.nome}</span>
            </div>
            <div className="profilepage-row">
              <span className="profilepage-label">Email:</span>
              <span className="profilepage-value">{userProfile.email}</span>
            </div>
            <button 
              className="profilepage-editbtn" 
              onClick={()=>alert('Função de edição!')}
            >
              Editar perfil
            </button>
            <button 
              className="profilepage-logoutbtn" 
              onClick={()=>alert('Logout!')}
            >
              Sair
            </button>
            <button 
              className="profilepage-prodbtn"
              onClick={()=>navigate('/produtor')}
            >
              Ir para área de produtor
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;