import React from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ItemList from '../item-list';
import PersonDetails from '../person-details';
import swapiService from '../../services/swapiService';

import './app.css';

export default class App extends React.Component {

  swapi = new swapiService();

  state = {
    showRandomPlanet: true,
    selectedItem: null
  }

  toggleRandomPlanet = () => {
    this.setState({ showRandomPlanet: !this.state.showRandomPlanet })
  }

  onItemSelected = (id) => this.setState({ selectedItem: id });


  render() {
    const { togglePlanet } = this.state;
    const displayRPlanet = this.state.showRandomPlanet ?
      <RandomPlanet onPlanetToggle={togglePlanet} /> :
      null;

    return (
      <div>
        <Header />
        {displayRPlanet}
        <button className='btn btn-warning'
          onClick={this.toggleRandomPlanet}>
          Toggle random planet
        </button>

        <div className="row mb2">
          <div className="col-md-6">
            <ItemList
              onItemSelected={this.onItemSelected}
              getData={this.swapi.getAllPeople}
              renderItemList={({ name, gender }) => {
                return (
                  <>
                    <span>{name}</span><br />
                    <span>{gender}</span>
                  </>
                )
              }}
            />
          </div>
          <div className="col-md-6">
            <PersonDetails personId={this.state.selectedItem} />
          </div>
        </div>
      </div>
    );
  }
};