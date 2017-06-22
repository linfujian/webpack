import React from 'react';
import Query from './Query.jsx';
import ShowTable from './ShowTable.jsx'

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Query />
    );
  }
}
