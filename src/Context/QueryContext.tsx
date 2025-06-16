import { createContext } from "react";
import type { QCI } from "../InterfacesAndTypes";

export const QueryContext = createContext<QCI | undefined>(undefined);
