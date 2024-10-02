import React, { useEffect, useState } from "react";

function Businesses({ businesses }) {
  return (
    <div className="business-list-container">
      <h1> Business List {businesses.length}</h1>
      <div className="business-list">
        {businesses?.map((business) => {
          return (
            <div className="business-card" key={business.id}>
              <h2 className="business-name">
                Business: {business.businessname}{" "}
              </h2>
              <h2>About Us: {business.description} </h2>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Businesses;
