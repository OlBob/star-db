import React from "react";
import ItemDetails, { Record } from "../item-details";
import { withSwapiService } from "../hoc-helpers";

const PlanetDetails = ({ itemId, swapiService }) => {
    const { getPlanet, getPlanetImage } = swapiService;

    return <ItemDetails
        itemId={itemId}
        getData={getPlanet}
        getImage={getPlanetImage}>
        <Record field='diameter' label='Diameter' />
    </ItemDetails>
}

export default withSwapiService(PlanetDetails);