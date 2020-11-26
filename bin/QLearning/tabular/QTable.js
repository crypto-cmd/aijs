import QAgent from "../QAgent.js";
export default class QTable extends QAgent {
    constructor(env) {
        super(env);
        this.map = new Map();
    }
    getRandomAction(state) {
        return this.get(state.id).randomAction();
    }
    getBestAction(state) {
        return this.get(state.id).max();
    }
    async save(filename, isInBrowser = false) {
        const content = JSON.stringify(Array.from(this.map.values()));
        if (isInBrowser) {
            const a = document.createElement("a");
            const file = new Blob([content], {
                type: "json",
            });
            a.href = URL.createObjectURL(file);
            a.download = filename;
            a.click();
            URL.revokeObjectURL(a.href);
        }
        else {
            const { writeFile } = await import("fs");
            writeFile(filename, content, {}, (err) => {
                if (err)
                    console.log(err);
            });
        }
    }
    add(state) {
        this.map.set(state.id, state);
    }
    get(id) {
        return this.map.get(id);
    }
    contains(state) {
        return this.map.has(typeof state === "string" ? state : state.id);
    }
    decay(num) {
        this.epsilon = this.epsilon >= 0.1 ? this.epsilon * num : 0.1;
    }
    update({ nextStateId, reward, action, prevStateId: stateId, }, alpha, gamma) {
        const prevState = this.get(stateId);
        if (nextStateId == undefined) {
            //Terminal State
            prevState.set(action, reward);
            return;
        }
        const nextState = this.contains(nextStateId)
            ? this.get(nextStateId)
            : this.env.getState();
        const c = nextState.get(nextState.max());
        const target = reward + gamma * c;
        const learned = prevState.get(action);
        const temporal = target - learned;
        prevState.set(action, learned + alpha * temporal);
    }
}
