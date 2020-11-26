import { Experience, QState } from "../utils/utils.js";
import Environment from "./Environment.js";

export default class TicTacToe implements Environment {
    getState(): QState {
        const state = new QState(this.board.toString().replace(/,/g, ""), 9);
        this.board.forEach((v, index) =>
            v !== " " ? state.set(index, null) : null
        );
        return state;
    }
    board = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
    turnCount: number = 1;
    terminated: boolean = false;

    render(type: "CONSOLE" | "BROWSER"): void {
        const row1 = `${this.board[0]} | ${this.board[1]} | ${this.board[2]}`;
        const row2 = `${this.board[3]} | ${this.board[4]} | ${this.board[5]}`;
        const row3 = `${this.board[6]} | ${this.board[7]} | ${this.board[8]}`;
        var structureRow = "--|---|--" + "\n";
        console.log(row1);
        console.log(structureRow);
        console.log(row2);
        console.log(structureRow);
        console.log(row3);
    }
    step(action: number): Experience<string> {
        let reward = 0;
        let prevState = this.getState();
        let nextState;
        this.board.forEach((_, i) => prevState.set(i, null));
        if (this.terminated || this.board[action] !== " ") {
        } else {
            this.board[action] = this.turnCount % 2 == 0 ? "O" : "X";

            // Increment turn counter
            this.turnCount++;
            // Check for winner
            if (this.findWinner()) {
                this.terminated = true;
                reward = (this.turnCount - 1) % 2 == 0 ? -1 : 1;
            } else if (this.turnCount > 9) {
                reward = 0;
                this.terminated = true;
            } else {
                reward = 0.1;
                nextState = this.getState();
            }
        }
        return {
            reward: reward,
            action: action,
            prevStateId: prevState.id,
            nextStateId: nextState?.id,
        };
    }
    private isEqual(arr: string[]) {
        const a = arr[0];
        return arr.every((v) => v == a && a != " ");
    }
    private findWinner() {
        if (
            // Check rows
            this.isEqual([this.board[0], this.board[1], this.board[2]]) ||
            this.isEqual([this.board[3], this.board[4], this.board[5]]) ||
            this.isEqual([this.board[6], this.board[7], this.board[8]]) ||
            // Check columns
            this.isEqual([this.board[0], this.board[3], this.board[6]]) ||
            this.isEqual([this.board[1], this.board[4], this.board[7]]) ||
            this.isEqual([this.board[2], this.board[5], this.board[8]]) ||
            // Check diagonals
            this.isEqual([this.board[0], this.board[4], this.board[8]]) ||
            this.isEqual([this.board[2], this.board[4], this.board[6]])
        ) {
            return true;
        }
    }
    reset(): void {
        this.board = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
        this.turnCount = 1;
        this.terminated = false;
    }
}
