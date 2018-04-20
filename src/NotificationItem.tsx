import * as React from 'react';
import './NotificationItem.css';
import {INotification} from "./model";


interface IProps {
    notification: INotification;
    removeNotification: (notificationId: string) => void;
}

class NotificationItem extends React.Component<IProps> {
    createNotificationRemover = (notificationId: string) => () => {
        this.props.removeNotification(notificationId);
    };

    render(): JSX.Element {
        const { notification } = this.props;
        return (
            <div className="notificationItem">
                <div className="notificationItem-content">
                    {notification.message}
                </div>
                {notification.closable ? (
                    <div onClick={this.createNotificationRemover(notification.id)} className="notificationItem-close">❌</div>
                ) : null}
            </div>
        );
    }
}

export default NotificationItem;
