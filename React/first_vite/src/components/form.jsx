import React, { useState } from 'react';

const UserForm = (props) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password_con, setPasswordCon] = useState('');
  const [hasBeenSubmitted, sethasBeenSubmitted] = useState(false);
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passError, setPassError] = useState("");

  const createUser = (e) => {
    e.preventDefault();
    if(password != password_con){
      return setPassError("Passwords doesnt Match")
    }
    const newUser = { firstName, lastName, email, password, password_con };
    console.log('Welcome', newUser);
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setPasswordCon('');
    sethasBeenSubmitted(true);
  };

  const handleFirstName = (e) => {
    setFirstName(e.target.value);
    if(e.target.value.length < 1)
      setFirstNameError("First Name is required!");
    else if (e.target.value.length < 2)
      setFirstNameError("First Name must be atleast 2 Characters long")
    else 
      setFirstNameError("");
  }

  const handleLastName = (e) => {
    setLastName(e.target.value);
    if(e.target.value.length < 1)
      setLastNameError("Last Name is required!");
    else if (e.target.value.length < 2)
      setLastNameError("Last Name must be atleast 2 Characters long")
    else 
      setLastNameError("");
  }

  const handleEmail = (e) => {
    setEmail(e.target.value);
    if(e.target.value.length < 1)
      setEmailError("Email is required!");
    else if (e.target.value.length < 2)
      setEmailError("Email must be atleast 2 Characters long")
    else 
      setEmailError("");
  }

  const handlePassword = (e) => {
    setPassword(e.target.value);
    if(e.target.value.length < 2)
      setPassError("Password is required!");
    else if (e.target.value.length < 8)
      setPassError("Password must be atleast 8 Characters long")
    else 
      setPassError("");
  }

  const handlePasswordCon = (e) => {
    setPasswordCon(e.target.value);
    if(password != password_con)
      setPassConError("Passwords Must Match!")
  }

  return (
    <>
    <form onSubmit={createUser}>
        {
            hasBeenSubmitted ?
            <h3>Thank you for submitting the form!</h3>:
            <h3>Welcome, please submit the form</h3>
        }
        <div>
        <label>First Name:</label>
        <input
          type="text"
          value={firstName}
          required
          onChange={handleFirstName}/>
          {
            firstNameError ?
            <p>{firstNameError}</p> :
            ""
          }
      </div>
      <div>
        <label>Last Name:</label>
        <input
          type="text"
          value={lastName}
          required
          onChange={handleLastName}/>
          {
            lastNameError ?
            <p>{lastNameError}</p> :
            ""
          }
      </div>

      <div>
        <label>Email Address:</label>
        <input
          type="email"
          value={email}
          required
          onChange={handleEmail}/>
          {
            emailError ?
            <p>{emailError}</p> :
            ""
          }
      </div>

      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          required
          onChange={handlePassword}/>
          {
            passError ?
            <p>{passError}</p> :
            ""
          }
      </div>

      <div>
        <label>Confirm Password:</label>
        <input
          type="password"
          value={password_con}
          required
          onChange={handlePasswordCon}/>
      </div>
      <input type="submit" value="Create User" />
    </form>
    <div>
        <p>Name: {firstName} {lastName}</p>
        <p>Email: {email}</p>
        <p>Password: {password}</p>
        <p>Confirm Password: {password_con}</p>
    </div>
    </>
  );
};

export default UserForm;
