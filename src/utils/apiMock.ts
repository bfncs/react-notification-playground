import { Chance } from "chance";
import { v4 as uuid } from "uuid";
import { IEntry } from "../model";

const CALL_DELAY_MIN = 700;
const CALL_DELAY_MAX = 2500;

const chance = Chance.Chance();

const randomInteger = (max: number, min: number = 0): number =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const callDelay = () => randomInteger(CALL_DELAY_MAX, CALL_DELAY_MIN);

const randomBoolean = (probability: number = 0.5) =>
  Math.random() <= probability;

const sampleEntry = (): IEntry => ({
  id: uuid(),
  name: chance.sentence({ words: 5 })
});

export const sampleEntries = (): IEntry[] =>
  Array.from({ length: randomInteger(10, 5) }, _ => sampleEntry());

interface IRequestedResponseSuccess<T> {
  success: true;
  payload: T;
}

export const success = <T>(payload: T): IRequestedResponseSuccess<T> => ({
  payload,
  success: true
});

interface IRequestedResponseError {
  success: false;
  errorMsg: string;
}

export const error = (errorMsg: string): IRequestedResponseError => ({
  errorMsg,
  success: false
});

type IRequestedResponse<T> =
  | IRequestedResponseSuccess<T>
  | IRequestedResponseError;

export const call = <T>(
  requestedResponse: IRequestedResponse<T>,
  errorProbability: number = 0.2
): Promise<T> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (requestedResponse.success) {
        if (randomBoolean(errorProbability)) {
          reject(
            "Injected error when fetching: \n" +
              JSON.stringify(requestedResponse.payload, null, 2)
          );
        } else {
          resolve(requestedResponse.payload);
        }
      } else {
        reject(requestedResponse.errorMsg);
      }
    }, callDelay());
  });
};
