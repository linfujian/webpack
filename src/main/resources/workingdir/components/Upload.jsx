import React from 'react';
import $ from 'jquery';

export default class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {infor: ''};
    this.uploadvcf = this.uploadvcf.bind(this);
  }

  uploadvcf(e) {
    e.preventDefault();
    this.setState({infor: 'file is analyzing in back-end, please waiting.....'});
    const form = $('form')[0];
    const data = new FormData(form);

    $.ajax({
      type: 'POST',
      encType: 'multipart/form-data',
      processData: false,
      contentType: false,
      cache: false,
      url: 'uploadvcf',
      data: data,
      success: response => {
        this.setState({infor:response});
      }
    });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-offset-1 col-md-11">
            <h3>Upload File</h3>
            <div className="col-md-8">
              <form className="" method="POST">
                  <div className="form-group">
                    <label>File1</label>
                    <input type="file" className="form-control" name="files"/>
                  </div>
                  <div className="form-group">
                    <label>File2</label>
                    <input type="file" className="form-control" name="files"/>
                  </div>
                  <div className="form-group">
                    <label>File3</label>
                    <input type="file" className="form-control" name="files"/>
                  </div>
                <div className="col-md-offset-8 col-md-4">
                  <button className="btn btn-primary" onClick={this.uploadvcf}>Submit</button>
                </div>
              </form>
              <div>
                <h4></h4>
              </div>
            </div>
            <div className="col-md-8">
              <h4 id="info">{this.state.infor}</h4>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
