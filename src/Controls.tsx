import * as React from 'react';
import {Chance} from 'chance';
import './Controls.css';
import {INotification, NotificationFromMessage} from "./model/Notification";

const chance = Chance.Chance();

interface IProps {
    addNotification: (notification: INotification) => void,
    removeNotification: (notificationId: string) => void,
    clearNotifications: () => void,
}

class Controls extends React.Component<IProps> {
    addClosableNotification = () => {
        this.props.addNotification(NotificationFromMessage(chance.sentence()));
    };

    addTimedNotification = () => {
        const notification = NotificationFromMessage(chance.sentence(), false);
        this.props.addNotification(notification);
        setTimeout(
            () => { this.props.removeNotification(notification.id) },
            7000
        );
    };

    render(): JSX.Element {
        const {addClosableNotification, addTimedNotification, props: {clearNotifications}} = this;
        return (
            <div className="controls-container">
              <button className="controls-button" onClick={addClosableNotification}>Add closable notification</button>
              <button className="controls-button" onClick={addTimedNotification}>Add timed notification</button>
              <button className="controls-button" onClick={clearNotifications}>Clear notifications</button>
            </div>
        );
    }
}

export default Controls;
