import React, { useState, useEffect } from 'react';
import './ProdutorPage.css';
import { adicionarFilme } from '../services/firebase';
import { db } from '../services/firebase';
import { collection, query, where, getDocs } from "firebase/firestore";

// UID fixo de exemplo (use o mesmo do ProfilePage)
const userUID = "OQXhNyiUgQgHpS1lwm7E68PTr083";

export default function ProdutorPage() {
  const [filmes, setFilmes] = useState([]);
  const [editId, setEditId] = useState(null);
  const [novoFilme, setNovoFilme] = useState({
    titulo: "",
    descricao: "",
    media: null,
    mediaUrl: "",
    mediaType: "",
    capa: null,
    capaUrl: ""
  });

  // Carrega os filmes do produtor ao abrir a tela
  useEffect(() => {
    async function fetchFilmes() {
      const q = query(collection(db, "filmes"), where("produtorUid", "==", userUID));
      const querySnapshot = await getDocs(q);
      const filmesDoProdutor = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setFilmes(filmesDoProdutor);
    }
    fetchFilmes();
  }, []);

  function handleChange(e) {
    setNovoFilme({ ...novoFilme, [e.target.name]: e.target.value });
  }

  function handleMedia(e) {
    const file = e.target.files[0];
    if (!file) return;
    setNovoFilme({
      ...novoFilme,
      media: file,
      mediaUrl: URL.createObjectURL(file),
      mediaType: file.type.startsWith("video") ? "video" : "image"
    });
  }

  function handleCapa(e) {
    const file = e.target.files[0];
    if (!file) return;
    setNovoFilme({
      ...novoFilme,
      capa: file,
      capaUrl: URL.createObjectURL(file)
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const filmeParaSalvar = {
      titulo: novoFilme.titulo,
      descricao: novoFilme.descricao,
      mediaUrl: novoFilme.mediaUrl,
      mediaType: novoFilme.mediaType,
      capaUrl: novoFilme.capaUrl, // Agora é um arquivo local (URL temporária)
      produtorUid: userUID
    };
    try {
      await adicionarFilme(filmeParaSalvar);
      setFilmes([...filmes, { id: Date.now(), ...filmeParaSalvar }]);
    } catch (err) {
      console.error('Erro ao salvar filme no Firestore:', err);
    }
    setNovoFilme({
      titulo: "",
      descricao: "",
      media: null,
      mediaUrl: "",
      mediaType: "",
      capa: null,
      capaUrl: ""
    });
  }

  function handleRemove(id) {
    setFilmes(filmes.filter(f => f.id !== id));
  }

  function handleEdit(id) {
    const f = filmes.find(f => f.id === id);
    setEditId(id);
    setNovoFilme({
      titulo: f.titulo,
      descricao: f.descricao,
      media: null,
      mediaUrl: f.mediaUrl,
      mediaType: f.mediaType,
      capa: null,
      capaUrl: f.capaUrl // Adiciona capaUrl na edição
    });
  }

  function handleSaveEdit(e) {
    e.preventDefault();
    setFilmes(filmes.map(f =>
      f.id === editId
        ? {
            ...f,
            titulo: novoFilme.titulo,
            descricao: novoFilme.descricao,
            mediaUrl: novoFilme.mediaUrl,
            mediaType: novoFilme.mediaType,
            capaUrl: novoFilme.capaUrl // Salva capaUrl na edição
          }
        : f
    ));
    setEditId(null);
    setNovoFilme({
      titulo: "",
      descricao: "",
      media: null,
      mediaUrl: "",
      mediaType: "",
      capa: null,
      capaUrl: ""
    });
  }

  function handleCancelEdit() {
    setEditId(null);
    setNovoFilme({
      titulo: "",
      descricao: "",
      media: null,
      mediaUrl: "",
      mediaType: "",
      capa: null,
      capaUrl: ""
    });
  }

  return (
    <div className="produtor-bg">
      <div className="produtor-container">
        <h1 className="produtor-title">Área do Produtor</h1>
        {/* Formulário para cadastrar ou editar */}
        <form className="produtor-form" onSubmit={editId ? handleSaveEdit : handleSubmit}>
          <label>
            Título do Filme:
            <input
              type="text"
              name="titulo"
              value={novoFilme.titulo}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Descrição/Sinopse:
            <textarea
              name="descricao"
              value={novoFilme.descricao}
              onChange={handleChange}
              rows={4}
              required
            />
          </label>
          <label>
            Imagem ou Vídeo:
            <input
              type="file"
              name="media"
              accept="image/*,video/*"
              onChange={handleMedia}
            />
          </label>
          <label>
            Imagem da Capa/Cartaz:
            <input
              type="file"
              name="capa"
              accept="image/*"
              onChange={handleCapa}
              required
            />
          </label>
          {novoFilme.mediaUrl &&
            <div className="produtor-preview">
              <h3>Prévia:</h3>
              {novoFilme.mediaType === "image" &&
                <img src={novoFilme.mediaUrl} alt="Prévia" />
              }
              {novoFilme.mediaType === "video" &&
                <video src={novoFilme.mediaUrl} controls width="250" />
              }
            </div>
          }
          {novoFilme.capaUrl &&
            <div className="produtor-preview">
              <h3>Prévia do Cartaz:</h3>
              <img src={novoFilme.capaUrl} alt="Prévia do Cartaz" />
            </div>
          }
          <div style={{display: "flex", gap: "10px", marginTop: "20px"}}>
            <button className="produtor-btn" type="submit">
              {editId ? "Salvar edição" : "Cadastrar Filme"}
            </button>
            {editId &&
              <button className="produtor-btn" type="button" style={{background:'#802020', color:'#fff'}} onClick={handleCancelEdit}>
                Cancelar
              </button>
            }
          </div>
        </form>

        {/* Lista dos filmes cadastrados */}
        <div className="produtor-filmes-lista">
          <h2>Meus filmes cadastrados:</h2>
          {filmes.length === 0 && <p>Nenhum filme cadastrado ainda.</p>}
          {filmes.map(filme => (
            <div key={filme.id} className="produtor-filme-card">
              <div className="produtor-filme-media">
                {filme.mediaType === "image" && filme.mediaUrl &&
                  <img src={filme.mediaUrl} alt="Filme" />
                }
                {filme.mediaType === "video" && filme.mediaUrl &&
                  <video src={filme.mediaUrl} controls width="120" />
                }
              </div>
              <div>
                <div className="produtor-filme-titulo">{filme.titulo}</div>
                <div className="produtor-filme-desc">{filme.descricao}</div>
                <div className="produtor-filme-actions">
                  <button onClick={() => handleEdit(filme.id)} className="produtor-edit">Editar</button>
                  <button onClick={() => handleRemove(filme.id)} className="produtor-remove">Remover</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}