import React from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import swapiService from '../../services/swapiService';

import './app.css';
import PeoplePage from '../people-page';
import ErrorButton from '../error-button';
import ErrorIndicator from '../error-indicator';



export default class App extends React.Component {

  swapi = new swapiService();

  state = {
    showRandomPlanet: true,
    selectedItem: null,
    hasError: false
  }

  toggleRandomPlanet = () => {
    this.setState({ showRandomPlanet: !this.state.showRandomPlanet })
  }

  onItemSelected = (id) => this.setState({ selectedItem: id });

  componentDidCatch(error, errorInfo) {
    this.setState({ hasError: true })
  }

  render() {
    const { togglePlanet } = this.state;
    const displayRPlanet = this.state.showRandomPlanet ?
      <RandomPlanet onPlanetToggle={togglePlanet} /> :
      null;

    if (this.state.hasError) {
      return <ErrorIndicator />
    }

    return (
      <div>
        <Header />
        {displayRPlanet}
        <div className="row mb2 button-row">

          <button className='toggle-planet btn btn-warning btn-lg'
            onClick={this.toggleRandomPlanet}>
            Toggle random planet
          </button>

          <ErrorButton />
        </div>

        <PeoplePage />
      </div>
    );
  }
};