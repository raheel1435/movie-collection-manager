// REVIEW: API key is hardcoded and committed to source. It will be exposed in the bundle to every client. Move it to an environment variable (e.g. process.env.REACT_APP_OMDB_API_KEY) and rotate the existing key since it is already leaked in git history.
const OMDB_API_KEY = "d76463de";

// fetch movie details from OMDB API
export const fetchMovieData = async (title) => {
    // REVIEW: No check on res.ok — network errors, 4xx/5xx responses, or quota exceeded responses will silently pass through to res.json() and may throw or yield unexpected shape. Validate response status and surface a typed error.
    // REVIEW: No timeout / AbortController — a hanging request will leave the UI stuck in the loading state indefinitely.
    const res = await fetch(
        `https://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=${OMDB_API_KEY}`
    );
    const data = await res.json();
    return data;
};

