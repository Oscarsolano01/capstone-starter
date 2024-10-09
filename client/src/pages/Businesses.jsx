import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
function Businesses({ businesses }) {
  return (
    <div className="business-list-container">
      <h1> Business List {businesses.length}</h1>
      <div className="business-list">
        {businesses?.map((business) => {
          return (
            <div className="business-card" key={business.id}>
              <link to={`/business/${business.id}`}>
                <h2 className="business-name">Business: {business.busname} </h2>
                <h2>About Us: {business.description} </h2>
              </link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Businesses;
