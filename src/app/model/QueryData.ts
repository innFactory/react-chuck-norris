import { QueryFunction } from "@tanstack/react-query";

export interface QueryData<T> {
  queryKey: string[];
  queryFn: QueryFunction<T, (string | number | undefined)[]>;
  enabled?: boolean;
}
