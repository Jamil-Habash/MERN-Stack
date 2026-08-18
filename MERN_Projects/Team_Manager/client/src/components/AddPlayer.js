import React, { useState } from 'react';
import axios from 'axios';

export default ({ onPlayerAdded }) => {
    const [formData, setFormData] = useState({
        name: '',
        preferredPosition: ''
    });
    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: '' });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Validation
        let newErrors = {};
        
        if (formData.name.length < 2) {
            newErrors.name = 'Name must be at least 2 characters long';
        }
        
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        axios.post('http://localhost:8000/api/players', formData)
            .then(() => {
                setFormData({ name: '', preferredPosition: '' });
                setErrors({});
                onPlayerAdded();
            })
            .catch(err => {
                console.log(err);
                setErrors({ submit: 'Error adding player' });
            });
    };

    return (
        <div className="add-player">
            <h3>Add Player</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Player Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter player name"
                    />
                    {errors.name && <span className="error">{errors.name}</span>}
                </div>
                <div>
                    <label>Preferred Position</label>
                    <input
                        type="text"
                        name="preferredPosition"
                        value={formData.preferredPosition}
                        onChange={handleInputChange}
                        placeholder="Enter preferred position (optional)"
                    />
                </div>
                <button type="submit" className="add-btn">ADD</button>
                {errors.submit && <span className="error">{errors.submit}</span>}
            </form>
        </div>
    );
};
