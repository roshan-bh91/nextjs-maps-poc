import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: (failureCount, error: any) =>
          failureCount < 2 && error?.response?.status >= 400, // retry on 4xx errors for 3 times
        retryDelay: (attemptIndex) => Math.min(1000 * 3 ** attemptIndex, 20000), // retry after 1s, 3s, 9s, 27s, 81s, 243s, 729s, 2187s, 6561s, 20000s
        refetchOnWindowFocus: process.env.MODE !== "development",
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
