import { combineReducers } from "redux";

import notifications, { INotificationsState } from "./notifications";

export interface IAppState {
  notifications: INotificationsState;
}

export const rootReducer = combineReducers({
  notifications
});
