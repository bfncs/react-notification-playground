import { AnyAction, Dispatch } from "redux";
import { entries } from "../api";
import { IEntry } from "../model";
import { createEntriesAddAction } from "../redux/entries";
import { createSaga } from "../utils/reduxSagaCreator";
import { notifySaga } from "./notifications";

export const addEntrySaga: (
  dispatch: Dispatch<AnyAction>
) => (args: string) => Promise<IEntry> = createSaga<string, IEntry>(
  async (dispatch, entryName) => {
    const entry = await entries.add(entryName);
    dispatch(createEntriesAddAction(entry));
    notifySaga(dispatch)({
      closable: false,
      msg: `Successfully added entry: „${entry.name}“`,
      timeout: 5000
    });
    return entry;
  },
  dispatch => {
    notifySaga(dispatch)({
      closable: false,
      msg: "Unable to add entry."
    });
  }
);
