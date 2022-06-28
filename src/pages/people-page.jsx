import React from 'react';
import { PersonList, PersonDetails } from '../components/sw-components';
import Row from '../components/row-container';

export default class PeoplePage extends React.Component {

    state = {
        selectedItem: null
    }

    onItemSelected = (selectedItem) => this.setState({ selectedItem });

    render() {
        const { selectedItem } = this.state;

        return (
            <>
                <Row
                    leftColumn={<PersonList onItemSelected={this.onItemSelected} />}
                    rightColumn={<PersonDetails itemId={selectedItem} />}
                />
            </>
        );
    }
};