import React from 'react';
import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorBoundary from '../error-boundary';
import swapiService from '../../services/swapiService';
import dummySwapiService from '../../services/dummy-swapi-service'
import { SwapiServiceProvider } from '../swapi-service-context';
import { PeoplePage, PlanetPage, StarshipPage } from '../../pages';
import './app.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

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
								<Route path='/people' element={<PeoplePage />} />
								<Route path='/planets' element={<PlanetPage />} />
								<Route path='/starships' element={<StarshipPage />} />
							</Routes>
						</div>
					</Router>
				</SwapiServiceProvider>
			</ErrorBoundary>
		);
	}
};