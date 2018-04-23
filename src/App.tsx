import * as React from 'react';
import './App.css';
import Controls from "./Controls";
import {INotification} from "./model";
import Notifications from "./Notifications";

interface IState {
    notifications: INotification[],
}

const INITIAL_STATE: IState = { notifications: [] };

class App extends React.Component<any, IState> {
    constructor(props: any) {
        super(props);
        this.state = INITIAL_STATE;
    }

    public addNotification = (notification: INotification) => {
        this.setState(state => ({notifications: [...state.notifications, notification]}))
    };

    public removeNotification = (notificationId: string) => {
        this.setState(state => ({notifications: state.notifications.filter(n => n.id !== notificationId)}))
    };

    public clearNotifications = () => {
        this.setState(state => ({ notifications: [] }))
    };

    public render(): JSX.Element {
        const { notifications } = this.state;
        return (
            <div className="app-container">
                <div className="app-notifications">
                    <Notifications notifications={notifications} removeNotification={this.removeNotification}/>
                </div>
                <div className="app-content">
                    <Controls addNotification={this.addNotification} removeNotification={this.removeNotification} clearNotifications={this.clearNotifications}/>
                </div>
            </div>
        );
    }
}

export default App;
