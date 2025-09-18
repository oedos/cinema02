import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';

// Dados dos filmes (mesmo array usado em MovieDetail.js)
const movies = [
  {
    id: '1',
    title: 'Filme 3',
    image: '/images/0304.jpg',
    genre: 'Drama',
    year: 2022
  },
  {
    id: '2',
    title: 'Filme 2',
    image: '/images/0203.jpg',
    genre: 'Comédia',
    year: 2023
  },
  {
    id: '3',
    title: 'Filme 1',
    image: '/images/4238-cartaz.jpg',
    genre: 'Ação',
    year: 2024
  },
  {
    id: '4',
    title: 'Filme 4',
    image: '/images/0506.jpg',
    genre: 'Suspense',
    year: 2021
  },
  {
    id: '5',
    title: 'Filme 5',
    image: '/images/0102.jpg',
    genre: 'Fantasia',
    year: 2020
  }
];

function Pagamento() {
  const history = useHistory();
  const location = useLocation();
  const seats = (location.state && location.state.seats) || [];
  const horario = (location.state && location.state.horario) || '';

  // Corrigido: pega o id do filme do state, se existir, senão tenta pela URL
  const movieId =
    (location.state && location.state.filmeId) ||
    (location.pathname.match(/\/filme\/(\d+)\/assentos/) && location.pathname.match(/\/filme\/(\d+)\/assentos/)[1]);

  const movie = movies.find(m => m.id === movieId);

  // Função para converter "11-9" em "L10"
  const formatSeat = seatId => {
    const [row, col] = seatId.split('-').map(Number);
    return `${String.fromCharCode(65 + row)}${col + 1}`;
  };

  const handleFinish = () => {
    alert('Pagamento realizado com sucesso!');
    history.push('/');
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #111 60%, #222 100%)',
      color: '#fff',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '2rem'
    }}>
      <h2 style={{
        color: '#FFD700',
        marginBottom: '2rem',
        letterSpacing: '1px',
        fontSize: '2rem',
        textShadow: '2px 2px 8px #000'
      }}>
        Pagamento
      </h2>
      <div style={{
        background: '#222',
        padding: '2rem',
        borderRadius: '12px',
        boxShadow: '0 4px 16px #0008',
        width: '350px',
        marginBottom: '2rem'
      }}>
        {/* Exibe o filme selecionado */}
        {movie && (
          <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
            <img src={movie.image} alt={movie.title} style={{ width: '120px', height: '180px', objectFit: 'cover', borderRadius: '8px', boxShadow: '0 2px 8px #0008' }} />
            <div style={{ color: '#FFD700', fontWeight: 'bold', marginTop: '0.5rem' }}>{movie.title}</div>
            <div style={{ color: '#ccc', fontSize: '0.95rem' }}>{movie.genre}, {movie.year}</div>
          </div>
        )}
        <h3 style={{ color: '#FFD700', marginBottom: '1rem' }}>Assentos Selecionados:</h3>
        <div style={{ marginBottom: '1rem', color: '#FFD700', fontWeight: 'bold' }}>
          {seats.length > 0
            ? seats.map(formatSeat).join(', ')
            : 'Nenhum assento selecionado.'}
        </div>
        <div style={{ marginBottom: '1.5rem', color: '#FFD700', fontWeight: 'bold' }}>
          Horário: {horario}
        </div>
        <form>
          <div style={{ marginBottom: '1rem' }}>
            <label>Nome no Cartão:</label>
            <input type="text" style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: 'none', marginTop: '0.3rem' }} />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label>Número do Cartão:</label>
            <input type="text" maxLength={16} style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: 'none', marginTop: '0.3rem' }} />
          </div>
          <div style={{ marginBottom: '1rem', display: 'flex', gap: '1rem' }}>
            <div style={{ flex: 1 }}>
              <label>Validade:</label>
              <input type="text" placeholder="MM/AA" maxLength={5} style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: 'none', marginTop: '0.3rem' }} />
            </div>
            <div style={{ flex: 1 }}>
              <label>CVV:</label>
              <input type="password" maxLength={4} style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: 'none', marginTop: '0.3rem' }} />
            </div>
          </div>
          <button
            type="button"
            onClick={handleFinish}
            style={{
              width: '100%',
              background: '#FFD700',
              color: '#222',
              border: 'none',
              borderRadius: '6px',
              padding: '0.7rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              marginTop: '1rem'
            }}
          >
            Finalizar Pagamento
          </button>
        </form>
      </div>
    </div>
  );
}

export default Pagamento;
