import { IEntry } from "../model";

enum ActionTypes {
  FETCH = "entries:fetch",
  FETCH_SUCCESS = "entries:fetch:success",
  ADD = "entries:add"
}

export interface IEntriesFetchAction {
  type: ActionTypes.FETCH;
}

export interface IEntriesFetchSuccessAction {
  type: ActionTypes.FETCH_SUCCESS;
  entries: IEntry[];
}

export interface IEntriesAddAction {
  type: ActionTypes.ADD;
  entry: IEntry;
}

type IEntriesAction =
  | IEntriesFetchAction
  | IEntriesFetchSuccessAction
  | IEntriesAddAction;

export const createEntriesFetchAction = (): IEntriesFetchAction => ({
  type: ActionTypes.FETCH
});

export const createEntriesFetchSuccessAction = (
  entries: IEntry[]
): IEntriesFetchSuccessAction => ({
  entries,
  type: ActionTypes.FETCH_SUCCESS
});

export const createEntriesAddAction = (entry: IEntry): IEntriesAddAction => ({
  entry,
  type: ActionTypes.ADD
});

export interface IEntriesState {
  fetching: boolean;
  items: IEntry[];
}

const INITIAL_STATE: IEntriesState = {
  fetching: false,
  items: []
};

export default (
  state: IEntriesState = INITIAL_STATE,
  action: IEntriesAction
): IEntriesState => {
  switch (action.type) {
    case ActionTypes.FETCH:
      return {
        fetching: true,
        items: []
      };
    case ActionTypes.FETCH_SUCCESS:
      return {
        fetching: false,
        items: action.entries
      };
    case ActionTypes.ADD:
      return {
        fetching: state.fetching,
        items: [...state.items, action.entry]
      };
    default:
      return state;
  }
};
