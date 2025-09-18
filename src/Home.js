import React from 'react';
import { useHistory } from 'react-router-dom';

function Home() {
  const history = useHistory();
  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      padding: '2rem',
      background: 'linear-gradient(135deg, #111 60%, #222 100%)',
      color: '#fff',
      minHeight: '100vh',
      position: 'relative'
    }}>
      {/* Botão de Login no canto superior direito */}
      <button
        onClick={() => history.push('/login')}
        style={{
          position: 'absolute',
          top: '2rem',
          right: '2rem',
          background: '#FFD700',
          color: '#222',
          border: 'none',
          borderRadius: '6px',
          padding: '0.5rem 1.2rem',
          fontWeight: 'bold',
          cursor: 'pointer',
          boxShadow: '0 2px 8px #0006',
          zIndex: 10
        }}
      >
        Login
      </button>
      <header style={{
        marginBottom: '2rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <h1 style={{
          fontSize: '3rem',
          color: '#FFD700',
          textAlign: 'center',
          margin: 0,
          letterSpacing: '2px',
          textShadow: '2px 2px 8px #000'
        }}>CineTop</h1>
      </header>
      <section>
        <h2 style={{
          color: '#FFD700',
          textAlign: 'center',
          marginBottom: '2rem',
          letterSpacing: '1px'
        }}>Filmes em Destaque</h2>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '2rem',
            marginTop: '1rem'
          }}
        >
          {/* Filme 3 na esquerda */}
          <div
            style={{
              background: '#222',
              padding: '1rem',
              borderRadius: '12px',
              width: '200px',
              boxShadow: '0 4px 16px #0008',
              transition: 'transform 0.2s, box-shadow 0.2s',
              cursor: 'pointer'
            }}
            onClick={() => history.push('/filme/1')}
            onMouseOver={e => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 8px 24px #FFD70088';
            }}
            onMouseOut={e => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 16px #0008';
            }}
          >
            <img src="/images/0304.jpg" alt="Filme 3" style={{
              width: '100%',
              height: '300px',
              objectFit: 'cover',
              borderRadius: '8px'
            }} />
            <h3 style={{ margin: '0.5rem 0', color: '#FFD700', fontWeight: 'bold', fontSize: '1.2rem' }}>Filme 3</h3>
            <p style={{ color: '#ccc', margin: 0 }}>Drama, 2022</p>
          </div>
          {/* Filme 2 no centro */}
          <div
            style={{
              background: '#222',
              padding: '1rem',
              borderRadius: '12px',
              width: '200px',
              boxShadow: '0 4px 16px #0008',
              transition: 'transform 0.2s, box-shadow 0.2s',
              cursor: 'pointer'
            }}
            onClick={() => history.push('/filme/2')}
            onMouseOver={e => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 8px 24px #FFD70088';
            }}
            onMouseOut={e => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 16px #0008';
            }}
          >
            <img src="/images/0203.jpg" alt="Filme 2" style={{
              width: '100%',
              height: '300px',
              objectFit: 'cover',
              borderRadius: '8px'
            }} />
            <h3 style={{ margin: '0.5rem 0', color: '#FFD700', fontWeight: 'bold', fontSize: '1.2rem' }}>Filme 2</h3>
            <p style={{ color: '#ccc', margin: 0 }}>Comédia, 2023</p>
          </div>
          {/* Filme 1 na direita */}
          <div
            style={{
              background: '#222',
              padding: '1rem',
              borderRadius: '12px',
              width: '200px',
              boxShadow: '0 4px 16px #0008',
              transition: 'transform 0.2s, box-shadow 0.2s',
              cursor: 'pointer'
            }}
            onClick={() => history.push('/filme/3')}
            onMouseOver={e => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 8px 24px #FFD70088';
            }}
            onMouseOut={e => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 16px #0008';
            }}
          >
            <img src="/images/4238-cartaz.jpg" alt="Filme 1" style={{
              width: '100%',
              height: '300px',
              objectFit: 'cover',
              borderRadius: '8px'
            }} />
            <h3 style={{ margin: '0.5rem 0', color: '#FFD700', fontWeight: 'bold', fontSize: '1.2rem' }}>Filme 1</h3>
            <p style={{ color: '#ccc', margin: 0 }}>Ação, 2024</p>
          </div>
          {/* Filme 4 */}
          <div
            style={{
              background: '#222',
              padding: '1rem',
              borderRadius: '12px',
              width: '200px',
              boxShadow: '0 4px 16px #0008',
              transition: 'transform 0.2s, box-shadow 0.2s',
              cursor: 'pointer'
            }}
            onClick={() => history.push('/filme/4')}
            onMouseOver={e => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 8px 24px #FFD70088';
            }}
            onMouseOut={e => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 16px #0008';
            }}
          >
            <img src="/images/0506.jpg" alt="Filme 4" style={{
              width: '100%',
              height: '300px',
              objectFit: 'cover',
              borderRadius: '8px'
            }} />
            <h3 style={{ margin: '0.5rem 0', color: '#FFD700', fontWeight: 'bold', fontSize: '1.2rem' }}>Filme 4</h3>
            <p style={{ color: '#ccc', margin: 0 }}>Suspense, 2021</p>
          </div>
          {/* Filme 5 */}
          <div
            style={{
              background: '#222',
              padding: '1rem',
              borderRadius: '12px',
              width: '200px',
              boxShadow: '0 4px 16px #0008',
              transition: 'transform 0.2s, box-shadow 0.2s',
              cursor: 'pointer'
            }}
            onClick={() => history.push('/filme/5')}
            onMouseOver={e => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 8px 24px #FFD70088';
            }}
            onMouseOut={e => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 16px #0008';
            }}
          >
            <img src="/images/0102.jpg" alt="Filme 5" style={{
              width: '100%',
              height: '300px',
              objectFit: 'cover',
              borderRadius: '8px'
            }} />
            <h3 style={{ margin: '0.5rem 0', color: '#FFD700', fontWeight: 'bold', fontSize: '1.2rem' }}>Filme 5</h3>
            <p style={{ color: '#ccc', margin: 0 }}>Fantasia, 2020</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
