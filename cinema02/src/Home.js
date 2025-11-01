import React from 'react';
import { Link } from 'react-router-dom';

const filmesDestaque = [
  { id: 1, titulo: 'Interestelar', descricao: 'Viagem pelo espaço e tempo.', imagem: '/images/4238-cartaz.jpg' },
  { id: 2, titulo: 'F1: O Filme', descricao: 'Documentário sobre Fórmula 1.', imagem: '/images/0506.jpg' },
  { id: 3, titulo: 'A Hora do Mal', descricao: 'Suspense sobrenatural.', imagem: '/images/0304.jpg' },
  { id: 4, titulo: 'A Vida de Chuck', descricao: 'Drama baseado em Stephen King.', imagem: '/images/0203.jpg' },
  { id: 5, titulo: 'Invocação do Mal 4', descricao: 'O caso que encerrou tudo.', imagem: '/images/0102.jpg' },
];

const Home = () => {
  return (
    <div style={{ padding: '2rem', background: '#000', minHeight: '100vh', color: '#fff' }}>
      <h1>Cinema02</h1>
      <p>Bem-vindo ao Cinema02! Aqui você encontra informações sobre os melhores filmes.</p>
      <h2>Filmes em Destaque</h2>
      <ul>
        {filmesDestaque.map(filme => (
          <li key={filme.id} style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center' }}>
            <img
              src={filme.imagem}
              alt={filme.titulo}
              style={{ width: '120px', height: '180px', objectFit: 'cover', marginRight: '1rem', borderRadius: '8px' }}
            />
            <div>
              <strong>{filme.titulo}</strong>
              <p>{filme.descricao}</p>
              <Link to={`/detalhe?id=${filme.id}`}>Ver detalhes</Link>
            </div>
          </li>
        ))}
      </ul>
      <nav style={{ marginTop: '2rem' }}>
        <Link to="/detalhe">Ir para Detalhe</Link> |{' '}
        <Link to="/about">Sobre</Link>
      </nav>
    </div>
  );
};

export default Home;