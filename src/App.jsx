import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { PersistGate } from "redux-persist/integration/react";
import ProtectedRoute from "./components/ProtectedRoutes";
import AnonymousRoute from "./components/AnonymousRoutes";
import { store, persistor } from "./app/store.js";
import theme from "./theme";
import Layout from "./components/Layout";
import Login from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Layout>
              <Router>
                <Routes>
                  <Route
                    path="/"
                    element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/login"
                    element={
                      <AnonymousRoute>
                        <Login />
                      </AnonymousRoute>
                    }
                  />
                </Routes>
              </Router>
            </Layout>
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
