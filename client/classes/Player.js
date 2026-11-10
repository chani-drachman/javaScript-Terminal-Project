// The Player class. Export it as the default export.
//
// Properties:
// - name
// - times (an array that holds the time it took to solve each riddle)
//
// Methods:
// - recordTime(start, end)
//   - calculate the duration (end - start) and add it to the times array
// - showStats()
//   - show the total time and the average time per riddle
class Player {
    constructor(id, name, lowestTime = null) {
        this.id = id;
        this.name = name;
        this.lowestTime = lowestTime;
        this.times = [];
    }

    recordTime(start, end) {
        const duration = (end - start) / 1000;
        this.times.push(duration);
    }

    getTotalTime() {
        return this.times.reduce((total, duration) => total + duration, 0);
    }

    showStats() {
        const total = this.getTotalTime();

        const avg = this.times.length > 0
            ? total / this.times.length
            : 0;

        console.log(`Total time: ${total.toFixed(2)} seconds`);
        console.log(`Average time per riddle: ${avg.toFixed(2)} seconds`);

        return total;
    }
}

export default Player;