import { Dispatch } from "react-redux";
import { entries } from "../api";
import { IEntry } from "../model";
import { createEntriesAddAction } from "../redux/entries";

export const addEntrySaga = (
  dispatch: Dispatch<void>,
  notify: (msg: string, closable: boolean, timeout?: number) => void
) => (entryName: string): Promise<IEntry> =>
  entries
    .add(entryName)
    .then((entry: IEntry) => {
      dispatch(createEntriesAddAction(entry));
      notify(`Successfully added entry: „${entry.name}“`, false, 5000);
      return entry;
    })
    .catch(() => {
      notify("Unable to add entry.", false);
      throw new Error();
    });
