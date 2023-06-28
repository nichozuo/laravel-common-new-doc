import { proxy, useSnapshot } from "valtio";

export * from "./actions";

type SessionType = {
  openapi: object;
  type: string | undefined;
  key: string | undefined;

  apiData: any[];
  enumData: any[];
  docData: any[];
  dbData: any[];
};
const session: SessionType = proxy({
  openapi: {},
  type: undefined,
  key: undefined,

  apiData: [],
  enumData: [],
  docData: [],
  dbData: [],
});

export type StateType = {
  session: SessionType;
};
export const state: StateType = proxy({
  session,
});

export function useMyState() {
  const snap = useSnapshot<StateType>(state);
  return { snap };
}
