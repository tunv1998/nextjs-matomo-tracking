import type { AppProps } from "next/app";
import { useEffect, useState } from "react";

import { ChakraProvider } from "@chakra-ui/react";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";

import LargeWithNewsletter from "@/modules/layouts/footer";
import WithSubnavigation from "@/modules/layouts/header";

import { init } from "@socialgouv/matomo-next";

const MATOMO_URL = process.env.NEXT_PUBLIC_MATOMO_URL ?? "";
const MATOMO_SITE_ID = process.env.NEXT_PUBLIC_MATOMO_SITE_ID ?? "4";

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  useEffect(() => {
    init({ siteId: MATOMO_SITE_ID, url: MATOMO_URL });
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js");
    }
  }, []);

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
