import react from 'react';

const BoxDisplay = (props) => {

    return (
        <div
            style={{
                width: '150px',
                height: '150px',
                backgroundColor: props.box,
                marginTop: '20px',
                border: '2px solid #333',
                borderRadius: '8px'
            }}
        />
    );
};

export default BoxDisplay;