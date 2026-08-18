import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

export default ({ playerId, onBack }) => {
    const [player, setPlayer] = useState(null);
    const [loading, setLoading] = useState(true);
    const games = [
        { id: 1, name: 'Game 1' },
        { id: 2, name: 'Game 2' },
        { id: 3, name: 'Game 3' }
    ];

    useEffect(() => {
        fetchPlayer();
    }, [playerId]);

    const fetchPlayer = () => {
        axios.get(`http://localhost:8000/api/players`)
            .then(res => {
                const foundPlayer = res.data.find(p => p._id === playerId);
                setPlayer(foundPlayer);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            });
    };

    const handleStatusChange = (gameId, newStatus) => {
        axios.put(`http://localhost:8000/api/players/${playerId}/status`, {
            gameId,
            status: newStatus
        })
            .then(res => {
                setPlayer(res.data);
            })
            .catch(err => console.log(err));
    };

    const getStatusColor = (status) => {
        if (status === 'Playing') return 'playing';
        if (status === 'Not Playing') return 'not-playing';
        return 'undecided';
    };

    if (loading) return <div>Loading...</div>;
    
    if (!player) return <div>Player not found</div>;

    return (
        <div className="player-status">
            <button onClick={onBack} className="back-btn">← Back</button>
            <h2>Player Status - {player.name}</h2>
            
            <div className="games-tabs">
                {games.map(game => (
                    <a key={game.id} href={`#/status/${playerId}?game=${game.id}`} className="game-tab">
                        {game.name}
                    </a>
                ))}
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Player Name</th>
                        <th colSpan="3">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {games.map(game => {
                        const playerStatus = player.statuses.find(s => s.gameId === game.id) || {};
                        const currentStatus = playerStatus.status || 'Undecided';
                        
                        return (
                            <tr key={game.id}>
                                <td>{player.name}</td>
                                <td>
                                    <button 
                                        className={`status-btn ${getStatusColor('Playing')} ${currentStatus === 'Playing' ? 'active' : ''}`}
                                        onClick={() => handleStatusChange(game.id, 'Playing')}
                                    >
                                        Playing
                                    </button>
                                </td>
                                <td>
                                    <button 
                                        className={`status-btn ${getStatusColor('Not Playing')} ${currentStatus === 'Not Playing' ? 'active' : ''}`}
                                        onClick={() => handleStatusChange(game.id, 'Not Playing')}
                                    >
                                        Not Playing
                                    </button>
                                </td>
                                <td>
                                    <button 
                                        className={`status-btn ${getStatusColor('Undecided')} ${currentStatus === 'Undecided' ? 'active' : ''}`}
                                        onClick={() => handleStatusChange(game.id, 'Undecided')}
                                    >
                                        Undecided
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};
