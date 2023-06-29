import { state } from "./index";

export const stateActions = {
  setReady: (ready: boolean) => {
    state.session.ready = ready;
  },
  setOpenApi: async (openapi: object | undefined) => {
    state.session.openapi = openapi;
  },
  setType: (type: string) => {
    state.session.type = type;
  },
  setKey: (key: string) => {
    state.session.key = key;
  },
};
