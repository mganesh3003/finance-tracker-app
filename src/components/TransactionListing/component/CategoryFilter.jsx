import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useSelector } from "react-redux";

const CategoryFilter = ({ filterCategory, setFilterCategory }) => {
  const categories = useSelector((state) => state.transactions.categories);

  const handleChange = (event) => {
    setFilterCategory(event.target.value);
  };

  return (
    <FormControl>
      <InputLabel id="filter-category-label">Filter By Category</InputLabel>
      <Select
        labelId="filter-category-label"
        id="filter-category-select"
        value={filterCategory}
        onChange={handleChange}
      >
        <MenuItem value="all">All Categories</MenuItem>
        {categories.map((category) => (
          <MenuItem key={category} value={category}>
            {category}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CategoryFilter;
