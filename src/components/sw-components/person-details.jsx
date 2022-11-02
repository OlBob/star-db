import React from "react";
import ItemDetails, { Record } from "../item-details";
import { withSwapiService, withRouter } from "../hoc-helpers";

const PersonDetails = (props) => {
    // debugger
    const { router, ...otherProps } = props;
    const { id } = router.params;
    return <ItemDetails itemId={id ? id : null} {...otherProps}>
        <Record field='gender' label='Gender' />
        <Record field='eyeColor' label='Eye Color' />
    </ItemDetails>
}

const mapMethodsToProps = (swapiService) => {
    return {
        getData: swapiService.getPerson,
        getImage: swapiService.getPersonImage
    }
}

const withSwapi = withSwapiService(mapMethodsToProps)(PersonDetails);

export default withRouter(withSwapi);