import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// const redirectHomepage = () => {
//   <Link to="/homepage"></Link>
// }

//{email and password} mongo
//Includes user login, link to sign up, on sign in, route to HomeContainer
const Login = () => {
  const [state, setState] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const verifyLogin = (e) => {
    e.preventDefault();
    //check if key match db
    const userLogin = {
      email: state.email,
      password: state.password,
    };
    // console.log(userLogin); //OK
    //make a post request
    //check correct path
    //does not set any cookies @ login w/ {erica@erica.com, something}
    fetch('http://localhost:3000/account/log', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(userLogin),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log('post req', result);
        console.log('login OK');
        navigate('/homepage');
      })
      .catch((err) => {
        console.log('err at login');
      });
  };

  return (
    <div>
      <h2>sign in pl0x</h2>
      <h1>this is form:</h1>
      <div className="loginForm">
        {/* input form*/}
        {/* on submit, and verification, send to HomeContainer */}
        <form>
          <label for="email">Email: </label>
          <input
            type="text"
            id="email"
            placeholder="Enter Email"
            value={state.email}
            onChange={handleChange}
          ></input>
          <label for="password">Password: </label>
          <input
            type="text"
            id="password"
            placeholder="Enter Password"
            value={state.password}
            onChange={handleChange}
          ></input>
          <button type="submit" onClick={verifyLogin}>
            Login
          </button>
        </form>
      </div>
      <Link to="/signup">to signup</Link>
      <br></br>
      <Link to="/homepage/1">to homepage</Link>
    </div>
  );
};

export default Login;
