import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../services/firebase';
import { doc, getDoc } from 'firebase/firestore';
import './ProfilePage.css';

// Você pode passar o UID pelo auth.currentUser.uid, props, contexto, etc.
// Aqui, usando o UID fixo que você passou para exemplo:
const userUID = "OQXhNyiUgQgHpS1lwm7E68PTr083";

export default function ProfilePage() {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const docRef = doc(db, "users", userUID);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserProfile(docSnap.data());
        } else {
          setUserProfile(null);
        }
      } catch (error) {
        setUserProfile(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) return <div>Carregando perfil...</div>;
  if (!userProfile) return <div>Usuário não encontrado.</div>;

  return (
    <div className="profilepage-bg">
      <div className="profilepage-container">
        <h1 className="profilepage-title">Perfil</h1>
        <div className="profilepage-main">
          <img
            src={userProfile.avatar || "/images/avatar.png"}
            alt="Avatar"
            className="profilepage-avatar"
          />
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
              onClick={() => alert('Função de edição!')}
            >
              Editar perfil
            </button>
            <button
              className="profilepage-logoutbtn"
              onClick={() => alert('Logout!')}
            >
              Sair
            </button>
            {userProfile.isProdutor && (
              <button
                className="profilepage-prodbtn"
                onClick={() => navigate('/produtor')}
              >
                Ir para área de produtor
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}