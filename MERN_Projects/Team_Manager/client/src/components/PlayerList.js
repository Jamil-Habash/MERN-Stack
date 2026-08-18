import React from 'react';
import axios from 'axios';

export default ({ players, onPlayerDeleted }) => {
    const handleDelete = (id, name) => {
        if (window.confirm(`Are you sure you want to remove ${name}?`)) {
            axios.delete(`http://localhost:8000/api/players/${id}`)
                .then(() => onPlayerDeleted())
                .catch(err => console.log(err));
        }
    };

    return (
        <div className="player-list">
            <h2>Manage Players | Manage Player Status</h2>
            <table>
                <thead>
                    <tr>
                        <th>Player Name</th>
                        <th>Preferred Position</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {players.map((player) => (
                        <tr key={player._id}>
                            <td>
                                <a href={`#/status/${player._id}`}>{player.name}</a>
                            </td>
                            <td>{player.preferredPosition}</td>
                            <td>
                                <button 
                                    className="delete-btn"
                                    onClick={() => handleDelete(player._id, player.name)}
                                >
                                    DELETE
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
