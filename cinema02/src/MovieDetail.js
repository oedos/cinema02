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
      const request = await fetchMovies(`movie/${id}?api_key=YOUR_API_KEY&language=pt-BR`);
      setMovie(request.data);
    }
    fetchData();
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="movie-detail">
      <button onClick={handleBack}>Voltar</button>
      <h1>{movie.title}</h1>
      <p>{movie.overview}</p>
      <span>Avaliação: {movie.vote_average}</span>
    </div>
  );
}

export default MovieDetail;