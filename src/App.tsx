import { NextUIProvider } from "@nextui-org/react";
import { Suspense } from "react";
import "./index.css";
import routes from "~react-pages";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient();

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <QueryClientProvider client={queryClient}>
        <NextUIProvider>{useRoutes(routes)}</NextUIProvider>
      </QueryClientProvider>
    </Suspense>
  );
}

export default App;
