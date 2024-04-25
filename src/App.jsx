import { useState } from "react";
import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Container } from "@mui/material";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./app/store.js";
import Dashboard from "./components/Dashbord/Dashboard";
import theme from "./theme";
import Login from "./components/Login/Login";
import Header from "./components/Header/Header";
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
                <Dashboard />
              )}
            </Container>
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
