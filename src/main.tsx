import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./config/configureMobX";
import { SnackbarProvider } from "notistack";
createRoot(document.getElementById("root")!).render(
  // <StrictMode>
    <BrowserRouter>
    					<SnackbarProvider maxSnack={3} anchorOrigin={{ vertical:  window.innerWidth < 1021 ? 'top' : 'bottom', horizontal: 'left' }} autoHideDuration={3000} classes={{containerRoot: "z-alert"}}>

      <App />
      </SnackbarProvider>
    </BrowserRouter>
  // </StrictMode>,
);
