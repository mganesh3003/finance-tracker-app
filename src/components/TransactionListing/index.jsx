import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  TablePagination,
  IconButton,
  Stack,
  Button,
  ButtonGroup,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import TypeFilter from "./TypeFilter";
import CategoryFilter from "./CategoryFilter";
import AddTransactionForm from "../AddTransaction/AddTransactionForm";
import { deleteTransaction, setsortType } from "../../features/transactionSlice";

const TransactionTable = () => {
  const dispatch = useDispatch();
  const transactions = useSelector((state) => state.transactions.transactions);
  const filterCategory = useSelector(
    (state) => state.transactions.categoryType
  );
  const filterType = useSelector(
    (state) => state.transactions.filterType
  );
  const sortType = useSelector(
    (state) => state.transactions.sortType
  );

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openEditForm, setOpenEditForm] = useState(false);
  const [transactionToEdit, setTransactionToEdit] = useState(null);

  const handleEditClick = (transaction) => {
    setTransactionToEdit(transaction);
    setOpenEditForm(true);
  };

  const handleDeleteClick = (transactionId) => {
    dispatch(deleteTransaction(transactionId));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSort = (option) => {
    dispatch(setsortType(option));
  };

  const sortedTransactions = () => {
    if (sortType === "date") {
      return transactions.slice().sort((a, b) => a.date.localeCompare(b.date));
    } else if (sortType === "amount") {
      return transactions.slice().sort((a, b) => a.amount - b.amount);
    }
    return transactions;
  };

  const filteredTransactions = sortedTransactions().filter((transaction) => {
    let typeFilter = true;
    let categoryFilter = true;

    if (filterType !== "all") {
      typeFilter = transaction.type === filterType;
    }

    if (filterCategory !== "all") {
      categoryFilter = transaction.category === filterCategory;
    }

    return typeFilter && categoryFilter;
  });

  const slicedTransactions = filteredTransactions.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <>
      <Typography variant="h6" gutterBottom>
        All Transactions
      </Typography>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
        mb={4}
      >
        <ButtonGroup
          variant="outlined"
          color="primary"
          aria-label="sort options"
        >
          <Button
            onClick={() => handleSort("none")}
            variant={sortType === "none" ? "contained" : "outlined"}
            style={{
              fontSize: "12px",
              padding: "4px 8px",
              textTransform: "capitalize",
            }}
          >
            No Sort
          </Button>
          <Button
            onClick={() => handleSort("date")}
            variant={sortType === "date" ? "contained" : "outlined"}
            style={{
              fontSize: "12px",
              padding: "4px 8px",
              textTransform: "capitalize",
            }}
          >
            Sort by Date
          </Button>
          <Button
            onClick={() => handleSort("amount")}
            variant={sortType === "amount" ? "contained" : "outlined"}
            style={{
              fontSize: "12px",
              padding: "4px 8px",
              textTransform: "capitalize",
            }}
          >
            Sort by Amount
          </Button>
        </ButtonGroup>
        <Stack
          direction="row"
          justifyContent="end"
          alignItems="center"
          spacing={2}
        >
          <TypeFilter filterType={filterType} />
          <CategoryFilter
            filterCategory={filterCategory}
          />
        </Stack>
      </Stack>
      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Amount</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {slicedTransactions.length > 0 ? (
            slicedTransactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>₹{transaction.amount}</TableCell>
                <TableCell>{transaction.type}</TableCell>
                <TableCell>{transaction.date}</TableCell>
                <TableCell>{transaction.category}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => handleEditClick(transaction)}
                    aria-label="edit"
                  >
                    <EditIcon sx={{ color: "grey" }} />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDeleteClick(transaction.id)}
                    aria-label="delete"
                  >
                    <DeleteIcon sx={{ color: "grey" }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))) : (
              <TableRow>
                <TableCell colSpan={5}>No transactions to display</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={transactions.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <AddTransactionForm
        open={openEditForm}
        onClose={() => setOpenEditForm(false)}
        transactionToEdit={transactionToEdit}
      />
    </>
  );
};

export default TransactionTable;
