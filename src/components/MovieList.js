import MovieCard from "./MovieCard";

function MovieList({ movies, deleteMovie, updateMovie, toggleWatched, toggleLiked   }) {
  return (
  <div>

    <h2>Movies List</h2>

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