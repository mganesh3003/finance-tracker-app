import React, { useState } from "react";
import { Button, Box } from "@mui/material";
import AddTransactionForm from "./AddTransactionForm";

const TransactionPage = () => {
  const [openAddTransaction, setOpenAddTransaction] = useState(false);

  const handleOpenAddTransaction = () => {
    setOpenAddTransaction(true);
  };

  const handleCloseAddTransaction = () => {
    setOpenAddTransaction(false);
  };

  return (
    <Box marginBottom={4.5}>
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpenAddTransaction}
      >
        Add Transaction
      </Button>
      <AddTransactionForm
        open={openAddTransaction}
        onClose={handleCloseAddTransaction}
      />
    </Box>
  );
};

export default TransactionPage;
