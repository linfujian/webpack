import React from 'react';

export default class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = { classFilter: 'all', categoryFilter: 'all' };
    this.handleClassFilterChange = this.handleClassFilterChange.bind(this);
    this.handleCategoryFilterChange = this.handleCategoryFilterChange.bind(this);
  }

  handleClassFilterChange(e) {
    const filterVal = e.target.value;
    //console.log(filterVal);
    this.props.onUserInput(
      filterVal,
      this.state.categoryFilter,
    );
    this.setState({ classFilter: filterVal });
  }

  handleCategoryFilterChange(e) {
    const filterVal = e.target.value;
    //console.log(filterVal);
    this.props.onUserInput(
      this.state.classFilter,
      filterVal,
    );
    this.setState({ categoryFilter: e.target.value });
  }

  render() {
    return (
      <div>
        <label>CLASS</label>&nbsp;&nbsp;&nbsp;&nbsp;
        <select
          className="form-control"
          defaultValue={this.state.classFilter}
          onChange={this.handleClassFilterChange}
        >
          <option value="all">all</option>
          <option value="DM">DM</option>
          <option value="DM?">DM?</option>
        </select>&nbsp;&nbsp;&nbsp;&nbsp;
        <label>Category</label>&nbsp;&nbsp;&nbsp;&nbsp;
        <select
          className="form-control"
          defaultValue={this.state.categoryFilter}
          onChange={this.handleCategoryFilterChange}
        >
          <option value="all">all</option>
          <option value="PATH">PATH</option>
          <option value="LiPATH">LiPATH</option>
        </select>
      </div>
    );
  }

}
