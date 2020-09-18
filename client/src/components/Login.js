import React, {useState} from "react";
import {axiosWithAuth} from '../utils/useApi'
import axios from 'axios'
import {useHistory} from 'react-router-dom'

const Login = () => {

  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  })

  let history = useHistory();

 const handleChange = (e) => {
      e.persist()
      setCredentials({
        ...credentials,
        [e.target.name]: e.target.value

      })
    }

  const login = (e) => {

    e.preventDefault()
    axiosWithAuth()
    .post('/login', credentials)
    .then(res => {
      localStorage.setItem('token', res.data.payload)
      history.push('/protected')
     
    })
    .catch(err => {
      console.log('Response error: ', err)
    })
    
  }
  // console.log(axiosWithAuth)
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      
     
      <form onSubmit={login}>
      <h1>Login</h1>

      <label htmlFor='username'>
      <input type='text' name='username' value={credentials.username} onChange={handleChange} placeholder='Enter your username'/>
      </label>

      <label htmlFor='password'>
      <input type='text' name='password' value={credentials.password} onChange={handleChange} placeholder='Enter your password'/>
      </label>
      <button onSubmit={login}>Login</button>
      </form>
     
    </>
  );
};

export default Login;
