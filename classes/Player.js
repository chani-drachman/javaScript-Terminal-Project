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
class Player{
    constructor(name){
        this.name=name
        this.times=[]
    }
recordTime(start,end){
    this.times.push((end-start)/1000)
}

showStats(){
    let total=0, avg=0;

    this.times.forEach(duration=>{
        total+=duration;
    })
    avg=(total/(this.times.length))/1000
    console.log(`total time:${total}, avarage time:${avg}`)
}

}
export default Player;