import React from "react";
import { Typography, Box, Paper } from "@mui/material";
import transactions from "../../assets/no-transaction.png";

function NoTransactions() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      width="100%"
      marginBottom="2rem"
      backgroundColor="#fcfcfc"
    >
      <Paper elevation={0} style={{ padding: "2rem" }}>
        <img src={transactions} alt="No Transactions" style={{ width: "400px", marginBottom: "1rem" }} />
        <Typography variant="body1" align="center">
          Currently, You Have No Transactions!
        </Typography>
      </Paper>
    </Box>
  );
}

export default NoTransactions;
