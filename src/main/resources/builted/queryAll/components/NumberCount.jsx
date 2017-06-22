import React from 'react';

export default class NumberCount extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div>
      <p>DM: {this.props.DM}</p>
      <p>DM?: {this.props.DMdoubt}</p>
      <p>Path: {this.props.Path}</p>
      <p>Likely Path: {this.props.LikelyPath}</p>
      </div>
    );
  }
}
