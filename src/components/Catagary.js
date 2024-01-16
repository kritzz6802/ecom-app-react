import React from "react";
import FilterDropdown from "./FilterDropdown";

const Catagary = ({ selectedItems,category, titles, onSelectedItemsChange }) => {

  const handleFilterChange = (selectedOptions) => {
    onSelectedItemsChange(selectedOptions);
  };

  return (
    <>
      <FilterDropdown
        category={category}
        options={titles}
        onSelect={handleFilterChange}
        selectedOptions={selectedItems}
        className="filter-dropdown"
        selectClassName="filter-dropdown-select"
        menuItemClassName="filter-dropdown-menu-item"
      />
    </>
  );
};

export default Catagary;
