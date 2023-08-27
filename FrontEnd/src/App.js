import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './header';
import MovieList from './movies/movielist';
import Login from './login';
import Register from './register';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import BrowserRouter, Route, and Routesimport Login from './login'; // Import the Login component

export const API_KEY = 'api_key=2e65e5f5c5ba081b6ec96ea651bafe73';
export const BASE_URL = 'https://api.themoviedb.org/3';
export const API_URL = BASE_URL + '/movie/popular?language=en-US&page=1&' + API_KEY;
export const IMG_URL = 'https://image.tmdb.org/t/p/w500';
export const SEARCH_URL = BASE_URL + '/search/movie?' + API_KEY;

export function getcolor(vote) {
  if (vote >= 8) {
    return 'promoter';
  }
  if (vote >= 6) {
    return 'moderate';
  } else {
    return 'poor';
  }
}

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [overlayContent, setOverlayContent] = useState('');

  useEffect(() => {
    getMovies(API_URL);
  }, []);

  const getMovies = (url) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        showMovies(data.results);
      });
  };

  const showMovies = (data) => {
    setMovies(data);
  };

  const openNav = (movie) => {
    const movie_Id = movie.id;
    fetch(BASE_URL + '/movie/' + movie_Id + '/videos?' + API_KEY)
      .then((res) => res.json())
      .then((videoData) => {
        if (videoData.results.length > 0) {
          let embed = [];
          videoData.results.forEach((video) => {
            const { name, key, site } = video;
            if (site === 'YouTube') {
              embed.push(
                <iframe
                  key={key}
                  width="560"
                  height="315"
                  src={`https://www.youtube.com/embed/${key}`}
                  title={name}
                  className="embed"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              );
            }
          });
          setOverlayContent(embed);
        } else {
          setOverlayContent(<h1>No Trailers Found</h1>);
        }
        document.getElementById('myNav').style.width = '100%';
      });
  };

  const closeNav = () => {
    document.getElementById('myNav').style.width = '0%';
  };

  const handleSearch = (e) => {
    e.preventDefault();

    if (searchTerm) {
      getMovies(SEARCH_URL + '&query=' + searchTerm);
    } else {
      getMovies(API_URL);
    }
  };

  return (
    <div className="App">
      <Header
        searchTerm={searchTerm}
        onSearchChange={(e) => setSearchTerm(e.target.value)}
        onSearchSubmit={handleSearch}
      />
      <div id="myNav" className="overlay">
        <button className="closebtn" onClick={closeNav}>
          &times;
        </button>
        <div className="overlay-content" id="overlay-content">
          {overlayContent}
        </div>
      </div>
      <Routes>
        {/* Define your routes within the Router component */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<MovieList movies={movies} onMovieClick={(movie) => openNav(movie)} />} />
          </Routes>
    </div>
  );
}

export default App;
