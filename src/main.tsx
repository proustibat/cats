import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import App from "./App";
import { VotesProvider } from "./contexts/VotesContext.tsx";

const queryClient = new QueryClient();

export const ReactQueryDevtools =
    process.env.NODE_ENV === 'production'
        ? () => null // Render nothing in production
        : React.lazy( () =>
            // Lazy load in development
            import( '@tanstack/react-query-devtools' ).then( ( res ) => ( {
                default: res.ReactQueryDevtools,
            } ) ),
        );


// Render the app
const rootElement = document.getElementById( 'root' )!;
if ( !rootElement.innerHTML ) {
    const root = ReactDOM.createRoot( rootElement );
    root.render(
        <React.StrictMode>
            <QueryClientProvider client={queryClient}>
                <VotesProvider>
                    <App />
                </VotesProvider>
                <ReactQueryDevtools />
            </QueryClientProvider>
        </React.StrictMode>,
    );
}