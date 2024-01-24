"use client";

import { SessionProvider } from "next-auth/react";
import { FC, PropsWithChildren } from "react";

// layoutにSessionProviderを置くと、すべてuse clientになるから、ここで定義する

export const NextAuthProvider: FC<PropsWithChildren> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
}

