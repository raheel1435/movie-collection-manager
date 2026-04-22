const OMDB_API_KEY = "d76463de";

// fetch movie details from OMDB API
export const fetchMovieData = async (title) => {
    const res = await fetch(
        `https://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=${OMDB_API_KEY}`
    );
    const data = await res.json();
    return data;
};

