import "@/assets/css/index.css";
import "core-js/stable";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { HashRouter } from "react-router-dom";

import { StandalonePlayer } from "@/StandalonePlayer";
import { ThemeProvider } from "@/stores/theme";
import { initializeChromecast } from "./setup/chromecast";
import "./setup/i18n";

initializeChromecast();

const container = document.getElementById("root");
const root = createRoot(container!);

root.render(
  <StrictMode>
    <HelmetProvider>
      <ThemeProvider applyGlobal>
        <HashRouter>
          <StandalonePlayer />
        </HashRouter>
      </ThemeProvider>
    </HelmetProvider>
  </StrictMode>
);
