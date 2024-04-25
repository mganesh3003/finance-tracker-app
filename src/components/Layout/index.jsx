import React from "react";
import { Container } from "@mui/material";
import Header from "../Header";

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <Container>
        {children}
      </Container>
    </>
  );
}
