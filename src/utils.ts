import { v4 as uuid } from "uuid";

export const getAverage = ( arr: number[] ) => ( arr.reduce( ( acc, curr ) => acc + curr, 0 ) ) / arr.length;
export const getUid = (): string => crypto.randomUUID ? crypto.randomUUID() : uuid();
