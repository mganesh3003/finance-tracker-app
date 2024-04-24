import React, { useEffect } from "react";
import { Typography, Button, styled } from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const StyledHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "10px 20px",
  backgroundColor: theme.palette.primary.main,
  marginBottom: "20px",
}));

const Header = ({ loggedInUser, onLogout }) => {
  return (
    <StyledHeader>
      {!loggedInUser ? (
        <Typography variant="h6" sx={{ color: "#FFF" }}>
          Finance App
        </Typography>
      ) : (
        <>
          <Typography variant="h6" sx={{ color: "#FFF" }}>
            Welcome, {loggedInUser}!
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<ExitToAppIcon />}
            onClick={onLogout}
          >
            Logout
          </Button>
        </>
      )}
    </StyledHeader>
  );
};

export default Header;
