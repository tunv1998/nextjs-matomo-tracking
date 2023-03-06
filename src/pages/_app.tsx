import type { AppProps } from "next/app";
import { useState } from "react";

import { ChakraProvider } from "@chakra-ui/react";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";

import LargeWithNewsletter from "@/modules/layouts/footer";
import WithSubnavigation from "@/modules/layouts/header";

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <WithSubnavigation />
        <Hydrate state={pageProps.dehydratedState}>
          <Component {...pageProps} />
        </Hydrate>
        <LargeWithNewsletter />
      </ChakraProvider>
    </QueryClientProvider>
  );
}
