"use client";

import * as React from "react";
import { init } from "@instantdb/react";

const appId = process.env.DB_APP_ID;
if (!appId) {
  throw new Error("DB_APP_ID is not defined");
}

export const db = init({ appId });

export function DataProvider({ children }: React.PropsWithChildren) {
  return <>{children}</>;
}
