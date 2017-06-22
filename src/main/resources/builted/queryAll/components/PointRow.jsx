import React from 'react';

export default class PointRow  extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <tr>
          <td>{this.props.point.CHROM}</td>
          <td>{this.props.point.POS}</td>
          <td>{this.props.point.REF}</td>
          <td>{this.props.point.ALT}</td>
          <td>{this.props.point.CLASS}</td>
          <td>{this.props.point.Category}</td>
        </tr>
    );
  }
}
