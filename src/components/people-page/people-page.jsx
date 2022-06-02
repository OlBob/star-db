import React from 'react';

import ItemList from '../item-list';
import ItemDetails from '../item-details';
import swapiService from '../../services/swapiService';
import Row from '../row-container';

// import './app.css';

export default class PeoplePage extends React.Component {

    swapi = new swapiService();

    state = {
        selectedItem: null
    }

    onItemSelected = (id) => this.setState({ selectedItem: id });

    render() {

        const itemlist = (
            <ItemList
                onItemSelected={this.onItemSelected}
                getData={this.swapi.getAllPeople}
                renderItemList={({ name, gender }) => {
                    return (
                        <>
                            <span>{name}</span><span>{` (${gender})`}</span>
                        </>
                    )
                }}
            />
        )

        return (
            <>
                <Row
                    leftItem={itemlist}
                    rightItem={<ItemDetails personId={this.state.selectedItem} />}
                />
            </>
        );
    }
};