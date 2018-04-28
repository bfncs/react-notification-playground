import { Dispatch } from "react-redux";
import { AnyAction } from "redux";
import { NotificationFromMessage } from "../model/Notification";
import {
  createAddNotificationAction,
  createRemoveNotificationAction
} from "../redux/notifications";
import { createSaga } from "../utils/reduxSagaCreator";

interface INotifyArgs {
  closable?: boolean;
  msg: string;
  timeout?: number;
}

export const notifySaga: (
  dispatch: Dispatch<AnyAction>
) => (args: INotifyArgs) => void = createSaga<INotifyArgs, void>(
  async (dispatch, { closable = true, msg, timeout }) => {
    const notification = NotificationFromMessage(msg, closable);
    dispatch(createAddNotificationAction(notification));
    if (timeout) {
      setTimeout(() => {
        dispatch(createRemoveNotificationAction(notification.id));
      }, timeout);
    }
  }
);
