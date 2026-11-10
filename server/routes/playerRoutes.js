import express from "express";
import { players } from "../db.js";

const router = express.Router();

// GET ALL PLAYERS OR FIND BY NAME
router.get("/", (req, res) => {

    const name = req.query.name;

    if (name) {
        const filteredPlayers = players.filter(
            player => player.name === name
        );

        return res.json(filteredPlayers);
    }

    res.json(players);
});

// CREATE NEW PLAYER
router.post("/", (req, res) => {

    const { name } = req.body;

    if (!name) {
        return res.status(400).json({
            error: "Player name is required"
        });
    }

    const id = Math.max(0, ...players.map(p => p.id)) + 1;

    const newPlayer = {
        id,
        name,
        lowestTime: null
    };

    players.push(newPlayer);

    res.status(201).json(newPlayer);
});

// UPDATE PLAYER'S LOWEST TIME
router.put("/:id", (req, res) => {

    const id = Number(req.params.id);

    const player = players.find(p => p.id === id);

    if (!player) {
        return res.status(404).json({
            error: "Player not found"
        });
    }

    player.lowestTime = req.body.lowestTime;

    res.status(200).json(player);
});

export default router;