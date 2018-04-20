import { v4 as uuid } from "uuid";

export interface INotification {
    id: string,
    message: string,
    closable: boolean,
}

export const NotificationFromMessage = (message: string, closable = true) => ({
    id: uuid(),
    message,
    closable
});