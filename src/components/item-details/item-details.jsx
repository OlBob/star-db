import React from 'react';
import ErrorButton from '../error-button';
import ErrorBoundary from '../error-boundary';

import './item-details.css';

const Record = ({ item, field, label }) => {
  return (
    <li className="list-group-item">
      <strong><span className="term">{label}:</span></strong>
      <span>{item[field]}</span>
    </li>
  )
}

export { Record }

const ItemDetails = ({ data: { item, image }, children }) => {

  if (!item) {
    return <span>Select an item from a list</span>
  }

  const { name, id } = item;

  return (
    <div className="person-details card">
      <ErrorBoundary>
        <img className="person-image"
          alt="person_image"
          src={image} />

        <div className="card-body">
          <h4>{name} {id}</h4>
          <ul className="list-group list-group-flush">
            {
              React.Children.map(children, (child) => {
                return React.cloneElement(child, { item })
              })
            }
          </ul>
          <ErrorButton />
        </div>
      </ErrorBoundary>
    </div>
  )
}

export default ItemDetails;