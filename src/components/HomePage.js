import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./HomePageStyles.css";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  const getPopularMovies = async () => {
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/movie/popular?api_key=119bb78ddc8035a2c84f5e8b74ec9243"
      );
      return response.data.results;
    } catch (error) {
      throw new Error("Failed to fetch popular movies");
    }
  };

  const searchMovies = async (query) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=119bb78ddc8035a2c84f5e8b74ec9243&query=${encodeURIComponent(
          query
        )}`
      );
      if (!response.ok) {
        throw new Error("Failed to search movies");
      }
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error("Error searching movies:", error);
      throw error;
    }
  };
  useEffect(() => {
    if (search.trim() === "") {
      fetchPopularMovies();
    } else {
      searchMovie();
    }
  }, [search]);

  const fetchPopularMovies = async () => {
    try {
      const movies = await getPopularMovies();
      setMovies(movies);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching movies:", error);
      setIsLoading(false);
      setError(error.message);
    }
  };

  const searchMovie = async () => {
    try {
      const movies = await searchMovies(search);
      setMovies(movies);
      setIsLoading(false);
    } catch (error) {
      console.error("Error searching movies:", error);
      setIsLoading(false);
      setError(error.message);
    }
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container">
      <div className="search">
        <input
          type="text"
          value={search}
          placeholder="Search movies..."
          onChange={handleSearchChange}
        />
      </div>

      <div className="movies">
        {movies.map((movie) => (
          <div className="card" key={movie.id}>
            <Link to={`/movies/${movie.id}`}>
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
              />
              <h3>{movie.title}</h3>
              <p>Release Date: {movie.release_date}</p>
              <p>Average Rating: {movie.vote_average}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
