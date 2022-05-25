import React, { Component } from 'react';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';

import './item-list.css';

export default class ItemList extends Component {

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
    const { getData } = this.props;

    getData()
      .then(this.onItemsLoaded)
      .catch(err => this.setState({ error: true }))
  }

  renderItems(arr) {
    return arr.map((item) => {
      const { id } = item;
      const label = this.props.renderItemList(item);

      return <li
        key={id}
        className="list-group-item"
        onClick={() => this.props.onItemSelected(id)}>
        {label}
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