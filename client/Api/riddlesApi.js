
const BASE_URL = "http://localhost:3000/api/riddles";

export async function getAllRiddles() {
    try {
        const res = await fetch(BASE_URL);

        if (!res.ok) {
            throw new Error("Failed to fetch riddles");
        }

        const riddles = await res.json();
        return riddles;
    }
    catch (error) {
        console.error(error.message);
        throw error;
    }
}

export async function createRiddle(riddle) {
    try {
        const res = await fetch(BASE_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(riddle)
        });

        if (!res.ok) {
            const errorMessage = await res.text();
            console.log("Status:", res.status);
            console.log("Error from server:", errorMessage);
            throw new Error("Failed to create riddle");
        }

        const newRiddle = await res.json();
        return newRiddle;
    }
    catch (error) {
        console.error(error.message);
        throw error;
    }
}

export async function updateRiddle(id, riddle) {
    try {
        const res = await fetch(`${BASE_URL}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(riddle)
        });

        if (!res.ok) {
            throw new Error("Failed to update");
        }

        const updated = await res.json();
        console.log("JSON received!");

        return updated;
    }
    catch (error) {
        console.error(error.message);
        throw error;
    }
}

export async function deleteRiddle(id) {
    try {
        const res = await fetch(`${BASE_URL}/${id}`, {
            method: "DELETE"
        });

        if (!res.ok) {
            throw new Error("Failed to delete riddle");
        }

        return true;
    } catch (error) {
        console.error(error.message);
        throw error;
    }
}
