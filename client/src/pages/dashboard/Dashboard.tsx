import React, { useState, useEffect } from 'react';
import { getAllUsers } from '../../services/users';

type User = {
  email: string;
  password: string;
  _id: string;
  username: string;
};

function Dashboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUser = async () => {
      try {
        const data = await getAllUsers();
        console.log(data);
        setUsers(data);
      } catch (e) {
        console.log(e);
      }
    };
    getUser();
  }, []);

  return (
    <div className="App">
      {users.map((user: User) => (
        <div key={user._id}>{user.username}</div>
      ))}
    </div>
  );
}

export default Dashboard;
