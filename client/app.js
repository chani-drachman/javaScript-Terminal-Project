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
import Player from "./classes/Player.js"
import Riddle from './classes/Riddle.js';
import {
    getAllRiddles,
    createRiddle as createRiddleAPI,
    updateRiddle as updateRiddleAPI,
    deleteRiddle as deleteRiddleAPI
} from "./Api/riddlesApi.js";
import {
    findPlayerByName,
    createNewPlayer,
    updatePlayer,
    getAllPlayers
} from "./Api/playersApi.js";

const menu = [
    "1 - Play the game",
    "2 - Create a new riddle",
    "3 - Read all riddles",
    "4 - Update an existing riddle",
    "5 - Delete a riddle",
    "6 - View leaderboard",
    "7 - Exit"
];

async function initGame() {

    console.log("Choose an action:");

    menu.forEach(item => console.log(item));

    const option = prompt("Type the number of your choice: ");

    if (option === "1") {
        await playTheGame();
    }
    else if (option === "2") {
        await createRiddle();
    }
    else if (option === "3") {
        await readRiddles();
    }
    else if (option === "4") {
        await updateRiddle();
    }
    else if (option === "5") {
        await deleteRiddle();
    }
    else if (option === "6") {
        await viewLeaderboard();
    }
    else if (option === "7") {
        console.log("Goodbye!");
        return;
    }
    else {
        console.log("Invalid choice");
    }
}

await initGame();

async function readRiddles() {
    const riddles = await getAllRiddles();
    console.log(riddles);
}

async function deleteRiddle() {
    const id = Number(prompt("Enter the ID of the riddle you want to delete:"));

    try {
        const res = await deleteRiddleAPI(id);

        if (res === true) {
            console.log("Riddle deleted successfully");
        }

    } catch (error) {
        console.error("Failed to delete riddle");
    }
}

async function createRiddle() {
    let name = prompt("Enter riddle name:");
    let taskDescription = prompt("Enter description:");
    let correctAnswer = prompt("Enter correct answer:");
    let difficulty = prompt("Enter difficulty");
    let timeLimit = Number(prompt("Enter time limit"));

    const riddle = {
        name,
        taskDescription,
        correctAnswer,
        difficulty,
        timeLimit
    };

    try {
        const res = await createRiddleAPI(riddle);
        console.log("Riddle added successfully:", res);

    } catch (error) {
        console.error("Failed to create riddle");
    }
}

async function updateRiddle() {
    let id = prompt("Enter ID of the riddle you want to change:");
    let name = prompt("Enter riddle name:");
    let taskDescription = prompt("Enter description:");
    let correctAnswer = prompt("Enter correct answer:");
    let difficulty = prompt("Enter difficulty");
    let timeLimit = Number(prompt("Enter time limit"));

    const riddle = {
        name,
        taskDescription,
        correctAnswer,
        difficulty,
        timeLimit
    };

    try {
        const res = await updateRiddleAPI(id, riddle);
        console.log("Riddle successfully updated:", res);

    } catch (error) {
        console.error("Failed to update riddle");
    }
}

async function playTheGame() {
    const riddles = await getAllRiddles();


    const name = prompt("enter your name")
    let playerData = await findPlayerByName(name);

    if (!playerData) {
        playerData = await createNewPlayer(name);
        console.log(`Welcome ${name}!`);
    }
    else {
        console.log(`Welcome back ${name}!`);

        if (playerData.lowestTime !== null) {
            console.log(
                `Your previous lowest time was ${playerData.lowestTime} seconds.`
            );
        }
    }
    let difficulty = prompt(
        "Choose difficulty (easy, medium, hard): "
    ).toLowerCase();
    const filteredRiddles = riddles.filter(
        riddle => riddle.difficulty.toLowerCase() === difficulty
    );

    if (filteredRiddles.length === 0) {
        console.log("No riddles found for this difficulty.");
        return;
    }
    const shuffledRiddles = shuffleRiddles(filteredRiddles);
    const player = new Player(name);
    for (const riddleData of shuffledRiddles) {
        const startTime = Date.now();
   const riddle = new Riddle(
        riddleData.id,
        riddleData.name,
        riddleData.taskDescription,
        riddleData.correctAnswer,
        riddleData.difficulty,
        riddleData.timeLimit
    );
         riddle.ask(prompt);

        const endTime = Date.now();
        player.recordTime(startTime, endTime);

    }
    console.log(`\nGreat job, ${player.name}!`);

    const totalTime = player.showStats();

    if (
        player.lowestTime === null ||
        totalTime < player.lowestTime
    ) {
        player.lowestTime = Number(totalTime.toFixed(2));

        await updatePlayer(player);

        console.log("New record! Time updated.");
    }
    else {
        console.log("Your previous record remains unchanged.");
    }

}

function shuffleRiddles(riddles) {
    for (let i = riddles.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));

        [riddles[i], riddles[j]] = [riddles[j], riddles[i]];
    }

    return riddles;
}

async function viewLeaderboard() {
    console.log("Leaderboard is not implemented yet.");
}

