import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "./services/supabase";
import "./styles/MovieDetail.css";

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [nota, setNota] = useState("");
  const [comentario, setComentario] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [sucesso, setSucesso] = useState("");
  const [avaliacoes, setAvaliacoes] = useState([]);

  useEffect(() => {
    async function fetchFilme() {
      const { data, error } = await supabase
        .from("filmes")
        .select("*")
        .eq("id", id)
        .single();
      setMovie(data || null);
      setLoading(false);
    }
    fetchFilme();

    // Buscar avaliações do Supabase
    async function fetchAvaliacoes() {
      const { data, error } = await supabase
        .from("avaliacoes")
        .select("*")
        .eq("filmeId", id)
        .order("criadoEm", { ascending: false });
      setAvaliacoes(data || []);
    }
    fetchAvaliacoes();
  }, [id, sucesso]); // Atualiza ao enviar avaliação

  const handleBack = () => {
    navigate(-1);
  };

  const handleAvaliacao = async (e) => {
    e.preventDefault();
    setEnviando(true);
    setSucesso("");
    try {
      const { error } = await supabase.from("avaliacoes").insert([
        {
          filmeId: id,
          nota: Number(nota),
          comentario,
          criadoEm: new Date().toISOString(),
        },
      ]);
      if (error) throw error;
      setSucesso("Avaliação enviada com sucesso!");
      setNota("");
      setComentario("");
    } catch (err) {
      setSucesso("Erro ao enviar avaliação.");
    }
    setEnviando(false);
  };

  // Exemplo de shoppings e horários (pode ser dinâmico no futuro)
  const shoppings = [
    {
      nome: "Shopping Center Norte",
      horarios: ["14:00", "16:30", "19:00", "21:30"],
    },
    {
      nome: "Shopping Eldorado",
      horarios: ["13:45", "17:00", "20:15"],
    },
    {
      nome: "Shopping Morumbi",
      horarios: ["15:00", "18:00", "21:00"],
    },
  ];

  if (loading) return <div style={{ color: "#fff" }}>Carregando...</div>;
  if (!movie) return <div style={{ color: "#fff" }}>Filme não encontrado.</div>;

  return (
    <div className="movie-detail-container">
      <button className="back-button" onClick={handleBack}>
        Voltar
      </button>

      <div className="movie-detail-card">
        {movie.poster_path && (
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="movie-detail-poster"
          />
        )}
        <div className="movie-detail-info">
          <h1 className="movie-detail-title">{movie.title}</h1>
          <span className="movie-detail-rating">
            Avaliação: <b>{movie.vote_average}</b>
          </span>
          <h2 className="movie-detail-sinopse-title">Sinopse</h2>
          <p className="movie-detail-overview">{movie.overview}</p>

          {/* NOVA SEÇÃO: Shoppings e horários */}
          <div className="movie-shoppings-box">
            <h2 className="movie-shoppings-title">Onde assistir</h2>
            {shoppings.map((shop, idx) => (
              <div key={idx} className="movie-shopping-item">
                <div className="movie-shopping-nome">{shop.nome}</div>
                <div className="movie-shopping-horarios">
                  {shop.horarios.map((hora, hidx) => (
                    <button
                      key={hidx}
                      className="movie-horario-btn"
                      type="button"
                      onClick={() =>
                        navigate(
                          `/selecionar-cadeira/${id}/${encodeURIComponent(
                            shop.nome
                          )}/${hora}`
                        )
                      }
                    >
                      {hora}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Formulário de avaliação */}
      <div className="movie-avaliacao-box">
        <h2>Avalie este filme</h2>
        <form onSubmit={handleAvaliacao} className="movie-avaliacao-form">
          <label>
            Nota (0 a 10):<br />
            <input
              type="number"
              min="0"
              max="10"
              step="0.1"
              value={nota}
              onChange={(e) => setNota(e.target.value)}
              required
              style={{ width: 70, marginRight: 12 }}
            />
          </label>
          <br />
          <label>
            Comentário:<br />
            <textarea
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
              rows={3}
              required
              style={{ width: "100%", maxWidth: 340 }}
            />
          </label>
          <br />
          <button type="submit" disabled={enviando || !nota || !comentario}>
            {enviando ? "Enviando..." : "Enviar avaliação"}
          </button>
        </form>
        {sucesso && (
          <div
            className={sucesso.startsWith("Avaliação") ? "sucesso-msg" : "erro-msg"}
          >
            {sucesso}
          </div>
        )}
      </div>

      {/* Lista de avaliações */}
      <div className="movie-avaliacoes-lista">
        <h2>Comentários de outros usuários</h2>
        {avaliacoes.length === 0 && (
          <div className="movie-avaliacoes-vazio">Nenhum comentário ainda.</div>
        )}
        {avaliacoes.map((a, idx) => (
          <div key={idx} className="movie-avaliacao-item">
            <div className="movie-avaliacao-nota">
              Nota: <b>{a.nota}</b>
            </div>
            <div className="movie-avaliacao-comentario">{a.comentario}</div>
            <div className="movie-avaliacao-data">
              {a.criadoEm &&
                new Date(a.criadoEm).toLocaleString("pt-BR")}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MovieDetail;