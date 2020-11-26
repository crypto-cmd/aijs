import { QState } from "./utils";

export type Experience<T>= {
    reward: number;
    prevStateId: T;
    nextStateId?: T;
    action: number;
};
