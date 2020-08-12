import React, { useState, useEffect } from 'react';
import { getAvailableGenres } from '../spotify-api';

const SearchContext = React.createContext([{}, () => {}]);

const SearchProvider = (props) => {
  const [searchState, setSearchState] = useState({
    isGenreChecked: true,
    isSongsChecked: false,
    isArtistsChecked: false,
    searchValue: '',
    suggestions: [],
    genres: [],
    songs: [],
    artists: [],
  });

  useEffect(() => {
    async function fetchGenres() {
      const {
        data: { genres },
      } = await getAvailableGenres();
      setSearchState((searchState) => ({
        ...searchState,
        genres,
      }));
    }
    fetchGenres();
  }, []);

  return (
    <SearchContext.Provider value={[searchState, setSearchState]}>
      {props.children}
    </SearchContext.Provider>
  );
};

export { SearchContext, SearchProvider };
