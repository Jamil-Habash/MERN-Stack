const Player = require('../models/player.model');

module.exports = {
    index: async (req, res) => {
        try {
            const allPlayers = await Player.find();
            res.json(allPlayers);
        } catch (error) {
            res.status(400).json(error);
        }
    },

    create: async (req, res) => {
        try {
            const newPlayer = await Player.create(req.body);
            res.json(newPlayer);
        } catch (error) {
            console.log("Error creating player:", error);
            res.status(400).json({ 
                message: error.message,
                errors: error.errors
            });
        }
    },

    delete: async (req, res) => {
        try {
            const deletedPlayer = await Player.deleteOne({ _id: req.params.id });
            res.json(deletedPlayer);
        } catch (error) {
            res.status(400).json(error);
        }
    },

    updateStatus: async (req, res) => {
        try {
            const { gameId, status } = req.body;
            const player = await Player.findById(req.params.id);
            
            if (!player) {
                return res.status(404).json({ error: "Player not found" });
            }

            const statusIndex = player.statuses.findIndex(s => s.gameId === gameId);
            
            if (statusIndex !== -1) {
                player.statuses[statusIndex].status = status;
            } else {
                player.statuses.push({ gameId, status });
            }

            await player.save();
            res.json(player);
        } catch (error) {
            res.status(400).json(error);
        }
    }
};
