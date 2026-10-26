import Riddle from "./Riddle.js";

class MultipleChoiceRiddle extends Riddle{
    constructor(details, choices){
              super(
            details.id,
            details.name,
            details.taskDescription,
            details.correctAnswer
        );
        this.choices=choices
    }
ask(prompt) {
    console.log(this.taskDescription)
    this.choices.forEach((answer, index) => {
        console.log(`${index + 1}. ${answer}`);
    });

    const answer = prompt("Enter the number of the correct answer: ");
    const index = Number(answer) - 1;

    if (index === Number(this.correctAnswer)) {
        console.log("Correct answer! Well done!");
    } else {
        console.log("Try again!");
        this.ask(prompt);
    }
}
}
export default MultipleChoiceRiddle 