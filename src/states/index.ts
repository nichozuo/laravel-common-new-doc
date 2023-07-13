import { proxy, useSnapshot } from "valtio";

export * from "./actions";

type ApiType = {
  uri: string;
  method: string;
};

type SessionType = {
  ready: boolean;
  openapi: object | undefined;
  type: string;
  key: string;
  apis: any[];
};
const session: SessionType = proxy({
  ready: false,
  openapi: undefined,
  type: "",
  key: "",
  apis: [],
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
