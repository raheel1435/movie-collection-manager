import { useState } from 'react';

function MovieForm({ addMovie }) {

  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert('Please enter a movie title');
      return;
    }

      addMovie({ title: title.trim() });

    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit} className="movie-form">

      <input
        type="text"
        placeholder="Enter movie name"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <button type="submit">
        Add Movie
      </button>
    </form>
  );
}

export default MovieForm;