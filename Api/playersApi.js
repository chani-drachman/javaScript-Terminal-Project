async function findPlayerByName(name){
    try{
      const res=await fetch("http://localhost:3000/players")
        if(!res.ok){throw new Error("Failed to load players")}
    const players=await res.json()
    const player=players.find(p=>p.name===name)
    return player;  
    }catch (error) {
        console.error(error.message)
        throw error
    }
 
}

async function createNewPlayer(name){
    try{
          const res=await fetch("http://localhost:3000/players",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(name)
    })
    if(!res.ok){
        throw new Error("Failed to create player")
    }
    const newPLayer=await res.json()
    return newPLayer; 
    }
    catch (error) {
        console.error(error.message)
        throw error
    }
 
}

async function updatePlayer(player){
    try{
    const res=await fetch(`http://localhost:3000/players/${player.name}`,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(player)
    })
    if(!res.ok){throw new Error("Failed to update player")}
    const updated=awaitres.json()
    return updated
    
}catch (error) {
        console.error(error.message)
        throw error
    }}

async function getAllPlayers(){
    try { 
        const res=await fetch("http://localhost:3000/players")
    if(!res.ok){throw new Error("Failed to load players")}
    const players=await res.json()
    return players
        
    } catch (error) {
        console.error(error.message)
        throw error
    }
   
}