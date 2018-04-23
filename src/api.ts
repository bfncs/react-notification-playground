import { v4 as uuid } from "uuid";
import { IEntry } from "./model";
import { call, error, sampleEntries, success } from "./utils/apiMock";

let entriesState: IEntry[] = sampleEntries();

const add = (name: string): Promise<IEntry> => {
  const newEntry = {
    id: uuid(),
    name
  };
  entriesState = [...entriesState, newEntry];
  return call(success(newEntry));
};

const fetch = (): Promise<IEntry[]> => call(success(entriesState), 0);

const remove = (entryId: string): Promise<void> => {
  const nextEntries = entriesState.filter(e => e.id !== entryId);
  const entryFound = nextEntries.length < entriesState.length;
  entriesState = nextEntries;

  return entryFound
    ? call(success(undefined))
    : call(error(`Unable to find entry with id ${entryId}.`));
};

export const entries = {
  add,
  fetch,
  remove
};
