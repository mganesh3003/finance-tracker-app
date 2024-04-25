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
  Box,
  Button,
  ButtonGroup,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import TypeFilter from "./component/TypeFilter";
import CategoryFilter from "./component/CategoryFilter";
import AddTransactionForm from "../AddTransaction/component/AddTransactionForm";
import { deleteTransaction } from "../../features/transactionSlice";

const TransactionTable = () => {
  const dispatch = useDispatch();
  const transactions = useSelector((state) => state.transactions.transactions);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filterType, setFilterType] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [openEditForm, setOpenEditForm] = useState(false);
  const [transactionToEdit, setTransactionToEdit] = useState(null);
  const [sortOption, setSortOption] = useState("none");

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
    setSortOption(option);
  };

  const sortedTransactions = () => {
    if (sortOption === "date") {
      return transactions.slice().sort((a, b) => a.date.localeCompare(b.date));
    } else if (sortOption === "amount") {
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
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        marginBottom={2}
      >
        <ButtonGroup
          variant="outlined"
          color="primary"
          aria-label="sort options"
        >
          <Button
            onClick={() => handleSort("none")}
            variant={sortOption === "none" ? "contained" : "outlined"}
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
            variant={sortOption === "date" ? "contained" : "outlined"}
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
            variant={sortOption === "amount" ? "contained" : "outlined"}
            style={{
              fontSize: "12px",
              padding: "4px 8px",
              textTransform: "capitalize",
            }}
          >
            Sort by Amount
          </Button>
        </ButtonGroup>
        <TypeFilter filterType={filterType} setFilterType={setFilterType} />
        <CategoryFilter
          filterCategory={filterCategory}
          setFilterCategory={setFilterCategory}
        />
      </Box>
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
            {slicedTransactions.map((transaction) => (
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
                    <EditIcon color="primary" />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDeleteClick(transaction.id)}
                    aria-label="delete"
                  >
                    <DeleteIcon color="error" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
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
