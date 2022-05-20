import React, { Component } from 'react';
import swapiService from '../../services/swapiService';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';

import './item-list.css';

export default class ItemList extends Component {

  swapi = new swapiService()

  state = {
    items: [],
    error: false,
    loading: true
  }

  componentDidMount() {
    this.getItemList();
  }

  onItemsLoaded = (items) => {
    return this.setState({ items, loading: false })
  }

  getItemList = () => {
    this.swapi
      .getAllPeople()
      .then(this.onItemsLoaded)
      .catch(err => this.setState({ error: true }))
  }

  renderItems(arr) {
    return arr.map(({ name, id }) => {
      return <li
        key={id}
        className="list-group-item"
        onClick={() => this.props.onItemSelected(id)}>
        {name}
      </li>
    })
  }

  render() {
    const { items, error, loading } = this.state;

    if (error) return <ErrorIndicator />

    const content = loading ? <Spinner /> : this.renderItems(items)

    return (
      <ul className="item-list list-group">
        {content}
      </ul>
    );
  }
}
