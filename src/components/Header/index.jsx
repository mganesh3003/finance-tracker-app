import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Typography, Button, styled, useTheme } from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { handleLoggedOut } from "../../features/authSlice";

const StyledHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "10px 20px",
  backgroundColor: theme.palette.primary.main,
  marginBottom: "20px",
}));

const Header = () => {
  const user = useSelector((state) => state.login.loggedInUser);
  const dispatch = useDispatch();
  const theme = useTheme();

  return (
    <StyledHeader>
      {!user.username ? (
        <Typography variant="h6" sx={{ color: theme.palette.primary.white }}>
          Finance App
        </Typography>
      ) : (
        <>
          <Typography variant="h6" sx={{ color: theme.palette.primary.white }}>
            Welcome, {user.username}!
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<ExitToAppIcon />}
            onClick={() => dispatch(handleLoggedOut())}
          >
            Logout
          </Button>
        </>
      )}
    </StyledHeader>
  );
};

export default Header;
