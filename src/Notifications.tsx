import * as React from "react";
import { connect, Dispatch } from "react-redux";
import { INotification } from "./model";
import NotificationItem from "./NotificationItem";
import "./Notifications.css";
import { IAppState } from "./redux/index";
import { createRemoveNotificationAction } from "./redux/notifications";

// tslint:disable-next-line no-var-requires
const { Transition } = require("react-spring");

interface IProps {
  notifications: INotification[];
  removeNotification: (notificationId: string) => void;
}

class Notifications extends React.PureComponent<IProps> {
  public render(): JSX.Element {
    const { notifications, removeNotification } = this.props;
    return (
      <div className="notifications-container">
        <Transition
          keys={notifications.map(n => n.id)}
          from={{ opacity: 0, maxHeight: 0 }}
          enter={{ opacity: 1, maxHeight: 1000 }}
          leave={{ opacity: 0, maxHeight: 0 }}
        >
          {notifications.map(n => (styles: any) => (
            <div style={styles} className="notifications-item-wrapper">
              <NotificationItem
                notification={n}
                removeNotification={removeNotification}
              />
            </div>
          ))}
        </Transition>
      </div>
    );
  }
}

const mapStateToProps = ({ notifications }: IAppState) => ({
  notifications
});

const mapDispatchToProps = (dispatch: Dispatch<void>) => ({
  removeNotification: (notificationId: string) => {
    dispatch(createRemoveNotificationAction(notificationId));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
