import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './styles/Home.css';
import ProfileBox from './components/ProfileBox';
import { supabase } from './services/supabase';

const filmesDestaque = [
  { id: 157336, titulo: 'Interestelar', descricao: 'Viagem pelo espaço e tempo.', imagem: '/images/4238-cartaz.jpg' },
  { id: 911430, titulo: 'F1: O Filme', descricao: 'Documentário sobre Fórmula 1.', imagem: '/images/0506.jpg' },
  { id: 1078605, titulo: 'A Hora do Mal', descricao: 'Suspense sobrenatural.', imagem: '/images/0304.jpg' },
  { id: 842924, titulo: 'A Vida de Chuck', descricao: 'Drama baseado em Stephen King.', imagem: '/images/0203.jpg' },
  { id: 1038392, titulo: 'Invocação do Mal 4', descricao: 'O caso que encerrou tudo.', imagem: '/images/0102.jpg' },
];

const Home = () => {
  const [filmesProdutores, setFilmesProdutores] = useState([]);

  useEffect(() => {
    async function fetchFilmes() {
      const { data, error } = await supabase.from('filmes').select('*');
      if (!error) setFilmesProdutores(data || []);
    }
    fetchFilmes();
  }, []);

  return (
    <div style={{ padding: '2rem', background: '#000', minHeight: '100vh', color: '#fff' }}>
      <ProfileBox />

      {/* TÍTULO BONITO */}
      <div className="titulo-slogan-box">
        <h1 className="cinema02-titulo">
          <span className="emoji-filme" role="img" aria-label="Filme">🎬</span>
          <span className="cinema02-gradient">Cinema02</span>
        </h1>
        <p className="cinema02-slogan">
          Bem-vindo ao <b>Cinema02!</b> Aqui você encontra informações sobre os melhores filmes.
        </p>
      </div>

      {/* FILMES EM DESTAQUE */}
      <h2>Filmes em Destaque</h2>
      <ul className="filmes-lista">
        {filmesDestaque.map(filme => (
          <li key={filme.id} className="filme-card">
            <img src={filme.imagem} alt={filme.titulo} />
            <strong>{filme.titulo}</strong>
            <p>{filme.descricao}</p>
            <Link to={`/detalhe/${filme.id}`}>Ver detalhes</Link>
          </li>
        ))}
        {/* Filmes enviados pelos produtores */}
        {filmesProdutores.map(filme => (
          <li key={filme.id} className="filme-card">
            {filme.imagemHome && filme.imagemHome.includes("drive.google.com") ? (
              <img
                src={`https://drive.google.com/uc?export=view&id=${filme.imagemHome.split("/d/")[1]?.split("/")[0]}`}
                alt={filme.titulo}
              />
            ) : filme.imagemHome ? (
              <img src={filme.imagemHome} alt={filme.titulo} />
            ) : filme.capaUrl ? (
              <img src={filme.capaUrl} alt={filme.titulo} />
            ) : filme.mediaType === "image" && filme.mediaUrl ? (
              <img src={filme.mediaUrl} alt={filme.titulo} />
            ) : (
              <img
                src="/images/placeholder.png"
                alt="Sem imagem"
                style={{ width: "100%", maxWidth: 180, height: 240, objectFit: "cover", borderRadius: 8, marginBottom: "1rem", background: "#181818" }}
              />
            )}
            <strong>{filme.titulo}</strong>
            <p>{filme.descricao}</p>
            <Link to={`/detalhe-produtor/${filme.id}`}>Ver detalhes</Link>
          </li>
        ))}
      </ul>

      {/* NAV: aqui coloquei o botão FAQ */}
      <nav style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
           {/* Botão SOBRE com o mesmo estilo do FAQ */}
          <Link to="/about">
           <button
           style={{
             padding: "10px 18px",
             borderRadius: "8px",
             background: "#7c3aed",
             color: "white",
             fontWeight: "600",
             border: "none",
             cursor: "pointer"
           }}
    >
      Sobre
    </button>
  </Link>

        {/* Botão FAQ adicionado */}
        <Link to="/faq">
          <button style={{
            padding: "10px 18px",
            borderRadius: "8px",
            background: "#7c3aed",
            color: "white",
            fontWeight: "600",
            border: "none",
            cursor: "pointer"
          }}>
            FAQ
          </button>
        </Link>
      </nav>
    </div>
  );
};

export default Home;
