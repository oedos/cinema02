import React, { useState, useEffect } from 'react';
import './ProdutorPage.css';
import { adicionarFilme } from '../services/firebase';
import { db } from '../services/firebase';
import { collection, query, where, getDocs } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

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
  const [erroMedia, setErroMedia] = useState("");
  const [erroCapa, setErroCapa] = useState("");

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
      mediaType: file.type.startsWith("video") ? "video" : "image" // <-- só "video" ou "image"
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
    let mediaUrl = "";
    let capaUrl = "";
    setErroMedia("");
    setErroCapa("");
    // Upload da mídia (imagem ou vídeo)
    if (novoFilme.media) {
      try {
        const storage = getStorage();
        const storageRef = ref(storage, `midias/${Date.now()}_${novoFilme.media.name}`);
        console.log("Iniciando upload da mídia:", novoFilme.media, "para", storageRef.fullPath);
        await uploadBytes(storageRef, novoFilme.media);
        mediaUrl = await getDownloadURL(storageRef);
        console.log("URL da mídia obtida:", mediaUrl);
      } catch (err) {
        setErroMedia("Erro ao enviar mídia. Verifique o tipo e tamanho do arquivo.");
        console.error("Erro no upload da mídia:", err);
        return;
      }
    } else {
      setErroMedia("Selecione uma imagem ou vídeo.");
      return;
    }
    // Upload da capa (imagem)
    if (novoFilme.capa) {
      try {
        const storage = getStorage();
        const capaRef = ref(storage, `capas/${Date.now()}_${novoFilme.capa.name}`);
        await uploadBytes(capaRef, novoFilme.capa);
        capaUrl = await getDownloadURL(capaRef);
        console.log("URL da capa obtida:", capaUrl);
      } catch (err) {
        setErroCapa("Erro ao enviar imagem de capa.");
        console.error("Erro no upload da capa:", err);
        return;
      }
    }
    const filmeParaSalvar = {
      titulo: novoFilme.titulo,
      descricao: novoFilme.descricao,
      mediaUrl,
      mediaType: novoFilme.mediaType,
      capaUrl, // Salva a URL da capa
      produtorUid: userUID
    };
    try {
      console.log("Salvando filme no Firestore:", filmeParaSalvar);
      await adicionarFilme(filmeParaSalvar);
      setFilmes([...filmes, { id: Date.now(), ...filmeParaSalvar }]);
    } catch (err) {
      console.error('Erro ao salvar filme no Firestore:', err);
      setErroMedia("Erro ao salvar filme no banco de dados.");
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
      capaUrl: f.capaUrl
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
            capaUrl: novoFilme.capaUrl
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
              required
            />
          </label>
          <label>
            Imagem de Capa:
            <input
              type="file"
              name="capa"
              accept="image/*"
              onChange={handleCapa}
            />
          </label>
          {erroMedia && <div style={{color: 'red', marginBottom: 10}}>{erroMedia}</div>}
          {erroCapa && <div style={{color: 'red', marginBottom: 10}}>{erroCapa}</div>}
          {novoFilme.mediaUrl &&
            <div className="produtor-preview">
              <h3>Prévia:</h3>
              {novoFilme.mediaType === "image" &&
                <img src={novoFilme.mediaUrl} alt="Prévia" className="produtor-preview-img" />
              }
              {novoFilme.mediaType === "video" &&
                <video src={novoFilme.mediaUrl} controls width="250" className="produtor-preview-video" />
              }
            </div>
          }
          {novoFilme.capa && novoFilme.capaUrl &&
            <div className="produtor-preview">
              <h3>Prévia da Capa:</h3>
              <img src={novoFilme.capaUrl} alt="Prévia da Capa" className="produtor-preview-img" />
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