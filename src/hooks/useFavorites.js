import { useState, useEffect } from "react";

const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (isLoaded) return;
    const favorite = JSON.parse(window.localStorage.getItem("favorites")) || [];
    if (favorite) setFavorites(favorite);
    setIsLoaded(true);
  }, []);

  const addFavorite = (id) => {
     if(favorites.includes(id)) return false;
    const newFavorites = [...favorites, id];
    setFavorites(newFavorites);
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
  };

  const removeFavorite = (id) => {
    const newFavorites = favorites.filter((favorite) => favorite !== id);
    setFavorites([...newFavorites]);
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
  };

  return [favorites, addFavorite, removeFavorite];
};

export default useFavorites;
