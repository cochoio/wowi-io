export const actionTypes = {
  SetPage: "SetPage",
  GetUsers: "GetUsers",
  UnSubscribe: "UnSubscribe",
};

export type SetPage = {
  type: "SetPage";
  page: string;
};

export type GetUsers = {
  type: "GetUsers";
  page: string;
};

export type UnSubscribe = {
  type: "UnSubscribe";
};

export type IReceiver = SetPage | GetUsers | UnSubscribe;

/**
 * return get action type
 */
export function isAction(param: IReceiver) {
  if (!param.type) return false;
  return actionTypes[param.type];
}
