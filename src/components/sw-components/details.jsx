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
            {fn.props.children ? fn.props.children : fn}
        </Wrapped>
    }
}

const DetailsWithImage = (Wrapped, fn) => {
    return (props) => <Wrapped {...props} getImage={fn} />
}

const PersonData = <>
    <Record field='gender' label='Gender' />
    <Record field='eyeColor' label='Eye Color' />
</>;

const PersonDetails = DetailsWithImage(
    DetailsWithData(
        DetailsWithChildren(
            ItemDetails,
            PersonData
        ), getPerson
    ), getPersonImage
)

const PlanetData = <Record field='diameter' label='Diameter' />

const PlanetDetails = DetailsWithImage(
    DetailsWithData(
        DetailsWithChildren(
            ItemDetails,
            PlanetData
        ), getPlanet
    ), getPlanetImage
)

const StarshipData = <>
    <Record field='crew' label='Crew' />
    <Record field='length' label='Length' />
    <Record field='model' label='Model' />
    <Record field='passengers' label='Passengers' />
</>

const StarshipDetails = DetailsWithImage(
    DetailsWithData(
        DetailsWithChildren(
            ItemDetails,
            StarshipData
        ), getStarship
    ), getStarshipImage
)

export {
    PersonDetails,
    PlanetDetails,
    StarshipDetails
}