import { Chance } from "chance";
import * as React from "react";
import { connect, Dispatch } from "react-redux";
import "./Controls.css";
import { createClearNotificationsAction } from "./redux/notifications";
import { notifySaga } from "./sagas/notifications";

const chance = Chance.Chance();

interface IProps {
  clearNotifications: () => void;
  notify: (msg: string, closable?: boolean, timeout?: number) => void;
}

class Controls extends React.Component<IProps> {
  public addClosableNotification = () => {
    this.props.notify(chance.sentence(), true);
  };

  public addTimedNotification = () => {
    this.props.notify(chance.sentence(), false, 7000);
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

const mapDispatchToProps = (dispatch: Dispatch<void>): IProps => ({
  clearNotifications: () => {
    dispatch(createClearNotificationsAction());
  },
  notify: notifySaga(dispatch)
});

export default connect(null, mapDispatchToProps)(Controls);
