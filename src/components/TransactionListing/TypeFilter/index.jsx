import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  styled,
} from "@mui/material";
import { setFilterType } from "../../../features/transactionSlice";

const StyledFormControl = styled(FormControl)({
  margin: "8px",
  minWidth: "60px",
  height: "auto",
});

const StyledInputLabel = styled(InputLabel)({
  fontSize: "14px",
});

const StyledMenuItem = styled(MenuItem)({
  fontSize: "14px",
});

const TypeFilter = ({ filterType }) => {
  const dispatch = useDispatch();

  const handleFilterChange = (event) => {
    dispatch(setFilterType(event.target.value));
  };

  return (
    <StyledFormControl variant="outlined">
      <StyledInputLabel id="filter-label">Filter By Type</StyledInputLabel>
      <Select
        labelId="filter-label"
        id="filter-select"
        value={filterType}
        onChange={handleFilterChange}
        label="Filter By Type"
        sx={{ fontSize: "14px" }}
      >
        <StyledMenuItem value="all">All Entries</StyledMenuItem>
        <StyledMenuItem value="income">Income</StyledMenuItem>
        <StyledMenuItem value="expense">Expense</StyledMenuItem>
      </Select>
    </StyledFormControl>
  );
};

export default TypeFilter;
