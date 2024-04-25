import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  styled,
} from "@mui/material";
import { setFilterCategory } from "../../../features/transactionSlice";

const StyledFormControl = styled(FormControl)({
  margin: "8px",
  minWidth: "150px",
});

const StyledInputLabel = styled(InputLabel)({
  fontSize: "14px",
});

const StyledMenuItem = styled(MenuItem)({
  fontSize: "14px",
});

const CategoryFilter = ({ filterCategory }) => {
  const categories = useSelector((state) => state.transactions.categories);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    dispatch(setFilterCategory(event.target.value));
  };

  return (
    <StyledFormControl variant="outlined">
      <StyledInputLabel id="filter-label">Filter By Category</StyledInputLabel>
      <Select
        labelId="filter-category-label"
        id="filter-category-select"
        value={filterCategory}
        onChange={handleChange}
        label="Filter By Category"
        sx={{ fontSize: "14px" }}
      >
        <StyledMenuItem value="all">All Categories</StyledMenuItem>
        {categories.map((category) => (
          <StyledMenuItem key={category} value={category}>
            {category}
          </StyledMenuItem>
        ))}
      </Select>
    </StyledFormControl>
  );
};

export default CategoryFilter;
