
import {useState} from "react";

function MovieCard({ movie, deleteMovie, updateMovie, toggleWatched, toggleLiked }) {

  const [isEditing, setIsEditing] = useState(false); // Local Edit Mode
  // REVIEW: editTitle is initialized from movie.title only on first mount. If movie.title later changes via parent (e.g. after refresh), the input still shows the old value. Sync via useEffect on movie.title or reset when entering edit mode.
  const [editTitle, setEditTitle] = useState(movie.title); // Temp Title

  // REVIEW: via.placeholder.com was shut down in 2024 and now resolves intermittently. Replace with a local fallback asset in /public or use https://placehold.co/300x450.
  const poster =
    movie.poster && movie.poster !== "N/A"
      ? movie.poster
      : "https://via.placeholder.com/300x450?text=No+Image";

      // Handle Save
      // REVIEW (UX): Saving an unchanged title still triggers the "Movie title updated" alert in App.js. From the user's perspective they edited nothing yet were told something changed. Compare against `movie.title` and skip the update (and the alert) when no change occurred.
      const handleSave = () => {
        if (!editTitle.trim()) {
          // REVIEW (UX): "Title cannot be empty" is shown as a blocking alert. Better: keep the edit input open with a red outline and an inline error message; let the user fix it without dismissing a modal first.
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

      {/* REVIEW (UX): No image loading state and no onError fallback. If the OMDB poster URL is slow or returns a 404, the user sees a broken-image icon. Add a skeleton/placeholder while loading and an onError handler that swaps to the local "no image" fallback. */}
      <img className="poster" src={poster} alt={movie.title} />

      <div className="movie-info">

      {/* Inline Edit Title */}
      {/* REVIEW: No keyboard shortcuts — Enter should save, Escape should cancel. Also missing autoFocus when entering edit mode and an aria-label for screen readers. */}
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
      {/* REVIEW: Renders "⭐ NaN" when imdbRating was "N/A" (see App.js Number(apiData.imdbRating)). Guard with `Number.isFinite(movie.rating) ? movie.rating : '—'`. */}
      <p>⭐ {movie.rating}</p>
      </div>

      {/* REVIEW (UX): The action row crams 5–6 emoji buttons together with no separation between intents (status toggles vs. edit vs. destructive delete). The 🗑 delete sits right next to 🔄 refresh; mis-tapping on mobile means losing data. Group toggles on one side, destructive actions on the other, and visually distinguish delete (red icon, more spacing). */}
      <div className="actions">

        {/* REVIEW (UX): Eye and heart toggles give no feedback beyond a color change — and the color change (red text glow) is easy to miss. Consider a brief animation or a filled vs. outlined icon swap so the user clearly perceives the state changed. */}
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
       
        {/* REVIEW: This button is labelled "Refresh movie data" but it just passes the existing movie object back to updateMovie, which only mutates `title`. Net effect: nothing changes, yet the user sees the "Movie title updated" alert (see App.js updateMovie). Either remove the button or wire it to refetch from OMDB. */}
        <button onClick={() => updateMovie(movie)}
          title="Refresh movie data">
         🔄
          </button>

        {/* REVIEW: Emoji-only buttons have no accessible name on screen readers (the `title` attribute is unreliable). Add `aria-label` to each action button. */}
        <button onClick={() => deleteMovie(movie.id)}
          title="Delete">
         🗑
        </button>
      </div>
    </div>
  );
}

export default MovieCard;