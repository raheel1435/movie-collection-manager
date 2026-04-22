
import {useState} from "react";

function MovieCard({ movie, deleteMovie, updateMovie, toggleWatched, toggleLiked }) {

  const [isEditing, setIsEditing] = useState(false); // Local Edit Mode
  const [editTitle, setEditTitle] = useState(movie.title); // Temp Title

  const poster =
    movie.poster && movie.poster !== "N/A"
      ? movie.poster
      : "https://via.placeholder.com/300x450?text=No+Image";

      // Handle Save
      const handleSave = () => {
        if (!editTitle.trim()) {
          alert("Title cannot be empty")
          return;
        }

        updateMovie({
          ...movie, title: editTitle.trim()
        });
        setIsEditing(false);
      };

      // Handel Cancel
      const handleCancel = () => {
        setEditTitle(movie.title); // Reset
        setIsEditing(false);
      };
    

  return (
    <div className="movie-card">

      <img className="poster" src={poster} alt={movie.title} />

      <div className="movie-info">

      {/* Inline Edit Title */}
      {isEditing ? (
        <input 
        value={editTitle}
        onChange={(e) => setEditTitle(e.target.value)}
        className="edit-input"
        />
      ) : (
        <h3>{movie.title}</h3>
      )}

      
      <p>{movie.year}</p>
      <p>{movie.genre}</p>
      <p>⭐ {movie.rating}</p>
      </div>

      <div className="actions">

        <button className={movie.watched ? "active" : ""}
        onClick={() => toggleWatched(movie.id)}
        title={movie.watched ? "Mark as unwatched" : "Mark as watched"}
        >
          👁
        </button>

        <button className={movie.liked ? "active" : ""}
        onClick={() => toggleLiked(movie.id)}
        title={movie.liked ? "Remove from likes" : "Like this movie"}>

          {movie.liked ? "❤️" : "🤍"}
        </button>

        {!isEditing ? (
          <button onClick={() => setIsEditing(true)}
            title="Edit"
            >
            ✏️
          </button>
        ) : ( 
          <>
          <button onClick={handleSave} title="Save Changes">✅</button>
          <button onClick={handleCancel} title="Cancel Editing">❌</button>
          </>
        )}
       
        <button onClick={() => updateMovie(movie)}
          title="Refresh movie data">
         🔄
          </button>

        <button onClick={() => deleteMovie(movie.id)}
          title="Delete">
         🗑
        </button>
      </div>
    </div>
  );
}

export default MovieCard;