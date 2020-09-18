import React, { Fragment } from "react";

const SearchRecipe = ({ search, onChange }) => {
  return (
    <Fragment>
      <input
        className="header-primary-input"
        type="text"
        size="90"
        autoComplete="off"
        name="search"
        value={search}
        placeholder="Search by dish name"
        onChange={onChange}
      />
    </Fragment>
  );
};

export default SearchRecipe;
