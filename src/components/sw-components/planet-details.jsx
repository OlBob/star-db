import React from "react";
import ItemDetails, { Record } from "../item-details";
import { withSwapiService } from "../hoc-helpers";

const PlanetDetails = (props) => {
    return <ItemDetails {...props}>
        <Record field='diameter' label='Diameter' />
    </ItemDetails>
}

const mapMethodsToProps = (swapiService) => {
    return {
        getData: swapiService.getPlanet,
        getImage: swapiService.getPlanetImage
    }
}

export default withSwapiService(mapMethodsToProps)(PlanetDetails);