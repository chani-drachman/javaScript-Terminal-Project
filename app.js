// Entry point of the game. Run it with: node app.js
//
// This file should:
// 1. Import PromptSync (from 'prompt-sync') and create the `prompt` function.
// 2. Import the Riddle class, the Player class, and the array of all riddles (from riddles/index.js).
// 3. Show a welcome message and ask the player for their name, then create a Player object.
// 4. Loop over all riddles. For each riddle:
//    - save the start time (Date.now())
//    - create a Riddle object and call its ask() method
//    - save the end time (Date.now())
//    - save the time using player.recordTime()
// 5. After the loop, call player.showStats() to show total time and average time per riddle.
import PromptSync from 'prompt-sync';

const prompt = PromptSync();
import Player from './classes/Player.js';
import Riddle from './classes/Riddle.js';
import MultipleChoiceRiddle from './classes/MultipleChoiceRiddle.js';

import * as riddleCrud from "./Api/riddlesApi.js"

 const menu=["1-Play the game", "2-Create a new riddle", "3-Read all riddles","4-Update an existing riddle",
    "5-Delete a riddle","6-View leaderboard","Exit"]
async function initGame(){
    console.log("choose an action")
 menu.forEach(i=>
    console.log(i)
 )
 let option=prompt("type the number fits your choice")
 if(option==1){
playTheGame()
 }
 else if(option==2){
    await createRiddle()
 }
 else if(option==3){
  await readRiddles()
 }
 else if(option==4){
updateRiddle()
 }
 else if(option==5){
    await deleteRiddle()
 }
 else{ exit()}
}
await initGame()

async function readRiddles(){
        console.log("Entered readRiddles");

const riddles=await riddleCrud.getAllRiddles()
console.log(riddles)
}
async function deleteRiddle(){
    let id=prompt("type riddle id")
    const res=await riddleCrud.deleteRiddle(id)
    if(res==true){console.log("riddle deleted successfully")}
    else{console.log("failed to delete riddle")}
    
}
async function createRiddle(){
    let id=prompt("Enter riddle id")
    let name=prompt("Enter riddle name:")
    let des=prompt("Enter description:")
    let correct=prompt("Enter correct answer:")
    let difficulty=prompt("Enter difficulty")
    let timeLimit=prompt("Enter time limit")

    const riddle=new Riddle(id, name, des, correct, difficulty, timeLimit)

    const res=await riddleCrud.createRiddle(riddle)
console.log("riddle added successfully", res)

}
async function updateRiddle(){
    let id=prompt("enter id of the riddle you want to change")
      let name=prompt("Enter riddle name:")
    let des=prompt("Enter description:")
    let correct=prompt("Enter correct answer:")
    let difficulty=prompt("Enter difficulty")
    let timeLimit=prompt("Enter time limit")

    const riddle=new Riddle(id, name, des, correct, difficulty, timeLimit)
    const res= await riddleCrud.updateRiddle(id, riddle)
    console.log("riddle successfully updated", res)
}

async function playTheGame(){
const riddles=await riddleCrud.getAllRiddles()
}

function shuffleRiddles(riddles) {
    for (let i = riddles.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));

        [riddles[i], riddles[j]] = [riddles[j], riddles[i]];
    }

    return riddles;
}

console.log("Welcome to the Riddle Game!");

let difficulty=prompt("'Choose difficulty: easy / medium / hard:")

const name = prompt("What is your name? ");
const player = new Player(name.trim());

shuffleRiddles(allRiddles);
allRiddles.forEach(riddle=>{
    if(riddle.difficulty===difficulty){
    let startTime=Date.now()
   let current=new Riddle(riddle.id, riddle.name, riddle.taskDescription, riddle.correctAnswer, riddle.difficulty, riddle.timeLimit, riddle.hint)
   let multiple=new MultipleChoiceRiddle(current, riddle.choices)
   let penalty=multiple.ask(prompt)
   let endTime=Date.now()+penalty

   player.recordTime(startTime, endTime)}
})
player.showStats()