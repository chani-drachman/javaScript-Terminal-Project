// Riddle number 3.
// Export a riddle object as the default export, with these properties:
// - id (number)
// - name (string)
// - taskDescription (string, the riddle text shown to the player)
// - correctAnswer (string)
export default   {
    id: 3,
    name: "Math",
      difficulty:"hard",
        timeLimit:12000,
    taskDescription: "I am a number between 10 and 20. I am divisible by 5 and odd. What number am I?",
    correctAnswer: 3,
    choices:[12,13,14,15],
    hint:"14+1"
  }