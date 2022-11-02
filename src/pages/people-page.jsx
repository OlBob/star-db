import React from 'react';
import { PersonList, PersonDetails } from '../components/sw-components';
import Row from '../components/row-container';

import { withRouter } from '../components/hoc-helpers';

const PeoplePage = (props) => {

  // debugger
  const { navigate } = props.router;

  return (
    <Row
      leftColumn={<PersonList onItemSelected={
        (itemId) => navigate(itemId)
      } />}
      rightColumn={<PersonDetails />}
    />
  );

};

export default withRouter(PeoplePage);