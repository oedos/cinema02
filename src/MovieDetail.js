import React from 'react';
import { useParams, useHistory } from 'react-router-dom';

const movies = [
  {
    id: '1',
    title: 'Filme 3',
    image: '/images/0304.jpg',
    genre: 'Drama',
    year: 2022,
    description: 'Descrição detalhada do Filme 3.'
  },
  {
    id: '2',
    title: 'Filme 2',
    image: '/images/0203.jpg',
    genre: 'Comédia',
    year: 2023,
    description: 'Descrição detalhada do Filme 2.'
  },
  {
    id: '3',
    title: 'Filme 1',
    image: '/images/4238-cartaz.jpg',
    genre: 'Ação',
    year: 2024,
    description: 'Descrição detalhada do Filme 1.'
  },
  {
    id: '4',
    title: 'Filme 4',
    image: '/images/0506.jpg',
    genre: 'Suspense',
    year: 2021,
    description: 'Descrição detalhada do Filme 4.'
  },
  {
    id: '5',
    title: 'Filme 5',
    image: '/images/0102.jpg',
    genre: 'Fantasia',
    year: 2020,
    description: 'Descrição detalhada do Filme 5.'
  }
];

function MovieDetail() {
  const { id } = useParams();
  const history = useHistory();
  const movie = movies.find(m => m.id === id);

  if (!movie) return <div style={{ color: '#fff', padding: '2rem' }}>Filme não encontrado.</div>;

  return (
    <div style={{ color: '#fff', padding: '2rem', background: '#111', minHeight: '100vh' }}>
      <button onClick={() => history.goBack()} style={{ marginBottom: '1rem', background: '#FFD700', border: 'none', padding: '0.5rem 1rem', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>Voltar</button>
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
        <img
          src={movie.image}
          alt={movie.title}
          style={{ width: '250px', height: '375px', objectFit: 'cover', borderRadius: '8px', boxShadow: '0 4px 16px #0008', cursor: 'pointer' }}
          onClick={() => history.goBack()}
        />
        <div>
          <h1 style={{ color: '#FFD700', margin: 0 }}>{movie.title}</h1>
          <p style={{ margin: '0.5rem 0' }}><strong>Gênero:</strong> {movie.genre}</p>
          <p style={{ margin: '0.5rem 0' }}><strong>Ano:</strong> {movie.year}</p>
          <p style={{ margin: '1rem 0' }}>{movie.description}</p>
          {/* Botões de horários de exibição */}
          <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
            <button
              style={{
                background: '#FFD700',
                color: '#222',
                border: 'none',
                borderRadius: '6px',
                padding: '0.7rem 1.5rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontSize: '1rem'
              }}
              onClick={() => history.push({
                pathname: `/filme/${id}/assentos`,
                state: { horario: '18:00' }
              })}
            >
              18:00
            </button>
            <button
              style={{
                background: '#FFD700',
                color: '#222',
                border: 'none',
                borderRadius: '6px',
                padding: '0.7rem 1.5rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontSize: '1rem'
              }}
              onClick={() => history.push({
                pathname: `/filme/${id}/assentos`,
                state: { horario: '21:00' }
              })}
            >
              21:00
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
