import { Environment } from "../../env/Envs.js";
import { Experience, QState } from "../../utils/utils.js";
import QAgent from "../QAgent.js";
export default class QTable extends QAgent {
    getRandomAction(state: QState): number {
        return this.get(state.id).randomAction();
    }
    getBestAction(state: QState) {
        return this.get(state.id).max();
    }
    async save(filename: string, isInBrowser = false) {
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
        } else {
            const { writeFile } = await import("fs");
            writeFile(filename, content, {}, (err) => {
                if (err) console.log(err);
            });
        }
    }

    private map: Map<string, QState> = new Map();
    constructor(env: Environment) {
        super(env);
    }
    add(state: QState) {
        this.map.set(state.id, state);
    }
    get(id: string): QState {
        return this.map.get(id) as QState;
    }
    contains(state: QState | string) {
        return this.map.has(typeof state === "string" ? state : state.id);
    }
    decay(num: number) {
        this.epsilon = this.epsilon >= 0.1 ? this.epsilon * num : 0.1;
    }

    update(
        {
            nextStateId,
            reward,
            action,
            prevStateId: stateId,
        }: Experience<string>,
        alpha: number,
        gamma: number
    ) {
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
        const target = reward + gamma * (c as number);
        const learned = prevState.get(action) as number;
        const temporal = target - learned;
        prevState.set(action, learned + alpha * temporal);
    }
}
