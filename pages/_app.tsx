import { CacheProvider, EmotionCache } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppProps } from "next/app";
import Head from "next/head";
import { RecoilRoot } from "recoil";
import { Toaster } from "sonner";
import createEmotionCache from "../src/app/theming/createEmotionCache";
import theme from "../src/app/theming/theme";
import { ProtectedRoute } from "../src/auth/components/ProtectedRoute";
import { AuthContextProvider } from "../src/auth/context/AuthContext";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const noAuthRequiredRoutes = ["/login", "/password-reset", "/signup"];

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <RecoilRoot>
          <CacheProvider value={emotionCache}>
            <Head>
              <meta
                name="viewport"
                content="initial-scale=1, width=device-width"
              />
            </Head>
            <ThemeProvider theme={theme}>
              {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
              <CssBaseline />
              {noAuthRequiredRoutes.includes(props.router.pathname) ? (
                <Component {...pageProps} />
              ) : (
                <ProtectedRoute>
                  <Component {...pageProps} />
                </ProtectedRoute>
              )}
            </ThemeProvider>
            <Toaster />
          </CacheProvider>
        </RecoilRoot>
      </AuthContextProvider>
    </QueryClientProvider>
  );
}
