"use client";

import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NextUIProvider } from "@nextui-org/react";
import { useRouter } from "next/navigation";

const QueryProvider = ({ children }: React.PropsWithChildren) => {
  const queryClient = new QueryClient();
  const router = useRouter();

  return (
    <QueryClientProvider client={queryClient}>
      {/* 추후 NEXTUI 프로바이더 따로 빼기? USE CLIENT */}
      <NextUIProvider>{children}</NextUIProvider>
      {/* navigate={router.push} */}
    </QueryClientProvider>
  );
};

export default QueryProvider;
