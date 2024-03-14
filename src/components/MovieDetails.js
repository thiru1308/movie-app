import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./MovieStyles.css";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  const getMovieDetails = async (id) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=119bb78ddc8035a2c84f5e8b74ec9243`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch movie details");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching movie details:", error);
      throw error;
    }
  };

  useEffect(() => {
    fetchMovieDetails();
  }, []);

  const fetchMovieDetails = async () => {
    try {
      const movieData = await getMovieDetails(id);
      setMovie(movieData);
    } catch (error) {
      console.error("Error fetching moviedetails:", error);
    }
  };

  if (!movie) {
    return <p>Loading movie details...</p>;
  }

  return (
    <div className="details">
      <div className="home">
        <Link to="/" className="link-text">
          Home
        </Link>
      </div>
      <div className="card">
        <h2 className="title">{movie.title}</h2>
        <div className="content">
          <div className="img">
            <img
              className="poster"
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.title}
            />
          </div>

          <div className="info">
            <p>Release Date: {movie.release_date}</p>
            <p>Rating: {movie.vote_average}</p>
            <p>Genre: {movie.genres.map((genre) => genre.name).join(", ")}</p>
            <p>Overview: {movie.overview}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
