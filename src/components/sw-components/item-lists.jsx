import { WithData, withSwapiService, compose, withChildFunction } from "../hoc-helpers";

import ItemList from "../item-list";

const PersonDataView = ({ name, gender }) => <span>{name} {gender}</span>
const PlanetDataView = ({ name }) => <span>{name}</span>
const StarshipDataView = ({ name }) => <span>{name}</span>

const mapPersonMethodsToProps = (swapiService) => {
    return {
        getData: swapiService.getAllPeople
    }
}

const mapPlanetMethodsToProps = (swapiService) => {
    return {
        getData: swapiService.getAllPlanets
    }
}

const mapStarshipMethodsToProps = (swapiService) => {
    return {
        getData: swapiService.getAllStarships
    }
}

const PersonList = compose(
    withSwapiService(mapPersonMethodsToProps),
    WithData,
    withChildFunction(PersonDataView)
)(ItemList);

const PlanetList = compose(
    withSwapiService(mapPlanetMethodsToProps),
    WithData,
    withChildFunction(PlanetDataView)
)(ItemList);

const StarshipList = compose(
    withSwapiService(mapStarshipMethodsToProps),
    WithData,
    withChildFunction(StarshipDataView)
)(ItemList);

export {
    PersonList,
    PlanetList,
    StarshipList
}