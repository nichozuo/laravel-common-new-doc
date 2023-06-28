import { proxy, useSnapshot } from "valtio";

export * from "./actions";

type SessionType = {
  openapi: object;
  treeData: [];
  type: string;
  key: string | undefined;
};
const session: SessionType = proxy({
  openapi: {},
  treeData: [],
  type: "api",
  key: undefined,
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
