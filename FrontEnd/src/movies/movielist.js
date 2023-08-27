import React, { useState } from 'react';
import { IMG_URL, getcolor } from '../App';

function MovieList({ movies, onMovieClick }) {
  const [showAlert, setShowAlert] = useState(false);

  const handleAddToFavorites = (e) => {
    e.stopPropagation();
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 3000); // Hide the alert after 3 seconds
  };

  return (
    <main id="main">
      {movies.map((movie) => (
        <div key={movie.id} className="movie" onClick={() => onMovieClick(movie)}>
          <img src={`${IMG_URL}${movie.poster_path}`} alt={movie.title} />

          <div className="movieInfo">
            <h3>{movie.title}</h3>
            <span className={getcolor(movie.vote_average)}>{movie.vote_average}</span>
          </div>

          <div className="movieOverview">
            <h3>Overview</h3>
            <div className="overview-heart">
              <button className="heart-button" onClick={handleAddToFavorites}>
                &#10084;
              </button>
              <p>{movie.overview}</p>
            </div>
            <button className="trailer" id={movie.id}>
              Trailer
            </button>
            <button className="rate">
              Rate
            </button>
          </div>
        </div>
      ))}
      {showAlert && <div className="alert">Added to your favorites</div>}
    </main>
  );
}

export default MovieList;
