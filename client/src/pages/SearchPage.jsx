import React from 'react';
import Search from '../components/Search';
import CheckboxSection from '../components/CheckboxSection';

const SearchPage = () => {
  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Search</h1>
      <CheckboxSection />
      <Search />
    </div>
  );
};

export default SearchPage;
