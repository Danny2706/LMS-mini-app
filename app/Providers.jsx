"use client"

import { ThemeProvider } from "next-themes"
import { SessionProvider } from "next-auth/react"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import { store, persistor } from "../globalStates/store"
import CustomToaster from "@/components/CustomToaster"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

export default function Providers({ children }) {
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
        retry: false,
      },
    },
  })

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <SessionProvider>
        <CustomToaster />
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <QueryClientProvider client={client}>
              <ReactQueryDevtools initialIsOpen={false} />
              {children}
            </QueryClientProvider>
          </PersistGate>
        </Provider>
      </SessionProvider>
    </ThemeProvider>
  )
}
