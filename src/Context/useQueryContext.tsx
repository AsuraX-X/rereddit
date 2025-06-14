import { useContext } from "react";
import { QueryContext } from "./QueryContext";

export const useQueryContext = () => {
  const QC = useContext(QueryContext);

  if (!QC) throw new Error("Context is not provided");
  else return QC;
};
