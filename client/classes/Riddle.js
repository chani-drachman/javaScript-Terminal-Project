// The Riddle class. Export it as the default export.
//
// Properties (received in the constructor):
// - id
// - name
// - taskDescription
// - correctAnswer
//
// Method:
// - ask(prompt)
//   - show the riddle (name and taskDescription) to the player
//   - ask the player for an answer using the `prompt` function that is passed in
//   - keep asking until the answer is correct


class Riddle {
    constructor(id, name, taskDescription, correctAnswer, difficulty, timeLimit) {
        this.id = id;
        this.name = name;
        this.taskDescription = taskDescription;
        this.correctAnswer = correctAnswer;
        this.difficulty = difficulty;
        this.timeLimit = timeLimit;
    }


    ask(prompt) {
        console.log(`\n${this.name}`);
        console.log(this.taskDescription);

        let answer;

        while (
            String(answer).trim().toLowerCase() !==
            String(this.correctAnswer).trim().toLowerCase()
        ) {
            answer = prompt("Your answer: ");

            if (
                String(answer).trim().toLowerCase() !==
                String(this.correctAnswer).trim().toLowerCase()
            ) {
                console.log("Incorrect! Try again.");
            }
        }

        console.log("Correct! Well done!");
        return true;
    }
}

export default Riddle;