import { QValue } from "./QValue.js";

export default class QState {
    randomAction() {
        const possible = this.q
            .map((v, i) => {
                return { index: i, value: v };
            })
            .filter((v) => v.value !== null);
        const randIndex = Math.floor(Math.random() * possible.length);
        return possible[randIndex].index;
    }
    q: QValue[];
    constructor(public readonly id: string, numActions: number) {
        this.q = new Array(numActions).fill(0);
    }
    fill(value: QValue) {
        this.q.fill(value);
    }
    max() {
        let max = -Infinity;
        let maxIndex: number = NaN;
        for (let index = 0; index < this.q.length; index++) {
            const element = this.q[index];
            if (element != undefined) {
                maxIndex = max > element ? maxIndex : index;
            }
        }
        return maxIndex;
    }
    set(index: number, value: QValue) {
        this.q[index] = value;
    }
    get(index: number) {
        return this.q[index];
    }
}
