import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { getLatestMovies, FALLBACK_MOVIES } from '../utils/omdbService';
import MovieDetailsModal from './MovieDetailsModal';

export const MoviesBanner = () => {
  const [movies, setMovies] = useState(FALLBACK_MOVIES);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadMovies = async () => {
      try {
        const data = await getLatestMovies();
        if (isMounted && data && data.length > 0) {
          setMovies(data);
        }
      } catch (err) {
        console.error('Error loading movies banner:', err);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadMovies();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  return (
    <section className="w-full bg-white pt-6 pb-20 sm:pb-24 lg:pb-28">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl lg:text-[38px] font-extrabold text-slate-900 tracking-tight leading-tight">
            Latest Movies & Blockbusters
          </h2>
          <p className="mt-3.5 text-slate-600 text-base sm:text-[17px] leading-relaxed max-w-2xl mx-auto">
            Enjoy instant access to thousands of on-demand movies, latest cinema premieres, and 4K ultra-HD releases included with your IPTV pass. Click any movie for details.
          </p>
        </div>

        {/* Movies Grid - Simple and clean with NO hover effects */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {movies.map((movie) => (
            <div
              key={movie.id || movie.title}
              onClick={() => handleMovieClick(movie)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleMovieClick(movie);
                }
              }}
              className="flex flex-col text-left cursor-pointer focus:outline-hidden"
            >
              {/* Poster Card (Static, zero hover animations or scale) */}
              <div className="relative aspect-[2/3] w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/80 shadow-xs">
                <img
                  src={movie.poster}
                  alt={movie.title}
                  loading="lazy"
                  className="w-full h-full object-cover select-none pointer-events-none"
                  onError={(e) => {
                    // Fallback to verified image if broken
                    e.currentTarget.onerror = null;
                    e.currentTarget.src =
                      'https://m.media-amazon.com/images/M/MV5BNTc0YmQxMjEtODI5MC00NjFiLTlkMWUtOGQ5NjFmYWUyZGJhXkEyXkFqcGc@._V1_QL75_UX380_CR0,0,380,562_.jpg';
                  }}
                />

                {/* 4K UHD Tag */}
                <div className="absolute top-2.5 left-2.5 bg-white/95 text-slate-800 text-[10px] font-bold px-2 py-0.5 rounded shadow-xs uppercase tracking-wider">
                  4K UHD
                </div>

                {/* IMDb Rating Badge */}
                {movie.rating && movie.rating !== 'N/A' && (
                  <div className="absolute top-2.5 right-2.5 bg-black/75 backdrop-blur-xs text-amber-300 text-xs font-semibold px-2 py-0.5 rounded-md flex items-center gap-1 shadow-xs">
                    <Star className="w-3 h-3 fill-amber-300 text-amber-300" />
                    <span>{movie.rating}</span>
                  </div>
                )}
              </div>

              {/* Title & Metadata (Simple static text) */}
              <div className="mt-2.5">
                <h3
                  className="text-sm sm:text-[15px] font-bold text-slate-900 truncate"
                  title={movie.title}
                >
                  {movie.title}
                </h3>
                <div className="flex items-center justify-between text-xs text-slate-500 mt-1">
                  <span>{movie.year}</span>
                  <span className="truncate max-w-[120px] text-right">
                    {movie.genre?.split(',')[0]}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Netflix-inspired Movie Details Modal */}
      <MovieDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        movie={selectedMovie}
      />
    </section>
  );
};

export default MoviesBanner;
