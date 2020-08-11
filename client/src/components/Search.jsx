import React, { useEffect, useState } from 'react';
import { getAvailableGenres } from '../spotify-api';
import styled from 'styled-components';
import Autosuggest from 'react-autosuggest';
import './search.css';

const SearchWrapper = styled.div`
  height: 800px;
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

function getSuggestions(genres, value) {
  if (genres) {
    const escapedValue = escapeRegexCharacters(value.trim());
    if (escapedValue === '') return [];

    const regex = new RegExp('^' + escapedValue, 'i');
    return genres.filter((genre) => regex.test(genre));
  }
}

function getSuggestionValue(suggestions) {
  return suggestions;
}

function renderSuggestion(suggestions) {
  return <span>{suggestions}</span>;
}

const Search = () => {
  const [genres, setGenres] = useState();

  useEffect(() => {
    async function fetchGenres() {
      const {
        data: { genres },
      } = await getAvailableGenres();
      setGenres(genres);
    }

    fetchGenres();
  }, []);

  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleChange = (e, { newValue, method }) => {
    setValue(newValue);
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(genres, value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const inputProps = {
    placeholder: 'search',
    value: value,
    onChange: handleChange,
  };

  return (
    <SearchWrapper>
      <h1>Search</h1>
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
