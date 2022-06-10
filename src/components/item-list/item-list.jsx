import React, { Component } from 'react';

import './item-list.css';
import swapiService from '../../services/swapiService';
import { WithData } from '../hoc-helpers';

const ItemList = (props) => {

  const { data, children: renderLabel, onItemSelected } = props;
  const items = data.map((item) => {
    const { id } = item;
    const label = renderLabel(item);

    return <li
      key={id}
      className="list-group-item"
      onClick={() => onItemSelected(id)}>
      {label}
    </li>
  })

  return (
    <ul className="item-list list-group">
      {items}
    </ul>
  );
}



const { getAllPeople } = new swapiService()

export default WithData(ItemList, getAllPeople);