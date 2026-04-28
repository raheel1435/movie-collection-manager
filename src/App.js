import { useState, useEffect } from 'react';
import MovieForm from './components/MovieForm';
import MovieList from './components/MovieList';
import Footer from './components/Footer';
import { fetchMovieData } from './components/MovieService';
import './App.css';

// REVIEW (UX, app-wide): Every user action — success, failure, validation, confirmation — is communicated through native alert()/confirm() dialogs. They block the entire UI thread, can't be styled, can't be dismissed by clicking outside, stack awkwardly on mobile, and force the user to acknowledge trivial events ("Movie added"). Replace with a non-blocking toast/snackbar system (one shared component) and reserve modal confirmations only for destructive actions like delete.
// REVIEW (UX, app-wide): There is no way to undo a destructive action. After deleting a movie the only feedback is an alert and the row is gone. Consider a 5-second "Undo" toast after delete instead of a confirm prompt.
function App() {

  //Loading State
  const [isLoading, setIsLoading] = useState(false);
  // local storage initialization
  // REVIEW: If the JSON parse fails (corrupted localStorage), the catch silently returns []. Consider clearing the bad key (localStorage.removeItem('movies')) so subsequent writes don't keep colliding with broken data, and log the error for debugging.
  // REVIEW: No schema/version guard. If the movie shape changes later, old persisted entries (missing watched/liked/id) will render incorrectly. Consider validating each entry and migrating, or storing a schema version.
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
        // REVIEW: Use the API's apiData.Error message for context (e.g. "Movie not found!", "Invalid API key", "Request limit reached"). Always showing "Movie not found" hides real failures like exhausted quota.
        // REVIEW: Native alert() blocks the UI thread, can't be styled, and is poor UX. Replace with an in-app toast/banner or inline error state.
        alert("Movie not found");
        return;
      }

      const newMovie = {
        // REVIEW: crypto.randomUUID() is only available on secure contexts (https or localhost). On http production deploys this will throw. Use a small fallback (e.g. uuid library, or `${Date.now()}-${Math.random()}`).
        id: crypto.randomUUID(),
        title: apiData.Title,
        year: apiData.Year,
        genre: apiData.Genre,
        // REVIEW: When OMDB returns "N/A" (no rating yet), Number("N/A") yields NaN. The card will render "⭐ NaN". Coerce to null and render "—" instead.
        rating: Number(apiData.imdbRating),
        poster: apiData.Poster,

        // updated state
        watched: false,
        liked: false,
      };


      // prevent duplicates of movies
      // REVIEW (UX): Duplicate detection only fires AFTER the API round-trip. The user types a title, waits for the loading spinner, then is told "already in your collection" — wasting their time and an API call. Check for the duplicate up-front against the typed title (case-insensitive), or live as they type, before calling fetchMovieData.
      // REVIEW: Duplicate detection is title-only and case-insensitive but does not account for year, so two distinct movies with the same name (e.g. "The Lion King" 1994 vs 2019) are wrongly rejected. Use a (title+year) composite key.
    setMovies((prev) => {
  const exists = prev.some(
    (m) => m.title.toLowerCase() === newMovie.title.toLowerCase()
  );
  if (exists) {
    // REVIEW: typo "colletion" → "collection".
    alert(`"${newMovie.title}" is already in your colletion`);
  return prev;
  }

  // REVIEW: Side effects (alert) inside a state updater function are an antipattern — React may invoke updater functions twice in StrictMode/dev, producing duplicate alerts. Move the alert outside setMovies.
  // Adding Confirmation
  alert (`"${newMovie.title}" Added Successfully`);
  return [newMovie, ...prev];
});
    } catch (error) {
      // REVIEW: The error is logged but the user always sees the same generic "Something went wrong" — no distinction between network failure, JSON parse, and bug. Surface a more specific message based on error type.
      console.error(error);
      alert("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteMovie = (id) => {
    const movieToDelete = movies.find(movie => movie.id === id);

    // REVIEW: Missing space in the prompt — "Confirm Deletion\"Title\"?" reads "DeletionTitle". Add a space: `Confirm deletion of "${...}"?`.
    // REVIEW: If movieToDelete is undefined (id not found) the confirm still asks "Confirm Deletion\"undefined\"?". Guard early with `if (!movieToDelete) return;`.
    if (window.confirm(`Confirm Deletion"${movieToDelete?.title}"?`)) {
    setMovies((prev) => prev.filter((movie) => movie.id !== id));

    // Deletion Confirmation
    // REVIEW: Leading space in the alert string is unintentional formatting noise.
    alert(` "${movieToDelete?.title}" Movie is Deleted`);
    }
  };

  // Update / Inline Edit
  // REVIEW: This handler is also wired to the "🔄 Refresh" button in MovieCard, which passes the unchanged movie. The function is named/used for two different intents (rename vs refresh) but only ever updates the title. Either rename to renameMovie and add a real refresh handler that re-fetches from OMDB, or split into two handlers.
 const updateMovie = (updatedMovie) => {
  setMovies((prev) =>
  prev.map((movie) =>
  movie.id === updatedMovie.id ? { ...movie, title:updatedMovie.title} : movie
));

 // REVIEW: Alert fires even when the title did not actually change (e.g. on the refresh button), which is misleading UX.
 alert(` Movie title updated to "${updatedMovie.title}"`);
};

  // save data to localStorage whenever movies state changes
  // REVIEW: This effect runs on initial mount, immediately overwriting localStorage with the same data we just read from it. Harmless, but consider gating with a ref to skip the first run, or debouncing for large lists.
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

      {/* REVIEW (UX): The loading indicator appears above the form, while the form itself stays fully interactive. The user can keep typing and submit again, queueing duplicate requests. Pass `isLoading` into MovieForm and disable the input/button while a request is in flight, ideally with a spinner inside the button. */}
      {isLoading && <div className="loading">Loading movie details...</div>}

      <MovieForm addMovie={addMovie} />

      {/* REVIEW: Duplicate empty state. MovieList already renders "No movies added yet." when the list is empty, so the user sees two empty-state messages. Pick one location. */}
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
