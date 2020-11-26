export default class QAgent {
    constructor(env) {
        this.env = env;
        this.epsilon = 1;
    }
    getAction(s) {
        return this.epsilon > Math.random()
            ? this.getRandomAction(s)
            : this.getBestAction(s);
    }
}
