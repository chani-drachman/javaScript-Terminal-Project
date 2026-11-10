import Riddle from "./Riddle.js";

class MultipleChoiceRiddle extends Riddle{
    constructor(details, choices){
              super(
            details.id,
            details.name,
            details.taskDescription,
            details.correctAnswer,
            details.difficulty,
            details.timeLimit,
            details.hint
        );
        this.choices=choices
    }
ask(prompt) {
    console.log(this.taskDescription)
    let penalty=0;

    let isHint=prompt("Type 'hint' to receive a clue (adds 10 seconds penalty)")
    if(isHint=="hint"){
        penalty=10000
        console.log(this.hint)
    }
    this.choices.forEach((answer, index) => {
        console.log(`${index + 1}. ${answer}`);
    });
    let start=Date.now()
    let answer = prompt("Enter the number of the correct answer: ");
    let index = Number(answer) - 1;
    while(index!==Number(this.correctAnswer)){
       answer = prompt("try again! \n enter the number of the correct answer");
      index = Number(answer) - 1; 
    }
    let end=Date.now()
    let timeTracking=end-start;
   

    if (timeTracking<=this.timeLimit) {
        console.log("Correct answer! Well done!");
    }else{
                penalty = 5000;
        console.log("Too slow! 5 seconds penalty applied")

    }
    return penalty; 
}
}
export default MultipleChoiceRiddle 