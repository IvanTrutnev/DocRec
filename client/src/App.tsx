import React, { useState, useEffect } from 'react';
import './App.css';
import config from './config';

const { rootApi } = config;

type User = {
  email: string,
  password: string,
  _id: string,
  name: string,
}

function App() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch(`${rootApi}/api/users`).then(res => res.json()).then(users => setUsers(users))
  }, [])
  return (
    <div className="App">
      {users.map((user: User) => (
        <div key={user._id}>
          {user.name}
        </div>
      ))
      }
    </div>
  );
}

export default App;
