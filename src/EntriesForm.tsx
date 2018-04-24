import * as React from "react";
import { connect, Dispatch } from "react-redux";
import { IEntry } from "./model";
import { addEntrySaga } from "./sagas";
import { notifySaga } from "./sagas/notify";

interface IProps {
  addEntry: (entryName: string) => Promise<IEntry>;
}

class EntriesFormImpl extends React.PureComponent<IProps> {
  public render(): JSX.Element {
    return <input type="text" onKeyPress={this.handleInputKeyPress} />;
  }

  private handleInputKeyPress = (
    e: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    const { currentTarget } = e;
    const { addEntry } = this.props;
    if (currentTarget.value && e.key === "Enter") {
      currentTarget.disabled = true;
      addEntry(currentTarget.value)
        .then(() => {
          currentTarget.disabled = false;
          currentTarget.value = "";
        })
        .catch(() => {
          currentTarget.disabled = false;
        });
    }
  };
}

const mapDispatchToProps = (dispatch: Dispatch<void>) => ({
  addEntry: addEntrySaga(dispatch, notifySaga(dispatch))
});

export const EntriesForm = connect(null, mapDispatchToProps)(EntriesFormImpl);
