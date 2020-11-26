import { QState } from "../utils/utils.js";
export default class CrossTheBridge {
    constructor() {
        this.currState = [0, 0, 0, 0];
        this.POSITIVE_REWARD = 1;
        this.terminated = false;
        this.NEGATIVE_REWARD = 0;
    }
    step(action) {
        if (this.currState[action] === 1) {
            this.terminated = true;
            return {
                reward: this.NEGATIVE_REWARD,
                action: action,
                prevStateId: new QState(this.currState.toString(), this.currState.length),
            };
        }
        const copy = new QState(this.currState.toString(), this.currState.length);
        this.currState[action] = 1;
        return {
            reward: this.POSITIVE_REWARD,
            action: action,
            prevStateId: copy,
            nextStateId: new QState(this.currState.toString(), this.currState.length),
        };
    }
    reset() {
        this.currState = [0, 0, 0, 0];
        this.terminated = false;
    }
    render(type) {
        console.clear();
        console.log(this.currState);
    }
}
