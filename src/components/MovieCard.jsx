import "../css/MovieCard.css";
import { useMovieContext } from "../contexts/MovieContext";
function MovieCard({ movie }) {
  const { isFavorite, addToFavorites, removeFavorite } = useMovieContext();
  const favorite = isFavorite(movie.id);

  function makeFavoriteClick(e) {
    e.preventDefault();
    if (favorite) removeFavorite(movie.id);
    else addToFavorites(movie);
  }
  // ?.split("-")[0]  DISPLAYING ONLY YEAR
  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <div className="movie-overlay"></div>
        <button
          className={`favorite-btn ${favorite ? "active" : ""}`}
          onClick={makeFavoriteClick}
        >
          ♥
        </button>
      </div>
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p>{movie.release_date}</p>
      </div>
    </div>
  );
}
export default MovieCard;
