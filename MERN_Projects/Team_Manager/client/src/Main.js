import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PlayerList from './components/PlayerList';
import AddPlayer from './components/AddPlayer';
import PlayerStatus from './components/PlayerStatus';

export default () => {
    const [players, setPlayers] = useState([]);
    const [view, setView] = useState('list');
    const [selectedPlayerId, setSelectedPlayerId] = useState(null);

    useEffect(() => {
        fetchPlayers();
        
        // Handle hash-based routing
        const handleHashChange = () => {
            const hash = window.location.hash;
            if (hash.startsWith('#/status/')) {
                const playerId = hash.split('/')[2];
                setSelectedPlayerId(playerId);
                setView('status');
            } else {
                setView('list');
            }
        };

        window.addEventListener('hashchange', handleHashChange);
        handleHashChange(); // Initialize on mount
        
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    const fetchPlayers = () => {
        axios.get('http://localhost:8000/api/players')
            .then(res => setPlayers(res.data))
            .catch(err => console.log(err));
    };

    const handlePlayerDeleted = () => {
        fetchPlayers();
    };

    const handlePlayerAdded = () => {
        fetchPlayers();
    };

    const handleBack = () => {
        window.location.hash = '/';
        setView('list');
    };

    return (
        <div className="main">
            {view === 'list' ? (
                <>
                    <AddPlayer onPlayerAdded={handlePlayerAdded} />
                    <PlayerList players={players} onPlayerDeleted={handlePlayerDeleted} />
                </>
            ) : (
                <PlayerStatus playerId={selectedPlayerId} onBack={handleBack} />
            )}
        </div>
    );
}