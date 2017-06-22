import React from 'react';
import PointRow from './PointRow.jsx';

export default class PointsTable extends React.Component {
  constructor(props) {
    super(props);
    this.renderPoint = this.renderPoint.bind(this);
  }

  renderPoint(point,index) {
      return <PointRow key={index} point={point} />;
  }

  render() {
    return (
      <table className="table">
          <thead>
            <tr>
              <td>CHROM</td>
              <td>POS</td>
              <td>REF</td>
              <td>ALT</td>
              <td>HGMD CLASS</td>
              <td>VarAnno Category</td>
            </tr>
          </thead>
          <tbody>
            {this.props.filteredPoints.map((point,index) => this.renderPoint(point,index))}
          </tbody>
      </table>
    );
  }
}
