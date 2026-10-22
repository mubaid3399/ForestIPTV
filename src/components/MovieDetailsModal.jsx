import React, { useEffect, useState } from 'react';
import { X, Play, Star, Calendar, Users, Film, Clock, ShieldCheck } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getMovieDetails, FALLBACK_MOVIE_DETAILS } from '../utils/omdbService';

export const MovieDetailsModal = ({ isOpen, onClose, movie }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen || !movie) return;

    // Body scroll lock
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Start with whatever initial data we have
    const fallback =
      FALLBACK_MOVIE_DETAILS[movie.title] || {
        Title: movie.title,
        Year: movie.year,
        Poster: movie.poster,
        imdbRating: movie.rating,
        Genre: movie.genre || 'Action, Drama',
        Plot: 'Loading full movie plot and storyline from OMDb database...',
        Actors: 'Cast information loading...',
        Director: 'Director information loading...',
        Released: movie.year,
        Runtime: '120 min',
        Rated: 'PG-13',
      };
    setDetails(fallback);
    setLoading(true);

    let isMounted = true;
    getMovieDetails(movie.id || movie.title)
      .then((fullData) => {
        if (isMounted && fullData) {
          setDetails(fullData);
        }
      })
      .catch((err) => {
        console.warn('Error fetching movie details:', err);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    // Close on Escape key
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      isMounted = false;
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, movie, onClose]);

  if (!isOpen || !movie || !details) return null;

  const handleWatchNow = () => {
    onClose();
    if (location.pathname === '/') {
      const pricingEl = document.getElementById('pricing');
      if (pricingEl) {
        pricingEl.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    navigate('/pricing');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Modal Box - Netflix Details Design */}
      <div
        className="relative w-full max-w-4xl bg-[#141414] text-white rounded-2xl overflow-hidden shadow-2xl border border-white/10 my-auto transform transition-all duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Netflix Circular Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 z-30 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/75 hover:bg-zinc-800 text-white flex items-center justify-center transition-colors border border-white/15 cursor-pointer shadow-lg"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 p-5 sm:p-8">
          {/* Left Column: Movie Poster */}
          <div className="md:col-span-5 flex flex-col items-center">
            <div className="relative aspect-[2/3] w-full max-w-[280px] sm:max-w-[320px] rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-zinc-900">
              <img
                src={details.Poster && details.Poster !== 'N/A' ? details.Poster : movie.poster}
                alt={details.Title || movie.title}
                className="w-full h-full object-cover select-none"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = movie.poster;
                }}
              />

              {/* 4K Badge */}
              <div className="absolute top-3 left-3 bg-white/95 text-slate-900 text-[10px] font-extrabold px-2 py-0.5 rounded shadow-md uppercase tracking-wider">
                4K ULTRA HD
              </div>

              {/* Rating Tag */}
              {details.imdbRating && details.imdbRating !== 'N/A' && (
                <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-xs text-amber-400 font-bold text-xs px-2.5 py-1 rounded-md flex items-center gap-1 shadow-md border border-amber-400/25">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{details.imdbRating}</span>
                </div>
              )}
            </div>

            <div className="mt-3 text-center text-xs text-zinc-400 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Full 4K HDR stream ready</span>
            </div>
          </div>

          {/* Right Column: Title, Metadata, Plot, Actors & Watch Now */}
          <div className="md:col-span-7 flex flex-col justify-between text-left space-y-4">
            <div>
              {/* Title */}
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
                {details.Title || movie.title}
              </h2>

              {/* Netflix Meta Tags */}
              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 text-xs sm:text-sm mt-3 text-zinc-300">
                {details.imdbRating && details.imdbRating !== 'N/A' && (
                  <span className="text-emerald-400 font-bold">
                    {Math.round(parseFloat(details.imdbRating) * 10)}% Match
                  </span>
                )}
                <span className="font-semibold text-zinc-400">{details.Year || movie.year}</span>
                {details.Rated && details.Rated !== 'N/A' && (
                  <span className="border border-zinc-600 text-zinc-300 text-[11px] px-1.5 py-0.5 rounded font-mono uppercase">
                    {details.Rated}
                  </span>
                )}
                {details.Runtime && details.Runtime !== 'N/A' && (
                  <span className="text-zinc-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-zinc-500" />
                    {details.Runtime}
                  </span>
                )}
                <span className="bg-zinc-800 text-zinc-300 text-[11px] font-semibold px-2 py-0.5 rounded border border-zinc-700">
                  Dolby 5.1
                </span>
              </div>

              {/* Movie Plot / Description */}
              <div className="mt-4">
                <h4 className="text-xs uppercase font-mono tracking-wider text-zinc-400 mb-1.5">
                  Synopsis
                </h4>
                <p className="text-zinc-300 text-sm sm:text-[15px] leading-relaxed">
                  {details.Plot || 'Experience this blockbuster cinema release in crystal-clear high definition on Forest IPTV.'}
                </p>
              </div>

              {/* Key Cast & Crew Info */}
              <div className="mt-5 space-y-2 text-xs sm:text-sm text-zinc-300 border-t border-white/10 pt-4">
                {details.Released && details.Released !== 'N/A' && (
                  <div className="flex items-start gap-2">
                    <span className="text-zinc-500 font-medium min-w-[95px] flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                      Release Date:
                    </span>
                    <span className="text-white font-medium">{details.Released}</span>
                  </div>
                )}

                {details.Actors && details.Actors !== 'N/A' && (
                  <div className="flex items-start gap-2">
                    <span className="text-zinc-500 font-medium min-w-[95px] flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-zinc-500" />
                      Starring:
                    </span>
                    <span className="text-white font-medium leading-relaxed">{details.Actors}</span>
                  </div>
                )}

                {details.Director && details.Director !== 'N/A' && (
                  <div className="flex items-start gap-2">
                    <span className="text-zinc-500 font-medium min-w-[95px] flex items-center gap-1.5">
                      <Film className="w-3.5 h-3.5 text-zinc-500" />
                      Director:
                    </span>
                    <span className="text-white font-medium">{details.Director}</span>
                  </div>
                )}

                {details.Genre && details.Genre !== 'N/A' && (
                  <div className="flex items-start gap-2">
                    <span className="text-zinc-500 font-medium min-w-[95px]">Genres:</span>
                    <span className="text-zinc-300 font-medium">{details.Genre}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Actions: WATCH NOW Button (Redirects to Pricing) */}
            <div className="pt-4 border-t border-white/10 mt-auto">
              <button
                type="button"
                onClick={handleWatchNow}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 sm:py-4 rounded-xl bg-[#e50914] hover:bg-[#c90712] active:bg-[#a8060f] text-white font-bold text-sm sm:text-base tracking-wider uppercase transition-all shadow-lg shadow-red-950/60 cursor-pointer"
              >
                <Play className="w-5 h-5 fill-current" />
                <span>Watch Now with IPTV Pass</span>
              </button>

              <p className="text-[11px] sm:text-xs text-zinc-400 mt-2.5">
                Included with all Forest IPTV subscriptions. Instant activation in &lt; 3 mins.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsModal;
