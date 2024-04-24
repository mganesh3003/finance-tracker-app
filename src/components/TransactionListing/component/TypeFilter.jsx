// components/TransactionFilter.jsx
import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const TypeFilter = ({ filterType, setFilterType }) => {
  const handleFilterChange = (event) => {
    setFilterType(event.target.value);
  };

  return (
    <FormControl>
      <InputLabel id="filter-label">Filter By</InputLabel>
      <Select
        labelId="filter-label"
        id="filter-select"
        value={filterType}
        onChange={handleFilterChange}
      >
        <MenuItem value="all">All Entries</MenuItem>
        <MenuItem value="income">Income</MenuItem>
        <MenuItem value="expense">Expense</MenuItem>
      </Select>
    </FormControl>
  );
};

export default TypeFilter;
