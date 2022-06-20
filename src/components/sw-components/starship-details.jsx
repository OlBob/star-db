import React from "react";
import ItemDetails, { Record } from "../item-details";
import { withSwapiService } from "../hoc-helpers";

const StarshipDetails = (props) => {
    return <ItemDetails {...props}>
        <Record field='crew' label='Crew' />
        <Record field='length' label='Length' />
        <Record field='model' label='Model' />
        <Record field='passengers' label='Passengers' />
    </ItemDetails>
}

const mapMethodsToProps = (swapiService) => {
    return {
        getData: swapiService.getStarship,
        getImage: swapiService.getStarshipImage
    }
}

export default withSwapiService(StarshipDetails, mapMethodsToProps);