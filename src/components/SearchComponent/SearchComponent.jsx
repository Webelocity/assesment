import React from 'react';
import './SearchComponent.scss';
import { CiSearch } from 'react-icons/ci';

const SearchComponent = () => {
  return (
    <div className="SearchComponent">
      <CiSearch className="icon" />
      <input placeholder="Search Anything" />
    </div>
  );
};

export default SearchComponent;
