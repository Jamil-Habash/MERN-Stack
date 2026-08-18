const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Player name is required"],
        minlength: [2, "Player name must be at least 2 characters long"]
    },
    preferredPosition: {
        type: String,
        default: ""
    },
    statuses: [
        {
            gameId: {
                type: Number,
                required: true
            },
            status: {
                type: String,
                enum: ['Playing', 'Not Playing', 'Undecided'],
                default: 'Undecided'
            }
        }
    ]
}, { timestamps: true });

// Initialize statuses for 3 games when a new player is created
playerSchema.pre('save', function(next) {
    if (this.isNew && this.statuses.length === 0) {
        this.statuses = [
            { gameId: 1, status: 'Undecided' },
            { gameId: 2, status: 'Undecided' },
            { gameId: 3, status: 'Undecided' }
        ];
    }
    next();
});

module.exports = mongoose.model('Player', playerSchema);
