import React from 'react';
import PropTypes from 'prop-types';

import './item-list.css';

const ItemList = ({ data, children: renderLabel, onItemSelected }) => {

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

ItemList.defaultProps = {
  onItemSelected: () => { }
}

ItemList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  children: PropTypes.func.isRequired,
  onItemSelected: PropTypes.func.isRequired
}

export default ItemList;