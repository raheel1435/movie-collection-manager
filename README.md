# 🎬 Movie Collection Manager (MCM)

I built this movie collection management app using React. It lets you search for movies using the OMDB API, track which ones you've watched, like your favorites, edit titles, and everything gets saved automatically to your browser's local storage.

## ✨ What It Can Do

- **Add Movies** - Type any movie title and my app fetches all the details (year, genre, IMDb rating, poster) automatically
- **Track Watched & Likes** - Click the eye button to mark as watched, click the heart to like a movie
- **Edit Titles** - Click the pencil icon to edit any movie title right on the card
- **Delete Movies** - Remove movies you don't want anymore
- **Saves Everything** - Your collection stays saved even after you close the browser
- **Works on Any Screen** - The grid layout looks good on desktop, tablet, or phone
- **Dark Theme** - I went with a dark gradient background because it's easier on the eyes

## 🚀 How to Get It Running

### What You Need

- Node.js (v14 or higher)
- npm or yarn

### Steps

1. Clone the repo:
```bash
git clone <your-repo-url>
cd movie-collection-manager
Install everything:

bash
npm install
Start it up:

bash
npm start
Open http://localhost:3000 to see it working

🎮 How to Use My App
Adding a Movie
Just type a movie name in the search box and hit "Add Movie" or press Enter. The app reaches out to OMDB API and pulls in all the movie details. I built in duplicate detection so you can't add the same movie twice.

What the Buttons Do
Button	What It Does
👁	Marks movie as watched (lights up red)
❤️/🤍	Like or unlike a movie
✏️	Edit the title (click ✅ to save, ❌ to cancel)
🔄	Refresh the movie data
🗑	Delete the movie
Where Your Data Goes
I set it up so everything saves to your browser's local storage. Close the browser, come back tomorrow, your movies and all your watched/liked status will still be there.

📁 How I Structured the Code
text
src/
├── components/
│   ├── MovieCard.js      # Each movie card with all its buttons
│   ├── MovieForm.js      # The search form at the top
│   ├── MovieList.js      # The grid that holds all the cards
│   ├── MovieService.js   # My OMDB API connection
│   └── Footer.js         # Simple footer
├── App.js                # Main component with all the state logic
├── App.css               # All the styling
├── index.js              # Entry point
└── index.css             # Global styles
🔑 About the API Key
I hardcoded my OMDB API key (d76463de) in MovieService.js. If you hit rate limits or want to use your own:

Get your free key from OMDB API

Open src/components/MovieService.js

Replace my key with yours:

javascript
const OMDB_API_KEY = "your-key-here";
🎨 How to Customize the Look
Change Colors
In App.css, I set up CSS variables so you can easily change the theme:

css
:root {
  --bg-main: #0f172a;    /* Main background - dark blue */
  --bg-card: #1e293b;     /* Card background - lighter blue */
  --accent: #e50914;      /* Accent color - Netflix red */
  --text-main: #f8fafc;   /* Main text - off white */
  --text-muted: #94a3b8;  /* Secondary text - gray */
}
Change the Grid
Want more or fewer cards per row? Edit this in App.css:

css
.movie-grid {
  grid-template-columns: repeat(auto-fill, minmax(209px, 1fr));
  gap: 45px;
}
Adjust Hover Effect
The cards pop up when you hover. Change it here:

css
.movie-card:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 25px rgba(0,0,0,0.5);
}
📱 How It Handles Different Screens
Desktop: Shows 4-5 cards in a row

Tablet: Shows 2-3 cards

Phone: Shows 1 card

Posters are fixed at 300px height and use object-fit: cover so they don't look stretched

🛠️ What I Built It With
React - The whole frontend framework

OMDB API - Where movie data comes from

Local Storage - For saving your collection

CSS3 - All the styling, animations, grid, and flexbox

📦 Available Scripts
In the project directory, you can run:

npm start
Runs the app in development mode. Opens on http://localhost:3000

npm test
Launches the test runner

npm run build
Builds the app for production into the build folder

npm run eject
Ejects from Create React App (one-way operation, can't go back)

⚠️ Things to Know
The OMDB API free tier has daily request limits

Really obscure movies might return "Movie not found"

Ratings come from IMDb (0-10 scale)

Sometimes OMDB doesn't have a poster, so it shows a placeholder

The API key is visible in the code (this is just for demo purposes)

🔧 Common Issues
"Movie not found" error
Double-check your spelling

Try the full title (ex: "The Dark Knight" not just "Dark Knight")

Some non-English movies aren't in OMDB

Posters not showing
OMDB sometimes returns "N/A" for posters

I added a placeholder image for these cases

Local storage not saving
Make sure your browser allows local storage

Try clearing your browser cache

📚 Resources I Used
React Docs

Create React App Docs

OMDB API Docs

📄 License
© 2026 MCM. All rights reserved.

Create React App team for the boilerplate

Anyone who uses my app!

Enjoy managing your movie collection! 🎬🍿

Built with ❤️