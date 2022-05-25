export default class swapiService {
    _apiBase = 'https://swapi.dev/api/';

    async getResource(url) {
        const res = await fetch(`${this._apiBase}${url}`)

        if (!res.ok) {
            throw new Error(`Could not fetch to ${url}, received ${res.status}`);
        }

        const body = await res.json();
        return body;
    }

    getAllPeople = async () => {
        const res = await this.getResource(`people/`);
        return res.results.map(this._transformPerson);
    }

    getPerson = async (id = 1) => {
        const person = await this.getResource(`people/${id}/`)
        return this._transformPerson(person)
    }

    getAllPlanets = async () => {
        const res = await this.getResource(`planets/`);
        return res.results.map(this._transformPlanet);
    }

    getPlanet = async (id = 0) => {
        const planet = await this.getResource(`planets/${id}/`);
        return this._transformPlanet(planet)
    }

    getAllStarships = async () => {
        const res = await this.getResource(`starships/`);
        return res.results.map(this._transformStarship);
    }

    getStarship = async (id = 0) => {
        const starship = await this.getResource(`starships/${id}/`);
        return this._transformStarship(starship)
    }

    _extractId = (item) => {
        const idRegExp = /\/([0-9]*)\/$/;
        return item.url.match(idRegExp)[1];
    }

    _transformPlanet = (planet) => {
        return {
            id: this._extractId(planet),
            name: planet.name,
            population: planet.population,
            rotationPeriod: planet.rotation_period,
            diameter: planet.diameter,
        }
    }

    _transformStarship = (srarship) => {
        return {
            id: this._extractId(srarship),
            name: srarship.name,
            model: srarship.model,
            manufacturer: srarship.manufacturer,
            costInCredits: srarship.costInCredits,
            length: srarship.length,
            crew: srarship.crew,
            passengers: srarship.passengers,
            cargoCapacity: srarship.cargoCapacity,
        }
    }

    _transformPerson = (person) => {
        return {
            id: this._extractId(person),
            name: person.name,
            gender: person.gender,
            birthYear: person.birthYear,
            eyeColor: person.eyeColor,
        }
    }
}