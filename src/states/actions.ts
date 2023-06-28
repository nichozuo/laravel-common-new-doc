import { state } from "./index";

export const stateActions = {
  setOpenApi: (openapi: any) => {
    state.session.openapi = openapi;
  },
  setType: (type: string) => {
    state.session.type = type;
  },
  setKey: (key: string | undefined) => {
    state.session.key = key;
  },
};
