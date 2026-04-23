import { useState, useEffect } from 'react';
import MovieForm from './components/MovieForm';
import MovieList from './components/MovieList';
import Footer from './components/Footer';
import { fetchMovieData } from './components/MovieService';
import './App.css';

function App() {

  //Loading State
  const [isLoading, setIsLoading] = useState(false);
  // local storage initialization
 const [movies, setMovies] = useState(() => {
  try {
    const saved = localStorage.getItem('movies');
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
});

  // Toggle watched
const toggleWatched = (id) => {
  setMovies((prev) =>
    prev.map((movie) =>
      movie.id === id
        ? { ...movie, watched: !movie.watched }
        : movie
    )
  );
};

// Toggle liked
const toggleLiked = (id) => {
  setMovies((prev) =>
    prev.map((movie) =>
      movie.id === id
        ? { ...movie, liked: !movie.liked }
        : movie
    )
  );
};


  const addMovie = async (movie) => {
    try {

      setIsLoading(true);

      const apiData = await fetchMovieData(movie.title);

      if (apiData.Response === "False") {
        alert("Movie not found");
        return;
      }

      const newMovie = {
        id: crypto.randomUUID(),
        title: apiData.Title,
        year: apiData.Year,
        genre: apiData.Genre,
        rating: Number(apiData.imdbRating),
        poster: apiData.Poster,

        // updated state
        watched: false,
        liked: false,
      };


      // prevent duplicates of movies
    setMovies((prev) => {
  const exists = prev.some(
    (m) => m.title.toLowerCase() === newMovie.title.toLowerCase()
  );
  if (exists) {
    alert(`"${newMovie.title}" is already in your colletion`);
  return prev;
  }

  // Adding Confirmation
  alert (`"${newMovie.title}" Added Successfully`);
  return [newMovie, ...prev];
});
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteMovie = (id) => {
    const movieToDelete = movies.find(movie => movie.id === id);

    if (window.confirm(`Confirm Deletion"${movieToDelete?.title}"?`)) {
    setMovies((prev) => prev.filter((movie) => movie.id !== id));

    // Deletion Confirmation
    alert(` "${movieToDelete?.title}" Movie is Deleted`);
    }
  };
  
  // Update / Inline Edit
 const updateMovie = (updatedMovie) => {
  setMovies((prev) =>
  prev.map((movie) =>
  movie.id === updatedMovie.id ? { ...movie, title:updatedMovie.title} : movie
));

 alert(` Movie title updated to "${updatedMovie.title}"`);
};

  // save data to localStorage whenever movies state changes
  useEffect(() => {
    localStorage.setItem('movies', JSON.stringify(movies));
  }, [movies]);
  //===========

  return (
    <div className='App'>

      <main className='content'>
    <div className="app-container">
      <div className="hero">
        <h1>Welcome to Movie Collection Manager</h1>
        <p>Organize your movie collection with ease. Add, update, and track your favorite films all in one place.</p>
      </div>

      {isLoading && <div className="loading">Loading movie details...</div>}

      <MovieForm addMovie={addMovie} />

      {movies.length === 0 && (
        <div className="empty-state">
          <p>No movies yet. start now...</p>
        </div>
      )}

      <MovieList
        movies={movies}
        deleteMovie={deleteMovie}
        updateMovie={updateMovie}
        toggleWatched={toggleWatched}
        toggleLiked={toggleLiked}
      />
    </div>
    </main>
  <Footer />
  </div>
  );
}
export default App;
