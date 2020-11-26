import { Environment } from "../env/Envs";
import { QState } from "../utils/utils.js";

export default abstract class QAgent {
    protected epsilon: number = 1;
    constructor(protected env: Environment) {}
    abstract getRandomAction(s: QState): number;
    abstract getBestAction(s: QState): number;
    getAction(s: QState) {
        return this.epsilon > Math.random()
            ? this.getRandomAction(s)
            : this.getBestAction(s);
    }
}
