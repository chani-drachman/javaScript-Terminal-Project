import Riddle from "../client/classes/Riddle.js";

export const riddles = [
    new Riddle(
        3,
        "Math",
        "I am a number between 10 and 20. I am divisible by 5 and odd. What number am I?",
        3,
        "hard",
        12000
    ),

    new Riddle(
        4,
        "Time",
        "How many months have 28 days?",
        3,
        "hard",
        5000
    ),

    new Riddle(
        5,
        "Animals",
        "I have four legs, whiskers, and I say 'meow.' What am I?",
        1,
        "medium",
        8000
    ),

    new Riddle(
        1,
        "Bible",
        "Who is the father of Avraham?",
        "Terach",
        "easy",
        4000
    ),

    new Riddle(
        2,
        "Bible",
        "Who was the son of David?",
        "Shlomo",
        "easy",
        4000
    )
];

export let players = [];