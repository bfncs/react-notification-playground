import { Dispatch } from "react-redux";
import { NotificationFromMessage } from "../model/Notification";
import {
  createAddNotificationAction,
  createRemoveNotificationAction
} from "../redux/notifications";

export const notifySaga = (dispatch: Dispatch<void>) => (
  msg: string,
  closable: boolean = true,
  timeout?: number
): void => {
  const notification = NotificationFromMessage(msg, closable);
  dispatch(createAddNotificationAction(notification));
  if (timeout) {
    setTimeout(() => {
      dispatch(createRemoveNotificationAction(notification.id));
    }, timeout);
  }
};
