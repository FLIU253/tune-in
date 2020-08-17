import React, { useEffect } from 'react';
import styled from 'styled-components';
import Autosuggest from 'react-autosuggest';
import './search.css';
import useSearch from '../hooks/useSearch';
import useAudioPlayer from '../hooks/useAudioPlayer';
import { Link } from 'react-router-dom';

const SearchWrapper = styled.div`
  height: 700px;
  li {
    color: ${(props) => props.theme.richBlack};
  }
  h1 {
    text-align: center;
  }
`;

//reference link: https://codepen.io/moroshko/pen/LGNJMy?editors=0110
function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const Search = () => {
  const {
    genres,
    songs,
    artists,
    isGenreChecked,
    isArtistsChecked,
    isSongsChecked,
    value,
    setSearchValue,
    suggestions,
    setSuggestions,
    clearSuggestions,
  } = useSearch();

  const { resetTracksValues } = useAudioPlayer();

  useEffect(() => {
    resetTracksValues();
  }, []);

  const handleChange = (e, { newValue, method }) => {
    setSearchValue(newValue);
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    isGenreChecked && setSuggestions(getSuggestions(genres, value));
    isArtistsChecked && setSuggestions(getSuggestions(artists, value));
    isSongsChecked && setSuggestions(getSuggestions(songs, value));
  };

  const onSuggestionsClearRequested = () => {
    clearSuggestions();
  };

  const getSuggestions = (valueList, value) => {
    if (valueList) {
      if (isGenreChecked) {
        const escapedValue = escapeRegexCharacters(value.trim());
        if (escapedValue === '') return [];

        const regex = new RegExp('^' + escapedValue, 'i');
        return genres.filter((genre) => regex.test(genre));
      }
      if (isArtistsChecked) {
        const escapedValue = escapeRegexCharacters(value.trim());
        if (escapedValue === '') return [];

        const regex = new RegExp('^' + escapedValue, 'i');
        return artists.filter((artist) => regex.test(artist.name));
      }
      if (isSongsChecked) {
        const escapedValue = escapeRegexCharacters(value.trim());
        if (escapedValue === '') return [];

        const regex = new RegExp('^' + escapedValue, 'i');
        return songs.filter((song) => regex.test(song.name));
      }
    }
  };

  const getSuggestionValue = (suggestions) => {
    if (isGenreChecked) return suggestions;
    if (isArtistsChecked || isSongsChecked) return suggestions.name;
  };

  const renderSuggestion = (suggestions) => {
    if (isGenreChecked)
      return (
        <Link to={`/${suggestions}`}>
          <span>{suggestions}</span>
        </Link>
      );
    if (isArtistsChecked || isSongsChecked)
      return (
        <Link to={`/${suggestions.id}`}>
          <span>{suggestions.name}</span>
        </Link>
      );
  };

  const inputProps = {
    placeholder: 'search',
    value: value,
    onChange: handleChange,
  };

  return (
    <SearchWrapper>
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionSelected={(_, { suggestionValue }) =>
          console.log('Selected: ' + suggestionValue)
        }
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
        focusInputOnSuggestionClick={false}
      />
    </SearchWrapper>
  );
};

export default Search;
