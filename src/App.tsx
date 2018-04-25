import * as React from "react";
import { connect } from "react-redux";
import "./App.css";
import NotificationControls from "./Controls";
import { Entries } from "./Entries";
import { INotification } from "./model";
import Notifications from "./Notifications";
import { IAppState } from "./redux";
import {
  createRemoveNotificationAction,
  INotificationsRemoveAction
} from "./redux/notifications";

interface IProps {
  notifications: INotification[];
  removeNotification: (notificationId: string) => INotificationsRemoveAction;
}

class App extends React.Component<IProps> {
  public render(): JSX.Element {
    const { notifications, removeNotification } = this.props;
    return (
      <div className="app-container">
        <div className="app-notifications">
          <Notifications
            notifications={notifications}
            removeNotification={removeNotification}
          />
        </div>
        <div className="app-content">
          <NotificationControls />
          <Entries />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ notifications }: IAppState) => ({
  notifications
});

const mapDispatchToProps = {
  removeNotification: createRemoveNotificationAction
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
