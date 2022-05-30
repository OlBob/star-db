import React, { Component } from 'react';
import swapiService from '../../services/swapiService';
import ErrorIndicator from '../error-indicator';
import Spinner from '../spinner';
import ErrorButton from '../error-button';

import './person-details.css';


class ErrorBoundary extends Component {

  state = {
    hasError: false
  }

  componentDidCatch() {
    this.setState({ hasError: true })
  }

  render() {
    if (this.state.hasError) return <ErrorIndicator />
    return this.props.children
  }
}

export default class PersonDetails extends Component {

  swapi = new swapiService();

  state = {
    person: null,
    loading: true,
    error: false
  }

  componentDidMount() {
    this.updatePerson();
  }

  componentDidUpdate(prevProps) {
    if (this.props.personId !== prevProps.personId) {
      this.updatePerson()
    }
  }

  updatePerson = () => {
    const { personId } = this.props;
    if (!personId) {
      return
    }
    this.swapi
      .getPerson(personId)
      .then((person) => {
        this.setState({ person, loading: false })
      })
      .catch(this.onError)
  }

  onError = err => {
    this.setState({
      error: true,
      loading: false,
    })
  }

  render() {

    if (!this.state.person) {
      return <span>Select a person from a list</span>
    }

    const { loading, error, person } = this.state;

    const hasData = !(loading || error);

    const errorMessage = error ? <ErrorIndicator /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = hasData ? <ShowPerson person={person} /> : null;


    return (
      <div className="person-details card">
        {errorMessage}
        {spinner}
        {content}

      </div>
    )
  }
}

const ShowPerson = ({ person }) => {

  const { id, name, gender, birthYear, eyeColor } = person;

  return (
    <ErrorBoundary>
      <img className="person-image"
        alt="person_image"
        src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`} />

      <div className="card-body">
        <h4>{name} {id}</h4>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <span className="term">Gender</span>
            <span>{gender}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Birth Year</span>
            <span>{birthYear}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Eye Color</span>
            <span>{eyeColor}</span>
          </li>
        </ul>
        <ErrorButton />
      </div>
    </ErrorBoundary>
  )
}
