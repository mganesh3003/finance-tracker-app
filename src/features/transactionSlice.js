import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  transactions: [],
  categories: ['Salary', 'Rent', 'Groceries', 'Utilities'],
  totalIncome: 0,
  totalExpense: 0,
  balance: 0,
};

export const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    addTransaction: (state, action) => {
      action.payload.id = nanoid();
      state.transactions.push(action.payload);
      if (action.payload.type === 'income') {
        state.totalIncome += parseFloat(action.payload.amount);
      } else if (action.payload.type === 'expense') {
        state.totalExpense += parseFloat(action.payload.amount);
      }
      state.balance = state.totalIncome - state.totalExpense;
    },
    updateTransaction: (state, action) => {
      const { id, data } = action.payload;
      const index = state.transactions.findIndex((transaction) => transaction.id === id);
      if (index !== -1) {
        const oldTransaction = state.transactions[index];
        state.transactions[index] = { ...data };

        // Update totalIncome and totalExpense if type or amount has changed
        if (oldTransaction.type === 'income') {
          state.totalIncome -= parseFloat(oldTransaction.amount);
        } else if (oldTransaction.type === 'expense') {
          state.totalExpense -= parseFloat(oldTransaction.amount);
        }
        if (data.type === 'income') {
          state.totalIncome += parseFloat(data.amount);
        } else if (data.type === 'expense') {
          state.totalExpense += parseFloat(data.amount);
        }

        state.balance = state.totalIncome - state.totalExpense;
      }
    },
    deleteTransaction: (state, action) => {
      const id = action.payload;
      const deletedTransaction = state.transactions.find((transaction) => transaction.id === id);

      if (deletedTransaction) {
        // Update totalIncome and totalExpense based on the type of the deleted transaction
        if (deletedTransaction.type === 'income') {
          state.totalIncome -= deletedTransaction.amount;
        } else if (deletedTransaction.type === 'expense') {
          state.totalExpense -= deletedTransaction.amount;
        }

        // Remove the transaction from the transactions array
        state.transactions = state.transactions.filter((transaction) => transaction.id !== id);

        // Recalculate the balance
        state.balance = state.totalIncome - state.totalExpense;
      }

    },
    addCategory: (state, action) => {
      state.categories.push(action.payload);
    },
  },
});

export const { addTransaction, updateTransaction, deleteTransaction, addCategory } = transactionSlice.actions;
export default transactionSlice.reducer;
