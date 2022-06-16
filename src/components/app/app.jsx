import React from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import swapiService from '../../services/swapiService';

import './app.css';
import PeoplePage from '../people-page';
import ErrorButton from '../error-button';
import ErrorIndicator from '../error-indicator';
import Row from '../row-container';
import ErrorBoundary from '../error-boundary';

import { Record } from '../item-details';

import { PersonList, PlanetList, StarshipList } from '../sw-components/item-lists';
import { PersonDetails, PlanetDetails, StarshipDetails } from '../sw-components';


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
    const planet = this.state.showRandomPlanet ?
      <RandomPlanet onPlanetToggle={togglePlanet} /> :
      null;

    if (this.state.hasError) {
      return <ErrorIndicator />
    }

    return (
      <ErrorBoundary>

        <div className='stardb-app'>
          <Header />
          <Row
            leftItem={<PersonList />}
            rightItem={
              <PersonDetails itemId={1} getImage={this.swapi.getPersonImage} >
                <Record field='gender' label='Gender' />
                <Record field='eyeColor' label='Eye Color' />
              </PersonDetails>
            }
          />

          {/* <Row
            leftItem={ <PlanetList /> }
            rightItem={<PlanetDetails itemId={5} />
            }
          />

          <Row
            leftItem={ <StarshipList /> }
            rightItem={ <StarshipDetails itemId={5} /> }
          /> */}




        </div>
      </ErrorBoundary>
    );
  }
};







































{/* <ErrorBoundary>
<div className='stardb-app'>
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

  <Row
    leftItem={<span>leftItem</span>}
    rightItem={<ItemDetails itemId={5} />} />
</div>
</ErrorBoundary> */}