const BASE_URL = "http://localhost:3000/api/players";

export async function findPlayerByName(name) {
    try {
        const res = await fetch(
            `${BASE_URL}?name=${encodeURIComponent(name)}`
        );

        if (!res.ok) {
            throw new Error("Failed to load players");
        }

        const players = await res.json();

        return players[0] || null;

    } catch (error) {
        console.error(error.message);
        throw error;
    }
}

export async function createNewPlayer(name) {
    try {
        const res = await fetch(BASE_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                lowestTime: null
            })
        });

        if (!res.ok) {
            throw new Error("Failed to create player");
        }

        return await res.json();

    } catch (error) {
        console.error(error.message);
        throw error;
    }
}

export async function updatePlayer(player) {
    try {
        const res = await fetch(`${BASE_URL}/${player.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                lowestTime: player.lowestTime
            })
        });

        if (!res.ok) {
            throw new Error("Failed to update player");
        }

        return await res.json();

    } catch (error) {
        console.error(error.message);
        throw error;
    }
}

// GET ALL PLAYERS
export async function getAllPlayers() {
    try {
        const res = await fetch(BASE_URL);

        if (!res.ok) {
            throw new Error("Failed to load players");
        }

        return await res.json();

    } catch (error) {
        console.error(error.message);
        throw error;
    }
}