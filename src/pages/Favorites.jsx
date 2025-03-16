import "../css/Favorites.css";
import { useMovieContext } from "../contexts/MovieContext";
import MovieCard from "../components/movieCard";

function Favorites() {
  const { favorites } = useMovieContext();

  return (
    <div className="favorites">
      <h2>Your ❤️!</h2>
      {favorites.length === 0 ? ( // Check if favorites array is empty
        <div className="favorites-empty">
          <h2>None Yet!</h2>
          <p>Click ❤️ on your favorite movies and they will appear here!😉</p>
        </div>
      ) : (
        <div className="movies-grid">
          {favorites.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;
