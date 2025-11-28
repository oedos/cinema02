import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../services/firebase";
import { doc, getDoc } from "firebase/firestore";
import "./DetalheProdutor.css";

export default function DetalheProdutor() {
  const { id } = useParams();
  const [filme, setFilme] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchFilme() {
      try {
        const docRef = doc(db, "filmes", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setFilme(docSnap.data());
        } else {
          setFilme(null);
        }
      } catch (err) {
        setFilme(null);
      } finally {
        setLoading(false);
      }
    }
    fetchFilme();
  }, [id]);

  if (loading) return <div style={{ color: "#fff" }}>Carregando...</div>;
  if (!filme) return <div style={{ color: "#fff" }}>Filme não encontrado.</div>;

  console.log(filme); // Adicione esta linha para debug

  return (
    <div className="detalhe-produtor-bg">
      <div className="detalhe-produtor-container">
        <button className="detalhe-produtor-voltar" onClick={() => navigate(-1)}>Voltar</button>
        <h1 className="detalhe-produtor-titulo">{filme.titulo}</h1>
        <p className="detalhe-produtor-desc">{filme.descricao}</p>
        <div className="detalhe-produtor-midia" style={{ textAlign: "center", margin: "32px 0" }}>
          {/* Google Drive video embed */}
          {filme.mediaType === "video" && filme.mediaUrl && filme.mediaUrl.includes("drive.google.com") ? (
            <iframe
              src={`https://drive.google.com/file/d/${filme.mediaUrl.split("/d/")[1]?.split("/")[0]}/preview`}
              width="100%"
              height="360"
              allow="autoplay"
              style={{ maxWidth: 600, borderRadius: 8, background: "#000" }}
              title={filme.titulo}
            />
          ) : filme.mediaType === "video" && filme.mediaUrl ? (
            <video
              src={filme.mediaUrl}
              controls
              style={{ width: "100%", maxWidth: 600, borderRadius: 8, background: "#000" }}
              poster="/images/placeholder.png"
            />
          ) : filme.mediaType === "image" && filme.mediaUrl ? (
            <img
              src={filme.mediaUrl}
              alt={filme.titulo}
              style={{ maxWidth: "100%", borderRadius: 8, background: "#000" }}
            />
          ) : (
            <div style={{ color: "#dab300", fontWeight: "bold", padding: "40px 0" }}>
              <span style={{ fontSize: 48, display: "block", marginBottom: 12 }}>🎬</span>
              Nenhuma mídia disponível para este filme.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
