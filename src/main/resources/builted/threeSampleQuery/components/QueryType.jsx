import React from 'react';

export default class QueryType extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      chr: '',
      start: '',
      end: '',
      symbol: '',
      nm: '',
    };

    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit(e) {
    e.preventDefault();
    switch (this.props.type) {
      case 'RangeQuery':
        this.props.formValue(
          {
            chr: this.state.chr,
            start: this.state.start,
            end: this.state.end,
          }
        );
        break;
      case 'SymbolQuery':
        this.props.formValue(
          { symbol: this.state.symbol }
        );
        break;
      case 'NMQuery':
      this.props.formValue(
        { nm: this.state.nm }
      );
      break;
      case 'QueryAllDiff':
        this.props.formValue(
          {QueryAllDiff: 'all'}
        );
    }
  }

  render() {
    switch (this.props.type) {
      default:
        return (
          <form className="form-horizontal">
            <div className="form-group">
              <label className="col-sm-1 control-label">Chr</label>
              <div className="col-sm-5">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Chro"
                  value={this.state.chr}
                  onChange={e => this.setState({ chr: e.target.value })}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="col-sm-1 control-label">Start</label>
              <div className="col-sm-5">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Start point"
                  value={this.state.start}
                  onChange={e => this.setState({ start: e.target.value })}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="col-sm-1 control-label">End</label>
              <div className="col-sm-5">
                <input
                  type="text"
                  className="form-control"
                  placeholder="End point"
                  value={this.state.end}
                  onChange={e => this.setState({ end: e.target.value })}
                />
              </div>
            </div>
            <div className="col-sm-offset-1 col-sm-5">
              <button className="btn btn-default" onClick={this.onSubmit}>Query</button>
            </div>
          </form>
        );
        break;
      case 'SymbolQuery':
        return(
          <form className="form-horizontal">
            <div className="form-group">
              <label className="col-sm-1 control-label">Symbol</label>
              <div className="col-sm-5">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Symbol"
                  value={this.state.symbol}
                  onChange={e => this.setState({ symbol: e.target.value })}
                />
              </div>
            </div>
            <div className="col-sm-offset-1 col-sm-5">
              <button className="btn btn-default" onClick={this.onSubmit}>Query</button>
            </div>
          </form>
        );
        break;
      case 'NMQuery':
        return(
          <form className="form-horizontal">
            <div className="form-group">
              <label className="col-sm-1 control-label">NM</label>
              <div className="col-sm-5">
                <input
                  type="text"
                  className="form-control"
                  placeholder="NM"
                  value={this.state.nm}
                  onChange={e => this.setState({ nm: e.target.value })}
                />
              </div>
            </div>
            <div className="col-sm-offset-1 col-sm-5">
              <button className="btn btn-default" onClick={this.onSubmit}>Query</button>
            </div>
          </form>
        );
        break;
      case 'QueryAllDiff':
      return(
        <form className="form-horizontal">
          <div className="form-group">
            <label className="col-sm-4 col-sm-offset-1 control-label">
              Before Query, Make Sure Trio Diff Analyze has been done
            </label>
          </div>
          <div className="col-sm-offset-2 col-sm-5">
            <button className="btn btn-default" onClick={this.onSubmit}>Query</button>
          </div>
        </form>
      );
    }
  }
}
