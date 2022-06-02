import React, { Component } from 'react';
import swapiService from '../../services/swapiService';
import ErrorIndicator from '../error-indicator';
import Spinner from '../spinner';
import ErrorButton from '../error-button';
import ErrorBoundary from '../error-boundary';

import './item-details.css';

export default class ItemDetails extends Component {

  swapi = new swapiService();

  state = {
    item: null,
    loading: true,
    error: false,
    image: null
  }

  componentDidMount() {
    this.updateItem();
  }

  componentDidUpdate(prevProps) {
    if (this.props.itemId !== prevProps.itemId) {
      this.updateItem()
    }
  }

  updateItem = () => {
    const { itemId, getData, getImage } = this.props;
    if (!itemId) {
      return
    }
    getData(itemId)
      .then((item) => {
        this.setState({
          item,
          loading: false,
          image: getImage(item)
        })
      })
      .catch(this.onError)
  }

  onError = err => {
    this.setState({
      error: true,
      loading: false,
    })
  }

  render() {

    if (!this.state.item) {
      return <span>Select an item from a list</span>
    }

    const { loading, error, item, image } = this.state;

    const hasData = !(loading || error);

    const errorMessage = error ? <ErrorIndicator /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = hasData ? <ShowItem item={item} image={image} /> : null;


    return (
      <div className="person-details card">
        {errorMessage}
        {spinner}
        {content}

      </div>
    )
  }
}

const ShowItem = ({ item, image }) => {
  debugger

  const { id, name, gender, birthYear, eyeColor } = item;

  return (
    <ErrorBoundary>
      <img className="person-image"
        alt="person_image"
        src={image} />

      <div className="card-body">
        <h4>{name} {id}</h4>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <span className="term">Gender</span>
            <span>{gender}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Birth Year</span>
            <span>{birthYear}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Eye Color</span>
            <span>{eyeColor}</span>
          </li>
        </ul>
        <ErrorButton />
      </div>
    </ErrorBoundary>
  )
}
