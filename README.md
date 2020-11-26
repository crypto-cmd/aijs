# AiJs _Currently In Development_

## A completely open-source collection of Artificial Intelligence Library

### Current Algorithms

-   Tabular QLearning

### Example (Tabular QLearning)

```TypeScript
// import QLearning Library
import {QLearning, Environment, UTILS} from "aijs";
const {TicTacToe} = Environment;
const {QTable} = QLearning;
const {Experience, QState}  = UTILS; //Only Typescript


const MAX_EPS:number = 100000; //Number of Episodes
const env:Environment = new TicTacToe(); //Create environment
const table:QTable = new QTable(env); //Create an RL agent

for (let i = 0; i < MAX_EPS; i++) { //Training Loop
    env.reset(); //Set the eenvironment for training
    while(!env.terminated) { // Game Loop
        const state:QState = env.getState(); //Get the current state
        if (!table.contains(state)) { //Has the agent seen this state before?
            //If it hasn't, add it.
            table.add(state);
        }
        const action:number =
                env.turnCount % 2 === 0 //If X's Turn:
                    ? table.getAction(state) //Get move from table (Agent move)
                    : table.getRandomAction(state); //Else: Get random legal move (Opponent)
        const exp:Experience  =  env.step(action);
        table.update(exp, alpha=0.1, gamma=0.99); //Train the table based on experience
        env.render("CONSOLE"); //Draw the environment
        }
    table.decay(0.998); //Decay epsilon every game
}
tabel.save("TicTacToe_Agent.json", isInBrowser=false); // Save table as json for later
```

### Coming Soon

-   Simple Perceptron and MultiLayer Perceptron
-   Convolutional Neural Network
-   Better Docs

### How Can You Contribute?

-   _Any ideas on how to get a process/function to be faster?_ Submit an issue
-   _Have any better name for the library?_ Submit an issue with an awesome name
-   _Need a new machine learning algorithm implemented?_ Submit an issue.
