import React from 'react';
import axios from 'axios';
import PointsTable from './PointsTable.jsx';
import SearchBar from './SearchBar.jsx';
import NumberCount from './NumberCount.jsx'

export default class Query extends React.Component {
  constructor(props) {
    super(props);
    this.state = { points: [], filteredPoints: [], DM: 0, DMdoubt: 0, Path: 0, LikelyPath: 0 };

    this.sendAxios = this.sendAxios.bind(this);
    this.handleUserInput = this.handleUserInput.bind(this);
  }

  sendAxios() {
    const queryVal = document.getElementById('SampleID').value;
    axios.get(
      `queryallpoints/${queryVal}`,
      { 'Content-Type': 'application/json' },
    )
      .then(response => {
        if (response.status === 200) {

          this.setState({ points: response.data.list, filteredPoints: response.data.list, DM: response.data.dm, DMdoubt: response.data.dmdoubt, Path: response.data.path, LikelyPath: response.data.likelyPath });
          if(this.state.points.length === 0) {
            alert('no corresponding sampleId exist in db');
          }
        }
      });
  }

  handleUserInput(classFilter, categoryFilter) {
    //console.log(`ClassFilter: ${classFilter}; CategoryFilter: ${categoryFilter}.`);
    if (classFilter === 'all' && categoryFilter === 'all') {
      this.setState({ filteredPoints: this.state.points });
    } else if (classFilter === 'all') {
      this.setState({
        filteredPoints: this.state.points.filter(point =>
          point.Category === categoryFilter
        ),
      });
    } else if (categoryFilter === 'all') {
      this.setState({
        filteredPoints: this.state.points.filter(point =>
          point.CLASS === classFilter
        ),
      });
    } else {
      this.setState({
        filteredPoints: this.state.points.filter(point =>
          point.CLASS === classFilter && point.Category === categoryFilter
        ),
      });
    }
  }

  render() {
    return (
      <form className="form-inline">
        <br></br>
        <div className="form-group">
          <label>SampleId</label>&nbsp;&nbsp;&nbsp;&nbsp;
          <input className="form-control" id="SampleID" type="text" placeholder="pl input SampleID..." />&nbsp;&nbsp;&nbsp;
          <button type="button" className="btn btn-default" onClick={this.sendAxios}>Query</button>
        </div>
        <br></br><br></br>
        <div className="form-group">
          <SearchBar onUserInput={this.handleUserInput} />
        </div><br />
        <div className="form-group">
        <NumberCount DM={this.state.DM} DMdoubt={this.state.DMdoubt} Path={this.state.Path} LikelyPath={this.state.LikelyPath} />
        </div>
        <div>
          <PointsTable filteredPoints={this.state.filteredPoints} />
        </div>
      </form>

    );
  }
}
