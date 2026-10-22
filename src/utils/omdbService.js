// OMDb API Service with LocalStorage Caching & High-Performance Fallbacks
const OMDB_API_KEY = '6f25e8dd';
const CACHE_KEY = 'forest_iptv_omdb_movies_v1';
const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours cache

export const CURATED_TITLES = [
  'Dune: Part Two',
  'Deadpool & Wolverine',
  'Gladiator II',
  'Inside Out 2',
  'Furiosa: A Mad Max Saga',
  'Oppenheimer',
  'Top Gun: Maverick',
  'Avatar: The Way of Water',
  'The Batman',
  'John Wick: Chapter 4'
];

export const FALLBACK_MOVIES = [
  {
    id: 'tt15239678',
    title: 'Dune: Part Two',
    year: '2024',
    rating: '8.4',
    poster: 'https://m.media-amazon.com/images/M/MV5BNTc0YmQxMjEtODI5MC00NjFiLTlkMWUtOGQ5NjFmYWUyZGJhXkEyXkFqcGc@._V1_QL75_UX380_CR0,0,380,562_.jpg',
    genre: 'Action, Adventure, Drama'
  },
  {
    id: 'tt6263850',
    title: 'Deadpool & Wolverine',
    year: '2024',
    rating: '7.5',
    poster: 'https://m.media-amazon.com/images/M/MV5BZTk5ODY0MmQtMzA3Ni00NGY1LThiYzItZThiNjFiNDM4MTM3XkEyXkFqcGc@._V1_QL75_UX380_CR0,0,380,562_.jpg',
    genre: 'Action, Adventure, Comedy'
  },
  {
    id: 'tt9218128',
    title: 'Gladiator II',
    year: '2024',
    rating: '6.4',
    poster: 'https://m.media-amazon.com/images/M/MV5BMWYzZTM5ZGQtOGE5My00NmM2LWFlMDEtMGNjYjdmOWM1MzA1XkEyXkFqcGc@._V1_QL75_UX380_CR0,0,380,562_.jpg',
    genre: 'Adventure, Drama'
  },
  {
    id: 'tt22022452',
    title: 'Inside Out 2',
    year: '2024',
    rating: '7.5',
    poster: 'https://m.media-amazon.com/images/M/MV5BYWY3MDE2Y2UtOTE3Zi00MGUzLTg2MTItZjE1ZWVkMGVlODRmXkEyXkFqcGc@._V1_QL75_UX380_CR0,0,380,562_.jpg',
    genre: 'Animation, Adventure, Comedy'
  },
  {
    id: 'tt12037194',
    title: 'Furiosa: A Mad Max Saga',
    year: '2024',
    rating: '7.4',
    poster: 'https://m.media-amazon.com/images/M/MV5BNTcwYWE1NTYtOWNiYy00NzY3LWIwY2MtNjJmZDkxNDNmOWE1XkEyXkFqcGc@._V1_QL75_UX380_CR0,0,380,562_.jpg',
    genre: 'Action, Adventure, Sci-Fi'
  },
  {
    id: 'tt15398776',
    title: 'Oppenheimer',
    year: '2023',
    rating: '8.2',
    poster: 'https://m.media-amazon.com/images/M/MV5BN2JkMDc5MGQtZjg3YS00NmFiLWIyZmQtZTJmNTM5MjVmYTQ4XkEyXkFqcGc@._V1_QL75_UX380_CR0,0,380,562_.jpg',
    genre: 'Biography, Drama, History'
  },
  {
    id: 'tt1745960',
    title: 'Top Gun: Maverick',
    year: '2022',
    rating: '8.2',
    poster: 'https://m.media-amazon.com/images/M/MV5BMDBkZDNjMWEtOTdmMi00NmExLTg5MmMtNTFlYTJlNWY5YTdmXkEyXkFqcGc@._V1_QL75_UX380_CR0,0,380,562_.jpg',
    genre: 'Action, Drama'
  },
  {
    id: 'tt1630029',
    title: 'Avatar: The Way of Water',
    year: '2022',
    rating: '7.5',
    poster: 'https://m.media-amazon.com/images/M/MV5BNWI0Y2NkOWEtMmM2OC00MjQ3LWI1YzItZGQxYzQ3NzI4NWZmXkEyXkFqcGc@._V1_QL75_UY562_CR6,0,380,562_.jpg',
    genre: 'Action, Adventure, Fantasy'
  },
  {
    id: 'tt1877830',
    title: 'The Batman',
    year: '2022',
    rating: '7.8',
    poster: 'https://m.media-amazon.com/images/M/MV5BMmU5NGJlMzAtMGNmOC00YjJjLTgyMzUtNjAyYmE4Njg5YWMyXkEyXkFqcGc@._V1_QL75_UX380_CR0,0,380,562_.jpg',
    genre: 'Action, Crime, Mystery'
  },
  {
    id: 'tt10366206',
    title: 'John Wick: Chapter 4',
    year: '2023',
    rating: '7.6',
    poster: 'https://m.media-amazon.com/images/M/MV5BY2Q2ZmI5ZjUtNWVhMC00YzJkLTlmYjMtY2RmZDhkNzEzYjZhXkEyXkFqcGc@._V1_QL75_UX380_CR0,0,380,562_.jpg',
    genre: 'Action, Crime, Thriller'
  }
];

