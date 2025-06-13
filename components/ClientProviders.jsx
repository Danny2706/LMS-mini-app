"use client";

import { ThemeProvider } from "next-themes";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import CustomToaster from "@/components/customToaster";

export default function ClientProviders({ children }) {
  return (
    <Provider store={store}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <CustomToaster />
        {children}
      </ThemeProvider>
    </Provider>
  );
}
