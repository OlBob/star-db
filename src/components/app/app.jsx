import React from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import swapiService from '../../services/swapiService';
import { SwapiServiceProvider } from '../swapi-service-context';

import './app.css';
import ErrorIndicator from '../error-indicator';
import Row from '../row-container';
import ErrorBoundary from '../error-boundary';

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
				<SwapiServiceProvider value={this.swapi}>
					<div className='stardb-app'>
						<Header />
						<PersonDetails itemId={1} />
						<PlanetDetails itemId={5} />
						<StarshipDetails itemId={5} />
						<PersonList />
						<PlanetList />
						<StarshipList />
					</div>
				</SwapiServiceProvider>
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