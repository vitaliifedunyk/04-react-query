import type { Movie } from '../../types/movie';
import css from './MovieGrid.module.css';

interface MovieGridProps {
  movies: Movie[];
  onSelect: (movie: Movie) => void;
}

function MovieGrid({ movies, onSelect }: MovieGridProps) {
  return (
    <ul className={css.grid}>
      {movies.map((movie) => {
        const posterUrl = movie.poster_path
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          : 'https://placehold.co/500x750?text=No+Image';

        return (
          <li className={css.card} key={movie.id}>
            <img
              className={css.image}
              src={posterUrl}
              alt={movie.title}
              onClick={() => onSelect(movie)}
            />

            <h2 className={css.title}>{movie.title}</h2>
          </li>
        );
      })}
    </ul>
  );
}

export default MovieGrid;
