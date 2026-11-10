import express from "express";
import riddlesRoutes from "./routes/riddleRoutes.js"
import playersRoutes from "./routes/playerRoutes.js"

const app=express();
app.use(express.json())

app.use("/api/riddles", riddlesRoutes);
app.use("/api/players", playersRoutes)

const PORT=3000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});