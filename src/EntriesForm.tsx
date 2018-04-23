import * as React from "react";
import { connect } from "react-redux";
import { entries as entriesApi } from "./api";
import { IEntry, INotification } from "./model";
import { NotificationFromMessage } from "./model/Notification";
import { createEntriesAddAction, IEntriesAddAction } from "./redux/entries";
import {
  createAddNotificationAction,
  createRemoveNotificationAction,
  INotificationsAddAction,
  INotificationsRemoveAction
} from "./redux/notifications";

interface IProps {
  addEntry: (entry: IEntry) => IEntriesAddAction;
  addNotification: (notification: INotification) => INotificationsAddAction;
  removeNotification: (notificationId: string) => INotificationsRemoveAction;
}

class EntriesFormImpl extends React.PureComponent<IProps> {
  public render(): JSX.Element {
    return <input type="text" onKeyPress={this.handleInputKeyPress} />;
  }

  private notify = (msg: string) => {
    const notification = NotificationFromMessage(msg, false);
    this.props.addNotification(notification);
    setTimeout(() => {
      this.props.removeNotification(notification.id);
    }, 3000);
  };

  private handleInputKeyPress = (
    e: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    const { addEntry } = this.props;
    const { currentTarget } = e;
    if (currentTarget.value && e.key === "Enter") {
      currentTarget.disabled = true;
      entriesApi
        .add(currentTarget.value)
        .then((entry: IEntry) => {
          currentTarget.disabled = false;
          currentTarget.value = "";
          addEntry(entry);
          this.notify("Successfully added entry.");
        })
        .catch(() => {
          currentTarget.disabled = false;
          this.notify("Unable to add entry.");
        });
    }
  };
}

const mapDispatchToProps = {
  addEntry: createEntriesAddAction,
  addNotification: createAddNotificationAction,
  removeNotification: createRemoveNotificationAction
};

export const EntriesForm = connect(null, mapDispatchToProps)(EntriesFormImpl);
