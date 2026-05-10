import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import SearchBar from '../SearchBar/SearchBar';
import MovieGrid from '../MovieGrid/MovieGrid';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieModal from '../MovieModal/MovieModal';
import fetchMovies from '../../services/movieService';
import type { Movie } from '../../types/movie';
import css from './App.module.css';
import { useQuery } from '@tanstack/react-query';

function App() {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  // const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const { data, isLoading, isError } = useQuery({
    queryKey: ['Movies', searchQuery],
    queryFn: () => fetchMovies(searchQuery),
    enabled: searchQuery !== '',
  });

  const handleSearch = (query: string) => {
    setSelectedMovie(null);
    setSearchQuery(query);
  };

  useEffect(() => {
    if (
      data &&
      data.length === 0 &&
      !isLoading &&
      !isError &&
      searchQuery !== ''
    ) {
      toast.error('No movies found for your request.');
    }
  }, [searchQuery, isLoading, isError, data]);

  const handleSelectMovie = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  return (
    <div className={css.app}>
      <SearchBar onSubmit={handleSearch} />

      {isLoading && <Loader />}

      {isError && <ErrorMessage />}

      {data && data.length > 0 && (
        <MovieGrid movies={data} onSelect={handleSelectMovie} />
      )}

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}

      <Toaster position="top-center" />
    </div>
  );
}

export default App;
