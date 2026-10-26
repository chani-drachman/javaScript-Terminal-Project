// Riddle number 4.
// Export a riddle object as the default export, with these properties:
// - id (number)
// - name (string)
// - taskDescription (string, the riddle text shown to the player)
// - correctAnswer (string)
export default  {
    id: 4,
    name: "Time",
      difficulty:"easy",
        timeLimit:5000,
    taskDescription: "How many months have 28 days?",
    correctAnswer: 3,
    choices:[2,4,6,12],
    hint:"more than 6"
  }