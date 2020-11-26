import { Experience, QState } from "../utils/utils.js";

export default interface Environment {
    render(type: "CONSOLE" | "BROWSER"): void;
    step(action: number): Experience<any>;
    reset(): void;
    getState(): QState;
}
