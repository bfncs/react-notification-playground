import * as React from "react";
import { connect } from "react-redux";
import "./App.css";
import Controls from "./Controls";
import { INotification } from "./model";
import Notifications from "./Notifications";
import { IAppState } from "./redux";
import {
  createAddNotificationAction,
  createClearNotificationsAction,
  createRemoveNotificationAction,
  INotificationsAddAction,
  INotificationsClearAction,
  INotificationsRemoveAction
} from "./redux/notifications";

interface IProps {
  notifications: INotification[];
  addNotification: (notification: INotification) => INotificationsAddAction;
  removeNotification: (notificationId: string) => INotificationsRemoveAction;
  clearNotifications: () => INotificationsClearAction;
}

class App extends React.Component<IProps> {
  public render(): JSX.Element {
    const {
      notifications,
      addNotification,
      removeNotification,
      clearNotifications
    } = this.props;
    return (
      <div className="app-container">
        <div className="app-notifications">
          <Notifications
            notifications={notifications}
            removeNotification={removeNotification}
          />
        </div>
        <div className="app-content">
          <Controls
            addNotification={addNotification}
            removeNotification={removeNotification}
            clearNotifications={clearNotifications}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ notifications }: IAppState) => ({
  notifications
});

const mapDispatchToProps = {
  addNotification: createAddNotificationAction,
  clearNotifications: createClearNotificationsAction,
  removeNotification: createRemoveNotificationAction
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
