import 'rc-dialog/assets/index.css';
import React from 'react';
import PointRow from './PointRow.jsx';
import Dialog from 'rc-dialog';
import axios from 'axios';
import $ from 'jquery';

export default class ShowTable extends React.Component {
  constructor(props) {
    super(props);
    this.handleHgmdChange = this.handleHgmdChange.bind(this);
    this.handleClinvarChange = this.handleClinvarChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.renderPoint = this.renderPoint.bind(this);
    this.handleSelectDialog = this.handleSelectDialog.bind(this);
    this.onClose = this.onClose.bind(this);
    this.state = {hgmdFilter: 'All', clinvarFilter: 'All', type: '', pointInfor: {}, openDialog: false}
  }

  handleHgmdChange(e) {
    const hgmdSelect = e.target.value;
    this.setState({hgmdFilter: hgmdSelect});
    this.props.onUserSelectHgmd(hgmdSelect);
  }

  handleClinvarChange(e) {
    const clinvarSelect = e.target.value;
    this.setState({clinvarFilter: clinvarSelect});
    this.props.onUserSelectClinvar(clinvarSelect);

  }

  submitForm(e) {
    e.preventDefault();
    // axios.post('batchupdate/'+ this.props.child,
    // {
    //   data: $('form').serialize()
    // },
    // {
    //   headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    // })
    //   .then(response => {
    //     if(response.status ===200) {
    //       alert(response.data);
    //     }
    //   });
    $.ajax({
      type: 'POST',
      url: 'batchupdate/'+ this.props.child,
      data: $('form').serialize(),
      success: function(response) {
        alert(response);
      }
    });
  }

  handleSelectDialog(type, params) {
    axios.get(
      'react' + type + '/' + params.chr + '/' + params.pos + '/' + params.ref + '/' + params.alt
    )
      .then(response => {
        if(response.status === 200) {
          this.setState({openDialog: true, type: type, pointInfor: response.data});
        }
      }
    );

  }

  onClose() {
    this.setState({openDialog: false});
  }

  renderPoint(point, index) {
    return <PointRow
      key={`${point.CHROM}_${point.POS}_${point.REF}_${point.ALT}`}
      point={point}
      index={index}
      selectDialog={this.handleSelectDialog}
    />;

  }

