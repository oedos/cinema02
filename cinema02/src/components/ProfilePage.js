import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../services/supabase';
import './ProfilePage.css';

export default function ProfilePage() {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    let subscription = null;

    async function fetchProfileByUid(uid) {
      try {
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', uid)
          .single();

        if (!mounted) return;

        if (error) {
          // log detalhado para debug
          console.error('Erro ao buscar profile:', error);
          try { console.error('Erro detail JSON:', JSON.stringify(error)); } catch (e) {}
          // mensagens amigáveis
          if (error.code === 'PGRST100' || error.message?.includes('does not exist')) {
            setUserProfile({ __error: 'Tabela "profiles" não encontrada no banco.' });
          } else if (error.status === 403 || error.message?.toLowerCase().includes('permission')) {
            setUserProfile({ __error: 'Permissão negada. Verifique regras/RLS do Supabase.' });
          } else {
            setUserProfile(null);
          }
        } else {
          setUserProfile(profile);
        }
      } catch (err) {
        console.error('fetchProfileByUid exception:', err);
        if (mounted) setUserProfile(null);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    async function init() {
      setLoading(true);
      try {
        // Assíncrono: pega sessão atual
        const sessionResp = await supabase.auth.getSession();
        const uid = sessionResp?.data?.session?.user?.id || null;
        if (uid) {
          await fetchProfileByUid(uid);
        } else {
          setUserProfile(null);
          setLoading(false);
        }

        // inscrito para mudanças de auth (login/logout)
        if (supabase.auth && typeof supabase.auth.onAuthStateChange === 'function') {
          subscription = supabase.auth.onAuthStateChange((_event, session) => {
            const newUid = session?.user?.id || null;
            if (newUid) fetchProfileByUid(newUid);
            else {
              setUserProfile(null);
              setLoading(false);
            }
          });
        }
      } catch (err) {
        console.error('init fetchProfile exception:', err);
        setUserProfile(null);
        setLoading(false);
      }
    }

    init();

    return () => {
      mounted = false;
      if (subscription && typeof subscription.unsubscribe === 'function') subscription.unsubscribe();
    };
  }, []);

  if (loading) return <div>Carregando perfil...</div>;

  if (!userProfile) {
    return (
      <div style={{ padding: 24, textAlign: 'center', color: '#fff' }}>
        <p>Usuário não encontrado. Faça login.</p>
        <Link to="/login">
          <button style={{ padding: '8px 16px', borderRadius: 8, background: '#ffd700', border: 'none', cursor: 'pointer' }}>
            Ir para Login
          </button>
        </Link>
      </div>
    );
  }

  // se profile contém erro amigável, exibe
  if (userProfile.__error) {
    return (
      <div style={{ padding: 24, color: '#fff' }}>
        <p style={{ color: '#ffd700', fontWeight: 700 }}>Atenção</p>
        <p>{userProfile.__error}</p>
        <p>Verifique: tabela "profiles" existe, RLS/policies, e a chave anon/permissões.</p>
      </div>
    );
  }

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
            {userProfile.tipo === "produtor" && (
              <>
                <button
                  className="profilepage-editbtn"
                  onClick={() => navigate('/editar-perfil')}
                >
                  Editar perfil
                </button>
                <button
                  className="profilepage-addmoviebtn"
                  onClick={() => navigate('/produtor')}
                >
                  <span role="img" aria-label="Filme">🎬</span>
                  Adicionar filme
                </button>
              </>
            )}
            <button
              className="profilepage-logoutbtn"
              onClick={async () => {
                await supabase.auth.signOut();
                setUserProfile(null);
                navigate('/login');
              }}
            >
              Sair
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}