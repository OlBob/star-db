import React from "react";
import ItemDetails from "../item-details";
import { Record } from "../item-details";
import swapiService from "../../services/swapiService";
import { DetailsWithData } from "../hoc-helpers";

const swapi = new swapiService();
const { getPerson, getPlanet, getStarship, getPersonImage, getPlanetImage, getStarshipImage } = swapi;

const DetailsWithChildren = (Wrapped, fn) => {
    return (props) => {
        return <Wrapped {...props}>
            {fn}
        </Wrapped>
    }
}


const PersonDetails = DetailsWithData(ItemDetails, getPerson)

const PlanetDetails = ({ itemId }) => (
    <ItemDetails
        itemId={itemId}
        getData={getPlanet}
        getImage={getPlanetImage} >

        <Record field='diameter' label='Diameter' />
    </ItemDetails>
)

const StarshipDetails = ({ itemId }) => (
    <ItemDetails
        itemId={itemId}
        getData={getStarship}
        getImage={getStarshipImage} >

        <Record field='crew' label='Crew' />
        <Record field='length' label='Length' />
        <Record field='model' label='Model' />
        <Record field='passengers' label='Passengers' />
    </ItemDetails>
)

export {
    PersonDetails,
    PlanetDetails,
    StarshipDetails
}