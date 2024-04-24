import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#673AB6",
      white: "#fff",
    },
    typography: {
      fontFamily: "Montserrat, sans-serif",
      fontWeightRegular: 400,
      fontWeightMedium: 500,
    },
  },
});

export default theme;
