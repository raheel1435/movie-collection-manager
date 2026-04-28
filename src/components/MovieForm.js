import { useState } from "react";

function MovieForm({ addMovie }) {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      // REVIEW: Replace alert() with inline form validation (e.g. an error message under the input or `aria-invalid`). alert() is jarring and not accessible.
      alert("Please enter a movie title");
      return;
    }

    // REVIEW: Input is cleared immediately — even if the API call later fails (e.g. movie not found), the user has lost what they typed and must retype. Consider only clearing on a successful add.
    // REVIEW: No disabled state during isLoading, so the user can submit multiple times in parallel. Pass isLoading down and disable the input/button while a request is in flight.
    addMovie({ title: title.trim() });

    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit} className="movie-form">
      {/* REVIEW: <input> has no associated <label>. Add an `aria-label` or visible/sr-only label for accessibility. */}
      {/* REVIEW: No feedback while the user is typing — they have no idea whether the movie title is valid (matchable in OMDB) or already in their collection until after they hit Enter and the API round-trip completes. Consider adding a debounced live search/suggestion list (e.g. OMDB's `s=` endpoint) and a "already in your collection" hint that appears as soon as the typed title matches an existing entry. */}
      <input
        type="text"
        placeholder="Enter movie name"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* REVIEW (UX): The submit button has no loading/disabled state. After clicking, it gives no visual indication anything is happening (the loading banner is rendered on the App level, away from where the user's eyes are). Show an inline spinner and label change ("Adding...") inside the button, and disable it while a request is in flight. */}
      <button type="submit">Add Movie</button>
    </form>
  );
}

export default MovieForm;