  render() {
    const tdStyle = {
      wordWrap:'break-word',wordBreak:'break-all'
    };
    return (
     <div>
     <form>
      <table className="table table-condensed">
        <thead>
          <tr>
            <th>#</th>
            <th style={{textAlign:'center'}} colSpan="11">Site Information</th>
            <th style={{textAlign:'center'}} colSpan="5">Frequency</th>
            <th style={{textAlign:'center'}} colSpan="2">Clinical</th>
            <th style={{textAlign:'center'}} >HGMD</th>
            <th style={{textAlign:'center'}} colSpan="4">VarAnno</th>
            <th style={{textAlign:'center'}}>Report?</th>
          </tr>
          <tr>
            <th>N.O</th>
            <th>CHROM</th>
            <th>POS</th>
            <th>REF</th>
            <th>ChildALT</th>
            <th>ChildAF</th>
            <th>FatherALT</th>
            <th>FatherAF</th>
            <th>MotherALT</th>
            <th>MotherAF</th>
            <th>RS</th>
            <th>Symbol</th>
            <th>gno_genome</th>
            <th>gno_exomes</th>
            <th>1kg</th>
            <th>esp</th>
            <th>exac</th>
            <th>SIFT/Polyphen</th>
            <th>clinvar</th>
            <th>
              <select defaultValue={this.state.hgmdFilter} onChange={this.handleHgmdChange}>
                <option value="All">All</option>
                <option value="DM">DM</option>
                <option value="DM?">DM?</option>
                <option value="DP">DP</option>
                <option value="FP">FP</option>
                <option value="DFP">DFP</option>
                <option value="R">R</option>
              </select>
            </th>
            <th>
              <select defaultValue={this.state.clinvarFilter} onChange={this.handleClinvarChange}>
                <option value="All" >All</option>
                <option value="PATH" >PATH</option>
                <option value="LiPATH" >LiPATH</option>
                <option value="VUS" >VUS</option>
                <option value="BEN" >BEN</option>
                <option value="LiBEN" >LiBEN</option>
                <option value="Other" >Other</option>
              </select>
            </th>
            <th>Comments</th>
            <th>VarAnnoDetail</th>
            <th>History</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {this.props.filterPoints.map((point, index) => this.renderPoint(point,index))}
        </tbody>
      </table>
      <button className="col-sm-offset-10 btn btn-danger" onClick={this.submitForm}>Save The Update</button>
     </form>
     <Dialog
       visible={this.state.openDialog}
       wrapClassName="center"
       animation="slide-fade"
       maskAnimation="fade"
       onClose={this.onClose}
       style={{ width: 800 }}
       title={<div>PointDialog</div>}
      >
        <div style={{display: (this.state.type==='gno_gen'? 'block':'none')}}>
          <table className="table table-striped">
           <tbody>
            <tr>
              <td>CHROM</td>
              <td>{this.state.pointInfor.CHROM}</td>
            </tr>
            <tr>
              <td>START</td>
              <td>{this.state.pointInfor.START}</td>
            </tr>
            <tr>
              <td>END</td>
              <td>{this.state.pointInfor.END}</td>
            </tr>
            <tr>
              <td>REF</td>
              <td>{this.state.pointInfor.REF}</td>
            </tr>
            <tr>
              <td>ALT</td>
              <td>{this.state.pointInfor.ALT}</td>
            </tr>
            <tr>
              <td>AF_GNOMAD</td>
              <td>{this.state.pointInfor.AF_GNOMAD}</td>
            </tr>
            <tr>
              <td>AF_AFR</td>
              <td>{this.state.pointInfor.AF_AFR}</td>
            </tr>
            <tr>
              <td>AF_AMR</td>
              <td>{this.state.pointInfor.AF_AMR}</td>
            </tr>
            <tr>
              <td>AF_ASJ</td>
              <td>{this.state.pointInfor.AF_ASJ}</td>
            </tr>
            <tr>
              <td>AF_EAS</td>
              <td>{this.state.pointInfor.AF_EAS}</td>
            </tr>
            <tr>
              <td>AF_FIN</td>
              <td>{this.state.pointInfor.AF_FIN}</td>
            </tr>
            <tr>
              <td>AF_NFE</td>
              <td>{this.state.pointInfor.AF_NFE}</td>
            </tr>
            <tr>
              <td>AF_OTH</td>
              <td>{this.state.pointInfor.AF_OTH}</td>
            </tr>
           </tbody>
          </table>
        </div>

        <div style={{display: (this.state.type==='gno_exo'? 'block':'none')}}>
          <table className="table table-striped">
           <tbody>
            <tr>
              <td>CHROM</td>
              <td>{this.state.pointInfor.CHROM}</td>
            </tr>
            <tr>
              <td>START</td>
              <td>{this.state.pointInfor.START}</td>
            </tr>
            <tr>
              <td>END</td>
              <td>{this.state.pointInfor.END}</td>
            </tr>
            <tr>
              <td>REF</td>
              <td>{this.state.pointInfor.REF}</td>
            </tr>
            <tr>
              <td>ALT</td>
              <td>{this.state.pointInfor.ALT}</td>
            </tr>
            <tr>
              <td>AF_GNOMAD</td>
              <td>{this.state.pointInfor.AF_GNOMAD}</td>
            </tr>
            <tr>
              <td>AF_AFR</td>
              <td>{this.state.pointInfor.AF_AFR}</td>
            </tr>
            <tr>
              <td>AF_AMR</td>
              <td>{this.state.pointInfor.AF_AMR}</td>
            </tr>
            <tr>
              <td>AF_ASJ</td>
              <td>{this.state.pointInfor.AF_ASJ}</td>
            </tr>
            <tr>
              <td>AF_EAS</td>
              <td>{this.state.pointInfor.AF_EAS}</td>
            </tr>
            <tr>
              <td>AF_FIN</td>
              <td>{this.state.pointInfor.AF_FIN}</td>
            </tr>
            <tr>
              <td>AF_NFE</td>
              <td>{this.state.pointInfor.AF_NFE}</td>
            </tr>
            <tr>
              <td>AF_OTH</td>
              <td>{this.state.pointInfor.AF_OTH}</td>
            </tr>
            <tr>
              <td>AF_SAS</td>
              <td>{this.state.pointInfor.AF_SAS}</td>
            </tr>
           </tbody>
          </table>
        </div>

        <div style={{display: (this.state.type==='onekg'? 'block':'none')}}>
          <table className="table table-striped">
            <tbody>
            <tr>
              <td>CHROM</td>
              <td>{this.state.pointInfor.CHROM}</td>
            </tr>
            <tr>
              <td>POS</td>
              <td>{this.state.pointInfor.POS}</td>
            </tr>
            <tr>
              <td>REF</td>
              <td>{this.state.pointInfor.REF}</td>
            </tr>
            <tr>
              <td>OBS</td>
              <td>{this.state.pointInfor.OBS}</td>
            </tr>
            <tr>
              <td>AF_EAS</td>
              <td>{this.state.pointInfor.AF_EAS}</td>
            </tr>
            <tr>
              <td>RS</td>
              <td>{this.state.pointInfor.RS}</td>
            </tr>
            </tbody>
          </table>
        </div>

        <div style={{display: (this.state.type==='esp'? 'block':'none')}}>
          <table className="table table-striped">
            <tbody>
            <tr>
              <td>CHROM</td>
              <td>{this.state.pointInfor.CHROM}</td>
            </tr>
            <tr>
              <td>START</td>
              <td>{this.state.pointInfor.START}</td>
            </tr>
            <tr>
              <td>END</td>
              <td>{this.state.pointInfor.END}</td>
            </tr>
            <tr>
              <td>REF</td>
              <td>{this.state.pointInfor.REF}</td>
            </tr>
            <tr>
              <td>ALT</td>
              <td>{this.state.pointInfor.ALT}</td>
            </tr>
            <tr>
              <td>AF_ALL</td>
              <td>{this.state.pointInfor.AF_ALL}</td>
            </tr>
            <tr>
              <td>RS</td>
              <td>{this.state.pointInfor.RS}</td>
            </tr>
            </tbody>
          </table>
        </div>

        <div style={{display: (this.state.type==='exac'? 'block':'none')}}>
          <table className="table table-striped">
          <tbody>
          <tr>
            <td>CHROM</td>
            <td>{this.state.pointInfor.CHROM}</td>
          </tr>
          <tr>
            <td>START</td>
            <td>{this.state.pointInfor.START}</td>
          </tr>
          <tr>
            <td>END</td>
            <td>{this.state.pointInfor.END}</td>
          </tr>
          <tr>
            <td>REF</td>
            <td>{this.state.pointInfor.REF}</td>
          </tr>
          <tr>
            <td>ALT</td>
            <td>{this.state.pointInfor.ALT}</td>
          </tr>
          <tr>
            <td>AF_ALL</td>
            <td>{this.state.pointInfor.EXAC_ALL}</td>
          </tr>
          <tr>
            <td>AF_AFR</td>
            <td>{this.state.pointInfor.EXAC_AFR}</td>
          </tr>
          <tr>
            <td>AF_AMR</td>
            <td>{this.state.pointInfor.EXAC_AMR}</td>
          </tr>
          <tr>
            <td>AF_EAS</td>
            <td>{this.state.pointInfor.EXAC_EAS}</td>
          </tr>
          <tr>
            <td>AF_FIN</td>
            <td>{this.state.pointInfor.EXAC_FIN}</td>
          </tr>
          <tr>
            <td>AF_NFE</td>
            <td>{this.state.pointInfor.EXAC_NFE}</td>
          </tr>
          <tr>
            <td>AF_OTH</td>
            <td>{this.state.pointInfor.EXAC_OTH}</td>
          </tr>
          <tr>
            <td>AF_SAS</td>
            <td>{this.state.pointInfor.EXAC_SAS}</td>
          </tr>
      </tbody>
      </table>
        </div>

        <div style={{display: (this.state.type==='annovar'? 'block':'none')}}>
          <table className="table table-striped">
          <tbody>
          <tr>
            <td>CHROM</td>
            <td>{this.state.pointInfor.CHROM}</td>
          </tr>
          <tr>
            <td>START</td>
            <td>{this.state.pointInfor.START}</td>
          </tr>
          <tr>
            <td>END</td>
            <td>{this.state.pointInfor.END}</td>
          </tr>
          <tr>
            <td>REF</td>
            <td>{this.state.pointInfor.REF}</td>
          </tr>
          <tr>
            <td>ALT</td>
            <td>{this.state.pointInfor.ALT}</td>
          </tr>
          <tr>
            <td>SIFT_score</td>
            <td>{this.state.pointInfor.SIFT_score}</td>
          </tr>
          <tr>
            <td>SIFT_pred</td>
            <td>{this.state.pointInfor.SIFT_pred}</td>
          </tr>
          <tr>
            <td>Polyphen2_HDIV_score</td>
            <td>{this.state.pointInfor.Polyphen2_HDIV_score}</td>
          </tr>
          <tr>
            <td>Polyphen2_HDIV_pred</td>
            <td>{this.state.pointInfor.Polyphen2_HDIV_pred}</td>
          </tr>
          <tr>
            <td>Polyphen2_HVAR_score</td>
            <td>{this.state.pointInfor.Polyphen2_HVAR_score}</td>
          </tr>
          <tr>
            <td>Polyphen2_HVAR_pred</td>
            <td>{this.state.pointInfor.Polyphen2_HVAR_pred}</td>
          </tr>
      </tbody>
      </table>
        </div>

        <div style={{display: (this.state.type==='clinvar'? 'block':'none')}}>
          <table className="table table-striped">
            <tbody>
            <tr>
              <td>CHROM</td>
              <td>{this.state.pointInfor.CHROM}</td>
            </tr>
            <tr>
              <td>START</td>
              <td>{this.state.pointInfor.START}</td>
            </tr>
            <tr>
              <td>END</td>
              <td>{this.state.pointInfor.END}</td>
            </tr>
            <tr>
              <td>REF</td>
              <td>{this.state.pointInfor.REF}</td>
            </tr>
            <tr>
              <td>ALT</td>
              <td>{this.state.pointInfor.ALT}</td>
            </tr>
            <tr>
              <td>CLNSIG</td>
              <td style={tdStyle}>{this.state.pointInfor.CLNSIG}</td>
            </tr>
            <tr>
              <td>CLNDBN</td>
              <td style={tdStyle}>{this.state.pointInfor.CLNDBN}</td>
            </tr>
            <tr>
              <td>CLNACC</td>
              <td style={tdStyle}>{this.state.pointInfor.CLNACC}</td>
            </tr>
            <tr>
              <td>CLNDSDB</td>
              <td style={tdStyle}>{this.state.pointInfor.CLNDSDB}</td>
            </tr>
            <tr>
              <td>CLNDSDBID</td>
              <td style={{wordWrap:'break-word',wordBreak:'break-all'}}>{this.state.pointInfor.CLNDSDBID}</td>
            </tr>
          </tbody>
          </table>
        </div>

        <div style={{display: (this.state.type==='hgmd'? 'block':'none')}}>
          <table className="table table-striped">
            <tbody>
            <tr>
              <td>CHROM</td>
              <td>{this.state.pointInfor.CHROM}</td>
            </tr>
            <tr>
              <td>POS</td>
              <td>{this.state.pointInfor.POS}</td>
            </tr>
            <tr>
              <td>REF</td>
              <td>{this.state.pointInfor.REF}</td>
            </tr>
            <tr>
              <td>ALT</td>
              <td>{this.state.pointInfor.ALT}</td>
            </tr>
            <tr>
              <td>CLASS</td>
              <td>{this.state.pointInfor.CLASS}</td>
            </tr>
            <tr>
              <td>GENE</td>
              <td>{this.state.pointInfor.GENE}</td>
            </tr>
            <tr>
              <td>DNA</td>
              <td>{this.state.pointInfor.DNA}</td>
            </tr>
            <tr>
              <td>PROT</td>
              <td>{this.state.pointInfor.PROT}</td>
            </tr>
            <tr>
              <td>PHEN</td>
              <td>{this.state.pointInfor.PHEN}</td>
            </tr>
          </tbody>
          </table>
        </div>

        <div style={{display: (this.state.type==='varAnnoDetail'? 'block':'none')}}>
          <table className="table table-striped">
            <tbody>
            <tr>
              <td>CHROM</td>
              <td>{this.state.pointInfor.CHROM}</td>
            </tr>
            <tr>
              <td>START</td>
              <td>{this.state.pointInfor.START}</td>
            </tr>
            <tr>
              <td>END</td>
              <td>{this.state.pointInfor.END}</td>
            </tr>
            <tr>
              <td>REF</td>
              <td>{this.state.pointInfor.REF}</td>
            </tr>
            <tr>
              <td>ALT</td>
              <td>{this.state.pointInfor.ALT}</td>
            </tr>
            <tr>
              <td>RS</td>
              <td>{this.state.pointInfor.RS}</td>
            </tr>
            <tr>
              <td>Gene Symbol</td>
              <td>{this.state.pointInfor.GeneSymbol}</td>
            </tr>
            <tr>
              <td>Func</td>
              <td>{this.state.pointInfor.Func}</td>
            </tr>
            <tr>
              <td>ExonicFunc</td>
              <td>{this.state.pointInfor.ExonicFunc}</td>
            </tr>
            <tr>
              <td>C dot</td>
              <td>
                {this.state.pointInfor.Cdot===undefined? undefined:
                  this.state.pointInfor.Cdot.split('/').map(dot => {
                  return(<p>{dot}</p>);
                })}
            </td>
            </tr>
            <tr>
              <td>P dot</td>
              <td>
                {this.state.pointInfor.Pdot===undefined? undefined:
                  this.state.pointInfor.Pdot.split('/').map(dot => {
                  return(<p>{dot}</p>);
                })}
              </td>
            </tr>
            <tr>
              <td>Category</td>
              <td>{this.state.pointInfor.Category}</td>
            </tr>
            <tr>
              <td>Comments</td>
              <td>{this.state.pointInfor.Comments}</td>
            </tr>
          </tbody>
          </table>
        </div>

        <div style={{display: (this.state.type==='history'? 'block':'none')}}>
          <table className="table table-striped">
            <thead>
          		<tr>
          			<th>Revision</th>
          			<th>DataTime</th>
          			<th>Action</th>
          			<th>Func</th>
          			<th>ExonicFunc</th>
          			<th>Category</th>
          			<th>Comments</th>
          			<th>OperUser</th>
          		</tr>
          	</thead>
            <tbody>
              {Object.keys(this.state.pointInfor).map(key => {
                return (
                  <tr>
                    <td>{this.state.pointInfor[key].revision}</td>
                    <td>{this.state.pointInfor[key].datetime}</td>
                    <td>{this.state.pointInfor[key].action}</td>
                    <td>{this.state.pointInfor[key].Func}</td>
                    <td>{this.state.pointInfor[key].ExonicFunc}</td>
                    <td>{this.state.pointInfor[key].Category}</td>
                    <td>{this.state.pointInfor[key].Comments}</td>
                    <td>{this.state.pointInfor[key].OperUser}</td>
                  </tr>);
              })}
            </tbody>
          </table>
        </div>
     </Dialog>
     </div>
    );
  }
}
