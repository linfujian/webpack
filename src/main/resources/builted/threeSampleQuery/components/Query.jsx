import React from 'react';
import QueryType from './QueryType.jsx';
import axios from 'axios';
import ShowTable from './ShowTable.jsx';
import ReactPaginate from 'react-paginate';

export default class Query extends React.Component {
  constructor(props) {
    super(props);
    this.chooseType = this.chooseType.bind(this);
    this.handleQuery = this.handleQuery.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
    this.handleSelectHgmd = this.handleSelectHgmd.bind(this);
    this.handleSelectClinvar = this.handleSelectClinvar.bind(this);
    this.state = {chooseType: '', queryObj: undefined, filterPoints: [], rowCount: 0, offset: 0, hgmdSelect: 'All', clinvarSelect: 'All', child: ''};
  }

  chooseType(e) {
    const type = e.target.value;
    this.setState({chooseType: type});
  }

  handleQuery(queryObj) {
    this.setState({queryObj: queryObj, child: document.getElementById('child').value});
    switch (this.state.chooseType) {
      case 'RangeQuery':
        axios.get(
          'queryrange',
          {
            params: {
              'chr': queryObj.chr,
              'start': queryObj.start,
              'end': queryObj.end,
              'parentM': document.getElementById('parentM').value,
              'parentF': document.getElementById('parentF').value,
              'child': document.getElementById('child').value,
              'hgmdSelect': this.state.hgmdSelect,
              'clinvarSelect': this.state.clinvarSelect,
              'perpage': 20,
              'offset': this.state.offset,
            }
          }
        )
          .then(response => {
            if(response.status === 200) {
              this.setState({filterPoints: response.data.list, rowCount: response.data.count});
            }
          });
        break;
      case 'SymbolQuery':
        axios.get(
          'querysymbol',
          {
            params: {
              'symbol': queryObj.symbol,
              'parentM': document.getElementById('parentM').value,
              'parentF': document.getElementById('parentF').value,
              'child': document.getElementById('child').value,
              'hgmdSelect': this.state.hgmdSelect,
              'clinvarSelect': this.state.clinvarSelect,
              'perpage': 20,
              'offset': this.state.offset,
            }
          }
        )
        .then(response => {
          if(response.status === 200) {
            this.setState({filterPoints: response.data.list, rowCount: response.data.count });
          }
        });
        break;
      case 'NMQuery':
        axios.get(
          'querynm',
          {
            params: {
              'nm': queryObj.nm,
              'parentM': document.getElementById('parentM').value,
              'parentF': document.getElementById('parentF').value,
              'child': document.getElementById('child').value,
              'hgmdSelect': this.state.hgmdSelect,
              'clinvarSelect': this.state.clinvarSelect,
              'perpage': 20,
              'offset': this.state.offset,
            }
          }
        )
        .then(response => {
          if(response.status === 200) {
            this.setState({ filterPoints: response.data.list, rowCount: response.data.count });
          }
        });
        break;
      case 'QueryAllDiff':
        axios.get(
          'queryAllDiff',
          {
            params: {
              'parentM': document.getElementById('parentM').value,
              'parentF': document.getElementById('parentF').value,
              'child': document.getElementById('child').value,
              'hgmdSelect': this.state.hgmdSelect,
              'clinvarSelect': this.state.clinvarSelect,
              'perpage': 20,
              'offset': this.state.offset,
            }
          }
        )
        .then(response => {
          if(response.status === 200) {
            this.setState({ filterPoints: response.data.list, rowCount: response.data.count });
          }
        });
        break;
    }
  }

  handleSelectHgmd(selectedHgmd) {
    this.setState({hgmdSelect: selectedHgmd}, () => {
      this.handleQuery(this.state.queryObj);
    });
    //this.handleQuery(this.state.queryObj);
  }

  handleSelectClinvar(selectedClinvar) {
    this.setState({clinvarSelect: selectedClinvar}, () => {
      this.handleQuery(this.state.queryObj);
    });
  }

  handlePageClick(e) {
    let selected =  e.selected;
    let offset = Math.ceil(selected * 20);

    this.setState({offset: offset}, ()=> {
      this.handleQuery(this.state.queryObj);
    });
  }

  render() {
    return (
      <div>
        <p>
          <button className="btn btn-primary" type="button" data-toggle="collapse" data-target="#queryPanel" aria-expanded="false" aria-controls="queryPanel">
            Show/Hidden Query
          </button>
        </p>
        <div className="collapse" id="queryPanel">
          <div className="card card-block">
            <form className="form-horizontal">
              <div className="form-group">
                <label className="col-sm-1 control-label">Parent M</label>
                <div className="col-sm-2">
                  <input type="text" className="form-control" id="parentM" placeholder="pl input parent Male Id" />
                </div>
                <label className="col-sm-1 control-label">Parent F</label>
                <div className="col-sm-2">
                  <input type="text" className="form-control" id="parentF" placeholder="pl input parent Female Id" />
                </div>
                <label className="col-sm-1 control-label">Child</label>
                <div className="col-sm-2">
                  <input type="text" className="form-control" id="child" placeholder="pl input child Id" />
                </div>
              </div>
            </form>
            <div className="col-sm-offset-1 col-sm-12">
              <label className="radio-inline">
                <input type="radio" name="inlineRadioOptions" value="RangeQuery" onClick={this.chooseType} /> RangeQuery
              </label>
              <label className="radio-inline">
                <input type="radio" name="inlineRadioOptions" value="SymbolQuery" onClick={this.chooseType} /> SymbolQuery
              </label>
              <label className="radio-inline">
                <input type="radio" name="inlineRadioOptions" value="NMQuery" onClick={this.chooseType} /> NMQuery
              </label>
              <label className="radio-inline">
                <input type="radio" name="inlineRadioOptions" value="QueryAllDiff" onClick={this.chooseType} /> QueryAllDiff
              </label>
            </div>
          </div>
          <QueryType type={this.state.chooseType}  formValue={this.handleQuery} />
        </div>
        <ShowTable filterPoints={this.state.filterPoints} onUserSelectHgmd={this.handleSelectHgmd} onUserSelectClinvar={this.handleSelectClinvar} child={this.state.child} />
        <div className="col-sm-offset-7">
          <ReactPaginate
            previousLabel={"previous"}
            nextLabel={"next"}
            breakLabel={<a href="">...</a>}
            breakClassName={"break-me"}
            pageCount={Math.ceil(this.state.rowCount/20)}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={this.handlePageClick}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}
          />
        </div>
    </div>
    );
  }
}
