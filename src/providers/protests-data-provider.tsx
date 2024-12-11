"use client";

import * as React from "react";
import { init } from "@instantdb/react";
import { Protests_DB_Schema } from "@/@types/db.schema";

const appId = process.env.PROTESTS_DB_APP_ID;
if (!appId) {
  throw new Error("PROTESTS_DB_APP_ID is not defined");
}

export const protests_db = init<Protests_DB_Schema>({ appId });

export function DataProvider({ children }: React.PropsWithChildren) {
  return <>{children}</>;
}
