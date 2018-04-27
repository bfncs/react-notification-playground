import { Action, AnyAction, Dispatch } from "redux";

const NO_OP = (): void => {
  /* do nothing */
};

export const createSaga = <
  ExecutorArgument,
  ExecutorResult,
  A extends Action = AnyAction
>(
  execute: (
    dispatch: Dispatch<A>,
    args: ExecutorArgument
  ) => Promise<ExecutorResult>,
  onError: (dispatch: Dispatch<A>, error: Error) => void = NO_OP
) => {
  return (dispatch: Dispatch<A>) => async (
    args: ExecutorArgument
  ): Promise<ExecutorResult> => {
    try {
      return execute(dispatch, args);
    } catch (error) {
      onError(dispatch, error);
      throw error;
    }
  };
};
