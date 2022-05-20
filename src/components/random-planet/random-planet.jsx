import React, { Component } from 'react';

import './random-planet.css';
import SwapiService from '../../services/swapiService';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';

export default class RandomPlanet extends Component {
  swapiService = new SwapiService();

  state = {
    planet: {},
    loading: true,
    error: false
  }


  componentDidMount() {
    this.updatePlanet();
    this.updateInterval = setInterval(this.updatePlanet, 10000)
  }

  componentWillUnmount() {
    return this.props.onPlanetToggle ?
      clearInterval(this.updateInterval) :
      null;
  }

  onPlanetLoaded = planet => {
    return this.setState({ planet, loading: false })
  }

  onError = err => {
    this.setState({
      error: true,
      loading: false
    })
  }

  updatePlanet = () => {
    // debugger;
    const id = Math.floor(Math.random() * 20) + 2;
    // const id = 15000;

    this.swapiService
      .getPlanet(id)
      .then(this.onPlanetLoaded)
      .catch(this.onError)
  }

  render() {
    const { planet, loading, error } = this.state;

    const hasData = !(loading || error);

    const errorMessage = error ? <ErrorIndicator /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = hasData ? <ShowPlanet planet={planet} /> : null;

    // return 
    return (
      <div className="random-planet jumbotron rounded">
        {errorMessage}
        {spinner}
        {content}
      </div>
    );
  }
}

const ShowPlanet = ({ planet }) => {
  const { id = 12, name, population, rotationPeriod, diameter } = planet;

  return (
    <>
      <img className="planet-image" alt='planet'
        src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`} />
      <div>
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <span className="term">Population:</span>
            <span>{population}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Rotation Period:</span>
            <span>{rotationPeriod}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Diameter:</span>
            <span>{diameter}</span>
          </li>
        </ul>
      </div>
    </>
  )
}
