import MovieCard from "../components/movieCard";
import { useState, useEffect } from "react";
import "../css/Home.css";
import { searchMovies, getPopularMovies } from "../services/api";
function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(
    () => {
      const loadPopularMovies = async () => {
        try {
          const popularMovies = await getPopularMovies();
          setMovies(popularMovies);
        } catch (err) {
          console.log(err);
          setError("Failed to load movies...");
        } finally {
          setLoading(false);
        }
      };
      loadPopularMovies();
    },
    //one to store loading state and one to store error
    []
  );

  const handleSearch = async (e) => {
    e.preventDefault();
    // da nemoze search results napraviti sa empty space string only i znakove neke
    if (!searchQuery.trim()) return;
    // no search if we are searching for something else
    if (loading) return;
    //indicate on screen we are currently loading results
    setLoading(true);
    try {
      const searchResults = await searchMovies(searchQuery);
      setMovies(searchResults);
      //if we had an error before we clear it when we load this time
      setError(null);
    } catch (err) {
      console.log(err);
      setError("Failed to search movies...");
    } finally {
      setLoading(false);
    }
    // leave it empty ako zelis ja neću
    // setSearchQuery("");
  };

  ////////////////////////////////////////////////////////
  return (
    <div className="home">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for movies..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
      {error && <div className="error-message">{error}</div>}
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="movies-grid">
          {movies.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      )}
    </div>
  );
}
////////////////////////////////////////////////
export default Home;
