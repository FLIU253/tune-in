import { useContext } from 'react';
import { SearchContext } from '../context/SearchContext';
import { getAvailableGenres, spotifySearch } from '../spotify-api';

const useSearch = () => {
  const [searchState, setSearchState] = useContext(SearchContext);

  const toggleCheckBox = (checkbox) => {
    switch (checkbox) {
      case 'genres':
        searchState.isGenreChecked ? clearGenres() : setGenres();
        setSearchState((searchState) => ({
          ...searchState,
          isGenreChecked: !searchState.isGenreChecked,
        }));
        break;
      case 'songs':
        searchState.isSongsChecked && clearSongs();
        setSearchState((searchState) => ({
          ...searchState,
          isSongsChecked: !searchState.isSongsChecked,
        }));
        break;
      case 'artists':
        searchState.isArtistsChecked && clearArtists();
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

  const setSearchValue = (newValue) => {
    searchState.isArtistsChecked && setArtists(newValue, 'artist');
    searchState.isSongsChecked && setSongs(newValue, 'track');
    setSearchState((searchState) => ({
      ...searchState,
      searchValue: newValue,
    }));
  };

  const setSuggestions = (suggestions) => {
    setSearchState((searchState) => ({
      ...searchState,
      suggestions,
    }));
  };

  const clearSuggestions = () => {
    setSearchState((searchState) => ({
      ...searchState,
      suggestions: [],
    }));
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

  const clearArtists = () => {
    setSearchState((searchState) => ({ ...searchState, artists: [] }));
  };

  const setArtists = async (searchText, type) => {
    const {
      data: { artists },
    } = await spotifySearch({ q: searchText, type });
    setSearchState((searchState) => ({
      ...searchState,
      artists: artists.items,
    }));

    console.log(artists.items);
  };

  const clearSongs = () => {
    setSearchState((searchState) => ({ ...searchState, songs: [] }));
  };

  const setSongs = async (searchText, type) => {
    const {
      data: { tracks },
    } = await spotifySearch({ q: searchText, type });
    setSearchState((searchState) => ({
      ...searchState,
      songs: tracks.items,
    }));

    console.log(tracks);
  };

  return {
    isGenreChecked: searchState.isGenreChecked,
    isSongsChecked: searchState.isSongsChecked,
    isArtistsChecked: searchState.isArtistsChecked,
    genres: searchState.genres,
    toggleCheckBox,
    artists: searchState.artists,
    value: searchState.searchValue,
    setSearchValue,
    suggestions: searchState.suggestions,
    clearSuggestions,
    setSuggestions,
    songs: searchState.songs,
  };
};

export default useSearch;
