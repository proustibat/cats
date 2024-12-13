import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import App from "./App";

const queryClient = new QueryClient()

const ReactQueryDevtools =
    process.env.NODE_ENV === 'production'
        ? () => null // Render nothing in production
        : React.lazy( () =>
            // Lazy load in development
            import( '@tanstack/react-query-devtools' ).then( ( res ) => ( {
                default: res.ReactQueryDevtools,
            } ) ),
        );


const rootElement = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <App />
      <ReactQueryDevtools />
      </QueryClientProvider>
  </React.StrictMode>
);
