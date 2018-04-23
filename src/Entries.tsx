import * as React from "react";
import { connect } from "react-redux";
import { entries as entriesApi } from "./api";
import { EntriesForm } from "./EntriesForm";
import { IEntry } from "./model";
import { IAppState } from "./redux";
import {
  createEntriesFetchAction,
  createEntriesFetchSuccessAction,
  IEntriesFetchAction,
  IEntriesFetchSuccessAction
} from "./redux/entries";

interface IProps {
  entries: IEntry[];
  fetching: boolean;
  fetchEntries: () => IEntriesFetchAction;
  fetchEntriesSuccess: (entries: IEntry[]) => IEntriesFetchSuccessAction;
}

const EntriesList = (entries: IEntry[]): JSX.Element =>
  entries ? (
    <ul>{entries.map(f => <li key={f.id}>{f.name}</li>)}</ul>
  ) : (
    <div>Add your first entry now!</div>
  );

const LoadingView = (): JSX.Element => <div>Loading…</div>;

class EntriesImpl extends React.PureComponent<IProps> {
  public componentWillMount(): void {
    this.props.fetchEntries();
    entriesApi.fetch().then(entries => this.props.fetchEntriesSuccess(entries));
  }

  public render(): JSX.Element {
    const { fetching, entries } = this.props;
    return (
      <div>
        <h2>Entries:</h2>
        {fetching ? LoadingView() : EntriesList(entries)}
        <EntriesForm />
      </div>
    );
  }
}

const mapStateToProps = ({ entries }: IAppState) => ({
  entries: entries.items,
  fetching: entries.fetching
});

const mapDispatchToProps = {
  fetchEntries: createEntriesFetchAction,
  fetchEntriesSuccess: createEntriesFetchSuccessAction
};

export const Entries = connect(mapStateToProps, mapDispatchToProps)(
  EntriesImpl
);
