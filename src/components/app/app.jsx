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

import ItemDetails, { Record } from '../item-details';
import ItemList from '../item-list';


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

    const {
      getPerson,
      getStarship,
      getAllPeople,
      getAllStarships,
      getAllPlanets
    } = this.swapi;

    const personDetails = (
      <ItemDetails
        itemId={5}
        getData={getPerson}
        getImage={this.swapi.getPersonImage} >

        <Record field='gender' label='Gender' />
        <Record field='eyeColor' label='Eye Color' />
      </ItemDetails>
    )
    const starshipDetails = (
      <ItemDetails
        itemId={11}
        getData={getStarship}
        getImage={this.swapi.getStarshipImage} >

        <Record field='crew' label='Crew' />
        <Record field='length' label='Length' />
        <Record field='model' label='Model' />
        <Record field='passengers' label='Passengers' />
      </ItemDetails>
    )

    const peopleList = (
      <ItemList
        onItemSelected={this.onItemSelected}
        getData={getAllPeople}
      >
        {({ name }) => {
          return <span>{name}</span>
        }}
      </ItemList>
    )

    const planetsList = (
      <ItemList
        onItemSelected={this.onItemSelected}
        getData={getAllPlanets}
      >
        {({ name }) => {
          return <span>{name}</span>
        }}
      </ItemList>
    )

    return (
      <ErrorBoundary>
        {/* <div className='stardb-app'>
          <Header />
          <Row
            leftItem={personDetails}
            rightItem={starshipDetails} />
        </div> */}

        <div className='stardb-app'>
          <Header />

          <Row
            leftItem={peopleList}
            rightItem={planetsList}
          />


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