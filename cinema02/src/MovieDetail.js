import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchMovies } from './services/api';
import './styles/MovieDetail.css';

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const request = await fetchMovies(`movie/${id}?api_key=03e81f84616e91119defeb48cf87d32b&language=pt-BR`);
      setMovie(request.data);
    }
    fetchData();
  }, [id]);

  if (!movie) {
    return <div className="movie-detail-loading">Carregando detalhes...</div>;
  }

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="movie-detail-container">
      <button className="back-button" onClick={handleBack}>Voltar</button>
      
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
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;