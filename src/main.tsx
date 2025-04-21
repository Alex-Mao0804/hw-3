import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { HashRouter } from "react-router-dom";
import "./config/configureMobX";
import { SnackbarProvider } from "notistack";
import theme from "@/styles/theme";
import { ThemeProvider } from "@mui/material/styles";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <HashRouter>
        <SnackbarProvider
          maxSnack={3}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          autoHideDuration={3000}
        >
          <App />
        </SnackbarProvider>
      </HashRouter>
    </ThemeProvider>
  </StrictMode>,
);
