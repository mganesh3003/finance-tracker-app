import React from "react";
import { Grid } from "@mui/material";
import { useSelector } from "react-redux";
import AddTranaction from "../components/AddTransaction";
import TransactionListing from "../components/TransactionListing";
import AmountBoxes from "../components/AmountBoxes";
import NoTransactions from "../components/NoTransaction";

export default function Dashboard() {
  const transactions = useSelector((state) => state.transactions.transactions);

  return (
    <>
      {transactions.length ? (
        <>
          <Grid container spacing={3}>
            <Grid item xs={3}>
              <AddTranaction />
              <AmountBoxes />
            </Grid>
            <Grid item xs={9}>
              <TransactionListing />
            </Grid>
          </Grid>
        </>
      ) : (
        <>
          <AddTranaction />
          <NoTransactions />
        </>
      )}
    </>
  );
}