/**
 * Fetch latest movies with optimal localStorage caching to conserve OMDb API quota.
 * Automatically falls back to verified backup data if network or API limits are hit.
 */
export async function getLatestMovies() {
  // 1. Check local cache first
  try {
    const rawCache = localStorage.getItem(CACHE_KEY);
    if (rawCache) {
      const parsed = JSON.parse(rawCache);
      const isFresh = Date.now() - (parsed.timestamp || 0) < CACHE_TTL_MS;
      if (isFresh && Array.isArray(parsed.movies) && parsed.movies.length > 0) {
        console.info(
          '[OMDb API] Loaded movies from local cache. (Saves your 1,000 requests/day limit. To force fresh fetch, run localStorage.removeItem("' +
            CACHE_KEY +
            '") in console).'
        );
        return parsed.movies;
      }
    }
  } catch (err) {
    console.warn('[OMDb API] Could not read local cache:', err);
  }

  // 2. Fetch fresh data from OMDb API with quota optimization
  try {
    console.info('[OMDb API] Fetching latest movies from OMDb API with key:', OMDB_API_KEY);
    const promises = CURATED_TITLES.map(async (title) => {
      const url = `https://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=${OMDB_API_KEY}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const data = await res.json();
      if (data.Response === 'True' && data.Poster && data.Poster !== 'N/A') {
        return {
          id: data.imdbID,
          title: data.Title,
          year: data.Year,
          rating: data.imdbRating || 'N/A',
          poster: data.Poster,
          genre: data.Genre || 'Action'
        };
      } else if (data.Error) {
        console.warn(`[OMDb API] Notice for "${title}":`, data.Error);
      }
      return null;
    });

    const results = await Promise.allSettled(promises);
    const movies = results
      .filter((r) => r.status === 'fulfilled' && r.value !== null)
      .map((r) => r.value);

    if (movies.length >= 4) {
      try {
        localStorage.setItem(
          CACHE_KEY,
          JSON.stringify({
            timestamp: Date.now(),
            movies
          })
        );
      } catch (e) {
        console.warn('[OMDb API] Could not write to localStorage:', e);
      }
      console.info('[OMDb API] Successfully fetched & cached', movies.length, 'movies with key:', OMDB_API_KEY);
      return movies;
    }
  } catch (error) {
    console.warn('[OMDb API] Fetch failed or offline, using fallback data:', error);
  }

  // 3. Fallback to pre-verified verified movies
  return FALLBACK_MOVIES;
}

export const FALLBACK_MOVIE_DETAILS = {
  'Dune: Part Two': {
    Title: 'Dune: Part Two',
    Year: '2024',
    Rated: 'PG-13',
    Released: '01 Mar 2024',
    Runtime: '166 min',
    Genre: 'Action, Adventure, Drama',
    Director: 'Denis Villeneuve',
    Actors: 'Timothée Chalamet, Zendaya, Rebecca Ferguson, Javier Bardem',
    Plot: 'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the universe, he endeavors to prevent a terrible future only he can foresee.',
    Poster: 'https://m.media-amazon.com/images/M/MV5BNTc0YmQxMjEtODI5MC00NjFiLTlkMWUtOGQ5NjFmYWUyZGJhXkEyXkFqcGc@._V1_QL75_UX380_CR0,0,380,562_.jpg',
    imdbRating: '8.4',
    imdbID: 'tt15239678'
  },
  'Deadpool & Wolverine': {
    Title: 'Deadpool & Wolverine',
    Year: '2024',
    Rated: 'R',
    Released: '26 Jul 2024',
    Runtime: '128 min',
    Genre: 'Action, Adventure, Comedy',
    Director: 'Shawn Levy',
    Actors: 'Ryan Reynolds, Hugh Jackman, Emma Corrin, Matthew Macfadyen',
    Plot: 'Deadpool is offered a place in the Marvel Cinematic Universe by the Time Variance Authority, but instead recruits a variant of Wolverine to save his universe from extinction.',
    Poster: 'https://m.media-amazon.com/images/M/MV5BZTk5ODY0MmQtMzA3Ni00NGY1LThiYzItZThiNjFiNDM4MTM3XkEyXkFqcGc@._V1_QL75_UX380_CR0,0,380,562_.jpg',
    imdbRating: '7.5',
    imdbID: 'tt6263850'
  },
  'Gladiator II': {
    Title: 'Gladiator II',
    Year: '2024',
    Rated: 'R',
    Released: '22 Nov 2024',
    Runtime: '148 min',
    Genre: 'Action, Adventure, Drama',
    Director: 'Ridley Scott',
    Actors: 'Paul Mescal, Pedro Pascal, Denzel Washington, Connie Nielsen',
    Plot: 'Years after witnessing the death of Maximus at the hands of his uncle, Lucius must enter the Colosseum after the emperors of Rome conquer his home and force him to fight for the future of the empire.',
    Poster: 'https://m.media-amazon.com/images/M/MV5BMWYzZTM5ZGQtOGE5My00NmM2LWFlMDEtMGNjYjdmOWM1MzA1XkEyXkFqcGc@._V1_QL75_UX380_CR0,0,380,562_.jpg',
    imdbRating: '6.4',
    imdbID: 'tt9218128'
  },
  'Inside Out 2': {
    Title: 'Inside Out 2',
    Year: '2024',
    Rated: 'PG',
    Released: '14 Jun 2024',
    Runtime: '96 min',
    Genre: 'Animation, Adventure, Comedy',
    Director: 'Kelsey Mann',
    Actors: 'Amy Poehler, Maya Hawke, Kensington Tallman, Liza Lapira',
    Plot: "Joy, Sadness, Anger, Fear and Disgust have been running a successful operation by all accounts. However, when Anxiety, Envy, Ennui and Embarrassment show up, the headquarters undergoes a sudden demolition to make room for something entirely unexpected.",
    Poster: 'https://m.media-amazon.com/images/M/MV5BYWY3MDE2Y2UtOTE3Zi00MGUzLTg2MTItZjE1ZWVkMGVlODRmXkEyXkFqcGc@._V1_QL75_UX380_CR0,0,380,562_.jpg',
    imdbRating: '7.5',
    imdbID: 'tt22022452'
  },
  'Furiosa: A Mad Max Saga': {
    Title: 'Furiosa: A Mad Max Saga',
    Year: '2024',
    Rated: 'R',
    Released: '24 May 2024',
    Runtime: '148 min',
    Genre: 'Action, Adventure, Sci-Fi',
    Director: 'George Miller',
    Actors: 'Anya Taylor-Joy, Chris Hemsworth, Tom Burke, Alyla Browne',
    Plot: 'As the world fell, young Furiosa is snatched from the Green Place of Many Mothers and falls into the hands of a great Biker Horde led by the Warlord Dementus. Sweeping through the Wasteland, they come across the Citadel presided over by The Immortan Joe.',
    Poster: 'https://m.media-amazon.com/images/M/MV5BNTcwYWE1NTYtOWNiYy00NzY3LWIwY2MtNjJmZDkxNDNmOWE1XkEyXkFqcGc@._V1_QL75_UX380_CR0,0,380,562_.jpg',
    imdbRating: '7.4',
    imdbID: 'tt12037194'
  },
  'Oppenheimer': {
    Title: 'Oppenheimer',
    Year: '2023',
    Rated: 'R',
    Released: '21 Jul 2023',
    Runtime: '180 min',
    Genre: 'Biography, Drama, History',
    Director: 'Christopher Nolan',
    Actors: 'Cillian Murphy, Emily Blunt, Matt Damon, Robert Downey Jr.',
    Plot: 'The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb during World War II under the Manhattan Project.',
    Poster: 'https://m.media-amazon.com/images/M/MV5BN2JkMDc5MGQtZjg3YS00NmFiLWIyZmQtZTJmNTM5MjVmYTQ4XkEyXkFqcGc@._V1_QL75_UX380_CR0,0,380,562_.jpg',
    imdbRating: '8.2',
    imdbID: 'tt15398776'
  },
  'Top Gun: Maverick': {
    Title: 'Top Gun: Maverick',
    Year: '2022',
    Rated: 'PG-13',
    Released: '27 May 2022',
    Runtime: '130 min',
    Genre: 'Action, Drama',
    Director: 'Joseph Kosinski',
    Actors: 'Tom Cruise, Jennifer Connelly, Miles Teller, Jon Hamm',
    Plot: "After thirty years, Maverick is still pushing the envelope as a top naval aviator, but must confront ghosts of his past when he leads TOP GUN's elite graduates on a mission that demands the ultimate sacrifice from those chosen to fly it.",
    Poster: 'https://m.media-amazon.com/images/M/MV5BMDBkZDNjMWEtOTdmMi00NmExLTg5MmMtNTFlYTJlNWY5YTdmXkEyXkFqcGc@._V1_QL75_UX380_CR0,0,380,562_.jpg',
    imdbRating: '8.2',
    imdbID: 'tt1745960'
  },
  'Avatar: The Way of Water': {
    Title: 'Avatar: The Way of Water',
    Year: '2022',
    Rated: 'PG-13',
    Released: '16 Dec 2022',
    Runtime: '192 min',
    Genre: 'Action, Adventure, Fantasy',
    Director: 'James Cameron',
    Actors: 'Sam Worthington, Zoe Saldana, Sigourney Weaver, Stephen Lang',
    Plot: 'Jake Sully lives with his newfound family formed on the extrasolar moon Pandora. Once a familiar threat returns to finish what was previously started, Jake must work with Neytiri and the army of the Na\'vi race to protect their home.',
    Poster: 'https://m.media-amazon.com/images/M/MV5BNWI0Y2NkOWEtMmM2OC00MjQ3LWI1YzItZGQxYzQ3NzI4NWZmXkEyXkFqcGc@._V1_QL75_UY562_CR6,0,380,562_.jpg',
    imdbRating: '7.5',
    imdbID: 'tt1630029'
  },
  'The Batman': {
    Title: 'The Batman',
    Year: '2022',
    Rated: 'PG-13',
    Released: '04 Mar 2022',
    Runtime: '176 min',
    Genre: 'Action, Crime, Drama',
    Director: 'Matt Reeves',
    Actors: 'Robert Pattinson, Zoë Kravitz, Jeffrey Wright, Colin Farrell',
    Plot: 'When a sadistic serial killer begins murdering key political figures in Gotham, the Batman is forced to investigate the city\'s hidden corruption and question his family\'s involvement.',
    Poster: 'https://m.media-amazon.com/images/M/MV5BMmU5NGJlMzAtMGNmOC00YjJjLTgyMzUtNjAyYmE4Njg5YWMyXkEyXkFqcGc@._V1_QL75_UX380_CR0,0,380,562_.jpg',
    imdbRating: '7.8',
    imdbID: 'tt1877830'
  },
  'John Wick: Chapter 4': {
    Title: 'John Wick: Chapter 4',
    Year: '2023',
    Rated: 'R',
    Released: '24 Mar 2023',
    Runtime: '169 min',
    Genre: 'Action, Crime, Thriller',
    Director: 'Chad Stahelski',
    Actors: 'Keanu Reeves, Laurence Fishburne, George Georgiou, Donnie Yen',
    Plot: 'John Wick uncovers a path to defeating The High Table. But before he can earn his freedom, Wick must face off against a new enemy with powerful alliances across the globe and forces that turn old friends into foes.',
    Poster: 'https://m.media-amazon.com/images/M/MV5BY2Q2ZmI5ZjUtNWVhMC00YzJkLTlmYjMtY2RmZDhkNzEzYjZhXkEyXkFqcGc@._V1_QL75_UX380_CR0,0,380,562_.jpg',
    imdbRating: '7.6',
    imdbID: 'tt10366206'
  }
};

/**
 * Fetch full movie details with caching to conserve API quota.
 */
export async function getMovieDetails(idOrTitle) {
  if (!idOrTitle) return null;
  const lookupKey = typeof idOrTitle === 'object' ? (idOrTitle.id || idOrTitle.title) : idOrTitle;
  const title = typeof idOrTitle === 'object' ? idOrTitle.title : idOrTitle;
  const cacheKey = `forest_iptv_detail_${lookupKey}`;

  // 1. Check local cache
  try {
    const raw = localStorage.getItem(cacheKey);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.Title) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn('[OMDb API] Detail cache read error:', e);
  }

  // 2. Fetch from OMDb API
  try {
    const isId = typeof lookupKey === 'string' && lookupKey.startsWith('tt');
    const param = isId ? `i=${encodeURIComponent(lookupKey)}` : `t=${encodeURIComponent(title || lookupKey)}`;
    const url = `https://www.omdbapi.com/?${param}&plot=full&apikey=${OMDB_API_KEY}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const data = await res.json();
    if (data.Response === 'True') {
      try {
        localStorage.setItem(cacheKey, JSON.stringify(data));
      } catch (err) {
        console.warn('[OMDb API] Detail cache write error:', err);
      }
      return data;
    }
  } catch (err) {
    console.warn('[OMDb API] Movie detail live fetch error:', err);
  }

  // 3. Fallback from pre-compiled dictionary
  if (title && FALLBACK_MOVIE_DETAILS[title]) {
    return FALLBACK_MOVIE_DETAILS[title];
  }

  return null;
}
