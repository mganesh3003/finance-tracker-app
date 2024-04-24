import React from "react";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import InfoPaper from "./component/InfoPaper";

const AmountBoxes = () => {
  const { totalIncome, totalExpense, balance } = useSelector(
    (state) => state.transactions
  );

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      gap={3}
      marginBottom={3}
      marginTop={3}
    >
      <InfoPaper
        title="Balance"
        value={balance}
        iconColor={balance < 0 ? "red" : "inherit"}
      />
      <InfoPaper title="Total Income" value={totalIncome} iconColor="inherit" />
      <InfoPaper
        title="Total Expense"
        value={totalExpense}
        iconColor="inherit"
      />
    </Box>
  );
};

export default AmountBoxes;
