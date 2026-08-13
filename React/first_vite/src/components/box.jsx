import react, { useState } from 'react'

const BoxForm = (props) => {
    const [box, setBox] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();

        props.onNewBox(box.trim());
        setBox("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Color</label>
            <input
                type="text"
                placeholder="red, blue, #ff0000"
                onChange={(e) => setBox(e.target.value)}
                value={box}
            />
            <input type="submit" value="Add" />
        </form>
    );
};

export default BoxForm;