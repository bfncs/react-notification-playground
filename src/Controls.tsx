import { Chance } from "chance";
import * as React from "react";
import "./Controls.css";
import { INotification, NotificationFromMessage } from "./model/Notification";

const chance = Chance.Chance();

interface IProps {
  addNotification: (notification: INotification) => void;
  removeNotification: (notificationId: string) => void;
  clearNotifications: () => void;
}

class Controls extends React.Component<IProps> {
  public addClosableNotification = () => {
    this.props.addNotification(NotificationFromMessage(chance.sentence()));
  };

  public addTimedNotification = () => {
    const notification = NotificationFromMessage(chance.sentence(), false);
    this.props.addNotification(notification);
    setTimeout(() => {
      this.props.removeNotification(notification.id);
    }, 7000);
  };

  public render(): JSX.Element {
    const { clearNotifications } = this.props;
    return (
      <div className="controls-container">
        <button
          className="controls-button"
          onClick={this.addClosableNotification}
        >
          Add closable notification
        </button>
        <button className="controls-button" onClick={this.addTimedNotification}>
          Add timed notification
        </button>
        <button className="controls-button" onClick={clearNotifications}>
          Clear notifications
        </button>
      </div>
    );
  }
}

export default Controls;
