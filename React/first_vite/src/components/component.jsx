import React, { useState } from 'react'

const PersonCard = (props) => {
    return(
        <div>
            <h1>{props.firstName} {props.lastName}</h1>
            <p>Age: {props.age}</p>
            <p>Hair Color: {props.color}</p>
        </div>
    );
}

//export default PersonCard;

const Counter = (props) => {
    const [count, setCount] = useState(0);

    const handleClick = () => {
        setCount(count + 1);
    }

    return(
        <div>
            { count }
            <button className="counter" onClick={handleClick}>Click Me</button>
        </div>
    );
}
//export default Counter;


const PersonAgeCard = (props) => {
    const [age, setAge] = useState(props.age);
    const handleClick = () =>{
        setAge(age+1);
    }
    return(
        <div>
            <h1>{props.lastName}, {props.firstName}</h1>
            <p>Age: {age}</p>
            <p>Hair Color: {props.color}</p>
            <button className="counter" onClick={handleClick} >Birthday Button for {props.firstName} {props.lastName}</button>
        </div>
    );
}
export default PersonAgeCard;