import React, { Suspense } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AptosWalletProvider } from "@razorlabs/wallet-kit";

import App from "./App";
import store from "./reducers";

import { Toaster } from "./components/shared/toaster";

const queryClient = new QueryClient();

const root = createRoot(document.getElementById("root"));

root.render(
  <Suspense
    fallback={
      <div id="sus-fallback">
        <h1>Loading</h1>
      </div>
    }
  >
    <QueryClientProvider client={queryClient}>
      <AptosWalletProvider>
        <Provider store={store}>
          <App />
        </Provider>
        <Toaster />
      </AptosWalletProvider>
    </QueryClientProvider>
  </Suspense>
);
