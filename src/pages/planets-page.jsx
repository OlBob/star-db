import React from 'react';
import { PlanetList, PlanetDetails } from '../components/sw-components';
import Row from '../components/row-container';

export default class PlanetPage extends React.Component {

    state = {
        selectedItem: null
    }

    onItemSelected = (selectedItem) => this.setState({ selectedItem });

    render() {
        const { selectedItem } = this.state;

        return (
            <>
                <Row
                    leftColumn={<PlanetList onItemSelected={this.onItemSelected} />}
                    rightColumn={<PlanetDetails itemId={selectedItem} />}
                />
            </>
        );
    }
};