import React, { useState, useEffect } from "react";

function Users({ users }) {
  return (
    <div>
      <h1>{users.length} users!</h1>

      {users.map((data) => {
        return (
          <div className="main-layout" key={data.id}>
            <div className="user-card">Name: {data.username}</div>
          </div>
        );
      })}
    </div>
  );
}

export default Users;
