import { useState } from "react";
import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Container, Grid } from "@mui/material";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./app/store.js";
import AddTranaction from "./components/AddTransaction/AddTransaction.jsx";
import TransactionListing from "./components/TransactionListing/TransactionListing.jsx";
import AmountBoxes from "./components/AmountBoxes/AmountBoxes.jsx";
import theme from "./theme";
import Login from "./components/Login/Login.jsx";
import Header from "./components/Header/Header.jsx";
import "./App.css";

function App() {
  const [loggedInUser, setLoggedInUser] = useState("");

  const handleLogin = (username) => {
    setLoggedInUser(username);
  };

  const handleLogout = () => {
    setLoggedInUser(null);
  };

  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Header loggedInUser={loggedInUser} onLogout={handleLogout} />
            <Container>
              {!loggedInUser ? (
                <Login onLogin={handleLogin} />
              ) : (
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
              )}
            </Container>
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
