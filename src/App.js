import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {

  const [value, setValue] = useState({
    users: [],
    username: '',
    password: ''
  });

  useEffect(() => {
    // Update the document title using the browser API

  });

  const getUser = () => {
    axios.get(`http://localhost:4000/api/user/`)
      .then(res => {
        setValue({
          ...value,
          users: res.data.User
        });
        console.log(JSON.stringify(value.users));
      });
  }

  const handleChange = (event) => {
    setValue({
      ...value,
      [event.target.name]: event.target.value
    });
  }

  const handleSubmit = (event) => {
    console.log(JSON.stringify(value));
    event.preventDefault();
  }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={getUser}>Get List</button>
        <ol>
          {value.users.map((item, i) => <li key={i}>{item.username}</li>)}
        </ol>
        <div>
        </div>
      </header>
    </div>
  );
}

export default App;
