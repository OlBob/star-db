import React, { Component } from 'react';
import ErrorButton from '../error-button';
import ErrorBoundary from '../error-boundary';
import Spinner from '../spinner';

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

export default class ItemDetails extends Component {

  state = {
    item: null,
    loading: true,
    error: false,
    image: null
  }

  componentDidMount() {
    this.updateItem()
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.itemId !== prevProps.itemId ||
      this.props.getData !== prevProps.getData ||
      this.props.getImage !== prevProps.getImage) {
      this.updateItem()
    }
  }

  updateItem() {
    const { itemId, getImage, getData } = this.props;

    if (!itemId) return <Spinner />

    getData(itemId)
      .then((item) => {
        this.setState({
          item,
          loading: false,
          image: getImage(item)
        })
      })
      .catch(err => this.setState({ loading: false }))
  }

  render() {
    const { item, image } = this.state;
    const { children } = this.props;

    debugger

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
}