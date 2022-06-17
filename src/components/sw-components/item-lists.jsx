import { WithData } from "../hoc-helpers";
import swapiService from "../../services/swapiService";

import ItemList from "../item-list";

const swapi = new swapiService();

const { getAllPeople, getAllPlanets, getAllStarships } = swapi;

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

const PersonList = WithData(DataWithChidren(ItemList, PersonDataView), getAllPeople);

const PlanetList = WithData(DataWithChidren(ItemList, PlanetDataView), getAllPlanets);

const StarshipList = WithData(DataWithChidren(ItemList, StarshipDataView), getAllStarships);

export {
    PersonList,
    PlanetList,
    StarshipList
}