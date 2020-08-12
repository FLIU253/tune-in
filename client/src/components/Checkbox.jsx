import React from 'react';
import useSearch from '../hooks/useSearch';

const Checkbox = ({ buttonText }) => {
  const {
    isGenreChecked,
    isSongsChecked,
    isArtistsChecked,
    toggleCheckBox,
  } = useSearch();

  return (
    <div>
      <input
        type="checkbox"
        name={buttonText}
        label={buttonText}
        checked={
          buttonText === 'genres'
            ? isGenreChecked
            : buttonText === 'songs'
            ? isSongsChecked
            : isArtistsChecked
        }
        onChange={() => toggleCheckBox(buttonText)}
      />
      {buttonText}
    </div>
  );
};

export default Checkbox;
