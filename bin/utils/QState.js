export default class QState {
    constructor(id, numActions) {
        this.id = id;
        this.q = new Array(numActions).fill(0);
    }
    randomAction() {
        const possible = this.q
            .map((v, i) => {
            return { index: i, value: v };
        })
            .filter((v) => v.value !== null);
        const randIndex = Math.floor(Math.random() * possible.length);
        return possible[randIndex].index;
    }
    fill(value) {
        this.q.fill(value);
    }
    max() {
        let max = -Infinity;
        let maxIndex = NaN;
        for (let index = 0; index < this.q.length; index++) {
            const element = this.q[index];
            if (element != undefined) {
                maxIndex = max > element ? maxIndex : index;
            }
        }
        return maxIndex;
    }
    set(index, value) {
        this.q[index] = value;
    }
    get(index) {
        return this.q[index];
    }
}
