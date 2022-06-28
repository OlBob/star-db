import React from 'react';
import { StarshipList, StarshipDetails } from '../components/sw-components';
import Row from '../components/row-container';

export default class StarshipPage extends React.Component {

    state = {
        selectedItem: null
    }

    onItemSelected = (selectedItem) => this.setState({ selectedItem });

    render() {
        const { selectedItem } = this.state;

        return (
            <>
                <Row
                    leftColumn={<StarshipList onItemSelected={this.onItemSelected} />}
                    rightColumn={<StarshipDetails itemId={selectedItem} />}
                />
            </>
        );
    }
};