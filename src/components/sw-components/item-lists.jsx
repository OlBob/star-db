import { WithData, withSwapiService } from "../hoc-helpers";

import ItemList from "../item-list";

const withChildFunction = (fn) => (Wrapped) => {
    return (props) => {
        return <Wrapped {...props}>
            {fn}
        </Wrapped>
    }
}

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

const PersonList = withSwapiService(mapPersonMethodsToProps)(
    WithData(
        withChildFunction(PersonDataView)(
            ItemList)));

const PlanetList = withSwapiService(mapPlanetMethodsToProps)(
    WithData(
        withChildFunction(PlanetDataView)(
            ItemList)));

const StarshipList = withSwapiService(mapStarshipMethodsToProps)(
    WithData(
        withChildFunction(StarshipDataView)(
            ItemList)));

export {
    PersonList,
    PlanetList,
    StarshipList
}