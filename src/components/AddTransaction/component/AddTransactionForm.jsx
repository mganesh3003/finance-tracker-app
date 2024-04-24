import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  addTransaction,
  addCategory,
  updateTransaction,
} from "../../../features/transactionSlice";

const AddTransactionForm = ({ open, onClose, transactionToEdit }) => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.transactions.categories);

  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("");
  const [customCategory, setCustomCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [errors, setErrors] = useState({ category: false, amount: false });

  useEffect(() => {
    if (transactionToEdit) {
      setType(transactionToEdit.type);
      setCategory(transactionToEdit.category);
      setAmount(transactionToEdit.amount);
      setDate(transactionToEdit.date);
    }
  }, [transactionToEdit]);

  const handleAddTransaction = () => {
    let isValid = true;

    if (!category && !customCategory) {
      isValid = false;
      setErrors((prevState) => ({ ...prevState, category: true }));
    }

    if (!amount || isNaN(amount)) {
      isValid = false;
      setErrors((prevState) => ({ ...prevState, amount: true }));
    }

    if (!isValid) {
      return; // Do not proceed with submission if there are validation errors
    }

    const selectedCategory = customCategory || category;
    if (!categories.includes(selectedCategory)) {
      dispatch(addCategory(selectedCategory));
    }

    const newTransaction = { type, category: selectedCategory, amount, date };

    if (transactionToEdit) {
      // If editing an existing transaction, dispatch updateTransaction action
      dispatch(
        updateTransaction({ id: transactionToEdit.id, data: newTransaction })
      );
    } else {
      // Otherwise, dispatch addTransaction action
      dispatch(addTransaction(newTransaction));
    }

    setType("expense");
    setCategory("");
    setCustomCategory("");
    setAmount("");
    setDate(new Date().toISOString().slice(0, 10)); // Reset to today's date
    setErrors({ category: false, amount: false }); // Reset errors after successful submission
    onClose(); // Close the modal after adding the transaction
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {transactionToEdit ? "Edit Transaction" : "Add Transaction"}
      </DialogTitle>
      <DialogContent>
        <TextField
          select
          label="Type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          fullWidth
          margin="dense"
        >
          <MenuItem value="income">Income</MenuItem>
          <MenuItem value="expense">Expense</MenuItem>
        </TextField>
        <TextField
          select
          label="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          fullWidth
          margin="dense"
          error={errors.category}
        >
          {categories.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        {errors.category && (
          <Typography variant="caption" color="error">
            Please select or add a category
          </Typography>
        )}
        <TextField
          label="Custom Category"
          value={customCategory}
          onChange={(e) => setCustomCategory(e.target.value)}
          fullWidth
          margin="dense"
        />
        <TextField
          type="number"
          label="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          fullWidth
          margin="dense"
          error={errors.amount}
        />
        {errors.amount && (
          <Typography variant="caption" color="error">
            Please enter a valid amount
          </Typography>
        )}
        <TextField
          type="date"
          label="Date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          fullWidth
          margin="dense"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddTransaction}
        >
          {transactionToEdit ? "Update Transaction" : "Add Transaction"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTransactionForm;
