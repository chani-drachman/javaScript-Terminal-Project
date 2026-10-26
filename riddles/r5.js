// Riddle number 5.
// Export a riddle object as the default export, with these properties:
// - id (number)
// - name (string)
// - taskDescription (string, the riddle text shown to the player)
// - correctAnswer (string)
export default   {
    id: 5,
    name: "Animals",
      difficulty:"medium",
        timeLimit:8000,
    taskDescription: "I have four legs, whiskers, and I say 'meow.' What am I?",
    correctAnswer: 1,
    choices:["a dog", "a cat", "a lion", "a bird"],
    hint:"starts with c"
  }