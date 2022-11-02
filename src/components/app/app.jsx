import React from 'react';
import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorBoundary from '../error-boundary';
import swapiService from '../../services/swapiService';
import dummySwapiService from '../../services/dummy-swapi-service'
import { SwapiServiceProvider } from '../swapi-service-context';
import { PeoplePage, PlanetPage, StarshipPage } from '../../pages';
import './app.css';

import StarshipDetails from '../sw-components/starship-details';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

export default class App extends React.Component {

  state = {
    swapi: new swapiService()
  }

  onServiceChange = () => {
    this.setState(({ swapi }) => {
      const Service = swapi instanceof swapiService ?
        dummySwapiService : swapiService;

      return {
        swapi: new Service()
      }
    })
  }

  render() {
    return (
      <ErrorBoundary>
        <SwapiServiceProvider value={this.state.swapi}>
          <Router>
            <div className='stardb-app'>
              <Header changeService={this.onServiceChange} />
              <RandomPlanet updateInterval={15000} />

              <Routes>
                <Route
                  path='/'
                  element={
                    <h2>Welcome to StarDB</h2>
                  }
                />
                {/* <Route path='/people' element={<h2>People</h2>} /> */}
                <Route path='/people' element={<PeoplePage />} >
                  <Route path=':id' element={null} exact />
                </Route>
                <Route path='/planets' element={<PlanetPage />} />
                <Route path='/starships' element={<StarshipPage />} exact />
                <Route path='/starships/:id' element={<StarshipDetails />} />
              </Routes>
            </div>
          </Router>
        </SwapiServiceProvider>
      </ErrorBoundary>
    );
  }
};