import { combineReducers } from "redux";

import entries, { IEntriesState } from "./entries";
import notifications, { INotificationsState } from "./notifications";

export interface IAppState {
  entries: IEntriesState;
  notifications: INotificationsState;
}

export const rootReducer = combineReducers({
  entries,
  notifications
});
