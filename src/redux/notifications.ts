import { INotification } from "../model/Notification";

enum ActionTypes {
  ADD = "notifications:add",
  REMOVE = "notifications:remove",
  CLEAR = "notifications:clear"
}

export interface INotificationsAddAction {
  type: ActionTypes.ADD;
  notification: INotification;
}

export interface INotificationsRemoveAction {
  type: ActionTypes.REMOVE;
  notificationId: string;
}

export interface INotificationsClearAction {
  type: ActionTypes.CLEAR;
}

type INotificationsAction =
  | INotificationsAddAction
  | INotificationsRemoveAction
  | INotificationsClearAction;

export const createAddNotificationAction = (
  notification: INotification
): INotificationsAddAction => ({
  notification,
  type: ActionTypes.ADD
});

export const createRemoveNotificationAction = (
  notificationId: string
): INotificationsRemoveAction => ({
  notificationId,
  type: ActionTypes.REMOVE
});

export const createClearNotificationsAction = (): INotificationsClearAction => ({
  type: ActionTypes.CLEAR
});

export type INotificationsState = INotification[];

export default (
  state: INotificationsState = [],
  action: INotificationsAction
) => {
  switch (action.type) {
    case ActionTypes.ADD:
      return [...state, action.notification];
    case ActionTypes.REMOVE:
      return state.filter(n => n.id !== action.notificationId);
    case ActionTypes.CLEAR:
      return [];
    default:
      return state;
  }
};
