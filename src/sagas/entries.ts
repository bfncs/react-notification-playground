import { Dispatch } from "react-redux";
import { entries } from "../api";
import { IEntry } from "../model";
import { createEntriesAddAction } from "../redux/entries";

export const addEntrySaga = (
  dispatch: Dispatch<void>,
  notify: (msg: string, closable: boolean, timeout?: number) => void
) => (entryName: string): Promise<IEntry> => {
  return new Promise((resolve, reject) => {
    entries
      .add(entryName)
      .then((entry: IEntry) => {
        dispatch(createEntriesAddAction(entry));
        notify("Successfully added entry.", false, 5000);
        resolve(entry);
      })
      .catch(() => {
        notify("Unable to add entry.", false);
        reject();
      });
  });
};
