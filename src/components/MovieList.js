import MovieCard from "./MovieCard";

// REVIEW: Stray double space between `toggleLiked` and `}` in the destructure — minor, but worth tidying.
// REVIEW (UX): There is no way to filter or sort the list — no search-within-collection, no filter by watched/liked, no sort by rating or year. Once a user adds 20+ movies the page becomes hard to navigate. Add at minimum a search filter and a "show only watched/liked" toggle.
// REVIEW (UX): No counts shown. The user can't tell at a glance how many movies they have, how many they've watched, or how many they've liked. Add a small summary line ("12 movies — 5 watched, 3 liked") above the grid.
function MovieList({ movies, deleteMovie, updateMovie, toggleWatched, toggleLiked   }) {
  return (
  <div>

    {/* REVIEW: The "Movies List" heading renders even when there are no movies, which looks awkward next to "No movies added yet." Hide it (or move into the non-empty branch). */}
    <h2>Movies List</h2>

    {/* REVIEW: This empty-state message duplicates the one rendered in App.js. The user currently sees both. Remove one. */}
    {movies.length === 0 ? (
      <p>No movies added yet.</p>
    ) : (
     <div className="movie-grid">
  {movies.map((movie) => (
    <MovieCard
      key={movie.id}
      movie={movie}
      deleteMovie={deleteMovie}
      updateMovie={updateMovie}
      toggleWatched={toggleWatched}
      toggleLiked={toggleLiked}
    />
  ))}
</div>
)}
</div>
);
}

export default MovieList;