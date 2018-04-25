import * as React from "react";
import "./App.css";
import { Entries } from "./Entries";
import Notifications from "./Notifications";

export default class App extends React.PureComponent {
  public render(): JSX.Element {
    return (
      <div className="app-container">
        <div className="app-notifications">
          <Notifications />
        </div>
        <div className="app-content">
          <Entries />
        </div>
      </div>
    );
  }
}
