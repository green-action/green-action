"use client";

import { NextUIProvider } from "@nextui-org/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SessionProvider } from "next-auth/react";
import React from "react";

const QueryProvider = ({ children }: React.PropsWithChildren) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <NextUIProvider>
        <SessionProvider>
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </SessionProvider>
      </NextUIProvider>
    </QueryClientProvider>
  );
};

export default QueryProvider;
