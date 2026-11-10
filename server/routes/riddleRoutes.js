import express from "express"
import Riddle from "../../client/classes/Riddle.js"
import {riddles} from "../db.js"  
const router=express.Router()

router.get("/", (req,res)=>{
    res.json(riddles)
})

router.post("/", (req, res)=>{
    const {name, taskDescription, correctAnswer, difficulty, timeLimit}=req.body
        const id = Math.max(0, ...riddles.map(r => r.id)) + 1;
const newRiddle=new Riddle(id,name, taskDescription, correctAnswer, difficulty, timeLimit)
riddles.push(newRiddle)
res.status(201).json(newRiddle)
})
router.put("/:id", (req, res)=>{
    const id=Number(req.params.id)
    const index=riddles.findIndex(r=> r.id===id)
    if(index==-1){
      return res.status(404).json({message:"Riddles not found"})
    }
    riddles[index]=new Riddle(
        id,
        req.body.name,
        req.body.taskDescription,
        req.body.correctAnswer,
        req.body.difficulty,
        req.body.timeLimit,
    )
    res.status(200).json(riddles[index])
})
router.delete("/:id", (req,res)=>{
    const id=Number(req.params.id)
    const index=riddles.findIndex(r=>r.id===id)
    if(index==-1){
        return res.status(404).json({message:"Riddle not found"})
    }
    riddles.splice(index,1)
    res.status(200).json({message:"riddle deleted successfully"})
})

export default router;