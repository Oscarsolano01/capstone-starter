import React, { useState, useEffect } from "react";

const Users = ({ users }) => {
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/users`);
        console.log("response");
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        console.log(data);
        setUsersData(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);
  return (
    <>
      <h1>User List {usersData.length}</h1>;
    </>
  );
};

export default Users;
