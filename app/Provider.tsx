"use client";

import { NextUIProvider } from "@nextui-org/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SessionProvider } from "next-auth/react";
import React from "react";

const QueryProvider = ({ children }: React.PropsWithChildren) => {
  const queryClient = new QueryClient();

  return (
    <NextUIProvider>
      <SessionProvider>
        <QueryClientProvider client={queryClient}>
          {children}
          <ReactQueryDevtools initialIsOpen={true} />
        </QueryClientProvider>
      </SessionProvider>
    </NextUIProvider>
  );
};

export default QueryProvider;
