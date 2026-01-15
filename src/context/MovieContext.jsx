import { createContext, useState, useContext, useEffect } from "react";

const MovieContext = createContext();

// this is a function
export const useMovieContext = () => useContext(MovieContext)

// provides state to any of the components that are wrapped around it
export const MovieProvider = ({children}) => { // children is a reserved PROP when u write a component & is anything that's inside of the component rendered
    const [favorites, setFavorites] = useState([]);
    
    useEffect(() => {
        const storedFavs = localStorage.getItem("favorites");

        if (storedFavs) setFavorites(JSON.parse(storedFavs));
    }, [])

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites))
    }, [favorites])

    // add to favs by using state 
    const addToFavorites = (movie) => {
        setFavorites(prev => [...prev, movie]) // prev = previous values
    }

    const removeFromFavorites = (movieId) => {
        setFavorites(prev => prev.filter(movie => movie.id !== movieId))
    };

    const isFavorite = (movieId) => {
        return favorites.some(movie => movie.id === movieId)
    }

    const value = {
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite
    }

    return <MovieContext.Provider value={value}>
        { children }
    </MovieContext.Provider>
}