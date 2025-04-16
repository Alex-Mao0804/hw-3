import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./config/configureMobX";
import { SnackbarProvider } from "notistack";
import theme from "@/styles/theme";
import { ThemeProvider } from '@mui/material/styles'

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <ThemeProvider theme={theme}>

    <BrowserRouter>

    					<SnackbarProvider maxSnack={3} anchorOrigin={{ vertical:  window.innerWidth < 1021 ? 'top' : 'bottom', horizontal: 'left' }} autoHideDuration={3000} >

      <App />
      </SnackbarProvider>
    </BrowserRouter>
    </ThemeProvider>

  // </StrictMode>,
);
