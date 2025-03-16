import { useContext, useEffect, useState, createContext } from "react";

const MovieContext = createContext();
export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  // Read from localStorage on initial load
  useEffect(() => {
    const storedFavs = localStorage.getItem("favorites");

    if (storedFavs) {
      const parsedFavs = JSON.parse(storedFavs);
      setFavorites(parsedFavs); // Update state with data from localStorage
    }
  }, []);

  // updejtaj to localStorage whenever favorites change
  useEffect(() => {
    if (favorites.length > 0) {
      // Only write if favorites is not empty inace sranje
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  }, [favorites]);

  const addToFavorites = (movie) => {
    setFavorites((prev) => [...prev, movie]);
  };

  const removeFavorite = (movieId) => {
    setFavorites((prev) => prev.filter((movie) => movie.id !== movieId));
  };

  // check if a movie is in favorites
  const isFavorite = (movieId) => {
    return favorites.some((movie) => movie.id === movieId);
  };

  const value = {
    favorites,
    addToFavorites,
    removeFavorite,
    isFavorite,
  };

  return (
    <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
  );
};
