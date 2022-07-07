import React from "react";
import ItemDetails, { Record } from "../item-details";
import { withSwapiService, withRouter } from "../hoc-helpers";

const StarshipDetails = (props) => {
    const { router, ...other } = props;
    const { id } = router.params;
    return <ItemDetails {...other} itemId={id}>
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

const withSwapi = withSwapiService(mapMethodsToProps)(StarshipDetails);

export default withRouter(withSwapi)