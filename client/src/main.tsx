import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryProvider } from "./providers/QueryProvider.tsx";
import { HydrationProvider } from "./contexts/HydrationContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryProvider>
      <HydrationProvider>
        <App />
      </HydrationProvider>
    </QueryProvider>
  </StrictMode>
);
