import { useContext } from 'react';
import { SearchContext } from '../context/SearchContext';
import { getAvailableGenres } from '../spotify-api';

const useSearch = () => {
  const [searchState, setSearchState] = useContext(SearchContext);

  const toggleCheckBox = (checkbox) => {
    switch (checkbox) {
      case 'genres':
        setSearchState((searchState) => ({
          ...searchState,
          isGenreChecked: !searchState.isGenreChecked,
        }));
        break;
      case 'songs':
        setSearchState((searchState) => ({
          ...searchState,
          isSongsChecked: !searchState.isSongsChecked,
        }));
        break;
      case 'artists':
        setSearchState((searchState) => ({
          ...searchState,
          isArtistsChecked: !searchState.isArtistsChecked,
        }));
        break;
      default:
        setSearchState((searchState) => ({ ...searchState }));
        break;
    }
  };

  const clearGenres = () => {
    setSearchState((searchState) => ({ ...searchState, genres: [] }));
  };

  const setGenres = async () => {
    const {
      data: { genres },
    } = await getAvailableGenres();
    setSearchState((searchState) => ({
      ...searchState,
      genres,
    }));
  };

  return {
    isGenreChecked: searchState.isGenreChecked,
    isSongsChecked: searchState.isSongsChecked,
    isArtistsChecked: searchState.isArtistsChecked,
    genres: searchState.genres,
    toggleCheckBox,
    clearGenres,
    setGenres,
  };
};

export default useSearch;
