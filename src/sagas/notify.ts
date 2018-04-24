import { Dispatch } from "react-redux";
import { NotificationFromMessage } from "../model/Notification";
import {
  createAddNotificationAction,
  createRemoveNotificationAction
} from "../redux/notifications";

export const notifySaga = (dispatch: Dispatch<void>) => (msg: string): void => {
  const notification = NotificationFromMessage(msg, false);
  dispatch(createAddNotificationAction(notification));
  setTimeout(() => {
    dispatch(createRemoveNotificationAction(notification.id));
  }, 3000);
};
