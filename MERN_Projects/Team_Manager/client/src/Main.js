import React, {useState, useEffect} from 'react';
import axios from 'axios';

export default () => {
    useEffect(() => {
        axios.get('http://localhost:8000')
    }, []);
    return(
        <div>
        </div>
    )
}