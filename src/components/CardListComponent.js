import React from 'react';

const CardListComponent = ({ data }) => {
  return (
    <div className="card-list">
      {data.map((item, index) => (
        <div className="card" key={index}>
          <h3>{item.name}</h3>
          <p>Age: {item.age}</p>
          <p>Occupation: {item.occupation}</p>
        </div>
      ))}
    </div>
  );
};

export default CardListComponent;
