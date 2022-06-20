import { WithData, withSwapiService } from "../hoc-helpers";

import ItemList from "../item-list";

const DataWithChidren = (Wrapped, fn) => {
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

const PersonList = withSwapiService(WithData(DataWithChidren(ItemList, PersonDataView)), mapPersonMethodsToProps);

const PlanetList = withSwapiService(WithData(DataWithChidren(ItemList, PlanetDataView)), mapPlanetMethodsToProps);

const StarshipList = withSwapiService(WithData(DataWithChidren(ItemList, StarshipDataView)), mapStarshipMethodsToProps);

export {
    PersonList,
    PlanetList,
    StarshipList
}