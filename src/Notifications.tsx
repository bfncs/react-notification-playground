import * as React from 'react';
import './Notifications.css';
import {INotification} from "./model";
import NotificationItem from "./NotificationItem";

const {Transition} = require('react-spring');

interface IProps {
    notifications: INotification[];
    removeNotification: (notificationId: string) => void;
}

class Notifications extends React.Component<IProps> {
    render(): JSX.Element {
        const { notifications, removeNotification } = this.props;
        return (
            <div className="notifications-container">
                <Transition
                    keys={notifications.map(n => n.id)}
                    from={{opacity: 0, maxHeight: 0}}
                    enter={{opacity: 1, maxHeight: 1000}}
                    leave={{opacity: 0, maxHeight: 0}}>
                    {notifications.map(
                        n => (styles: any) => (
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

export default Notifications;
