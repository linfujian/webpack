import React from 'react';

export default class PointRow extends React.Component {
  constructor(props) {
    super(props);
    this.handleSelectType = this.handleSelectType.bind(this);
  }

  handleSelectType(e) {
    e.preventDefault();
    const href = e.target.href.toString();
    const index = href.lastIndexOf('/')+1;
    //const index = e.target.href.lastIndexof('/');
    const type= href.substring(index);
    const params = {
      chr : this.props.point.CHROM,
      pos : this.props.point.POS,
      ref : this.props.point.REF,
      alt : this.props.point.ALT,
    }
    this.props.selectDialog(type, params);

  }

  render() {
    return (
      <tr>
        <td>
          <a href={'genomebrowse:/api/zoom?locus=' + this.props.point.CHROM + ':' + this.props.point.POS + '-' + this.props.point.POS}>
            {this.props.index + 1}
          </a>
        </td>
        <td>
          <input type="Hidden" name={'varAnnoPoints[' + this.props.index + '].CHROM'} value={this.props.point.CHROM} />
          {this.props.point.CHROM}
        </td>
        <td>
          <input type="Hidden" name={'varAnnoPoints[' + this.props.index + '].START'} value={this.props.point.POS} />
          <input type="Hidden" name={'varAnnoPoints[' + this.props.index + '].END'} value={this.props.point.POS} />
          {this.props.point.POS}
        </td>
        <td>
          <input type="Hidden" name={'varAnnoPoints[' + this.props.index + '].REF'} value={this.props.point.REF} />
          {this.props.point.REF}
        </td>
        <td>
          <input type="Hidden" name={'varAnnoPoints[' + this.props.index + '].ALT'} value={this.props.point.ALT} />
          <a style={this.props.point.ALT != this.props.point.FatherALT && this.props.point.ALT != this.props.point.MotherALT ? {color:'red'}: {color:'black'}}>
            {this.props.point.ALT}
          </a>
        </td>
        <td>
          {this.props.point.ChildAF}
        </td>
        <td>
          {this.props.point.FatherALT}
        </td>
        <td>
          {this.props.point.FatherAF}
        </td>
        <td>
          {this.props.point.MotherALT}
        </td>
        <td>
          {this.props.point.MotherAF}
        </td>
        <td>
          <input type="Hidden" name={'varAnnoPoints[' + this.props.index + '].RS'} value={this.props.point.RS} />
          {this.props.point.RS}
        </td>
        <td>
          <input type="Hidden" name={'varAnnoPoints[' + this.props.index + '].GeneSymbol'} value={this.props.point.Symbol} />
          {this.props.point.Symbol}
        </td>
        <td>
          <a href="gno_gen" onClick={this.handleSelectType} >{this.props.point.AF_gno_genome}</a>
        </td>
        <td>
          <a href="gno_exo" onClick={this.handleSelectType} >{this.props.point.AF_gno_exome}</a>
        </td>
        <td>
          <a href="onekg" onClick={this.handleSelectType} >{this.props.point.AF_EAS_1kg}</a>
        </td>
        <td>
          <a href="esp" onClick={this.handleSelectType} >{this.props.point.AF_ALL_esp}</a>
        </td>
        <td>
          <a href="exac" onClick={this.handleSelectType} >{this.props.point.AF_ALL_exac}</a>
        </td>
        <td>
          <a href="annovar" onClick={this.handleSelectType} >{this.props.point.SIFT_score}</a>
        </td>
        <td>
          <a href="clinvar" onClick={this.handleSelectType} >{this.props.point.CLNSIG_clinvar}</a>
        </td>
        <td>
          <a href="hgmd" onClick={this.handleSelectType} >{this.props.point.CLASS}</a>
        </td>
        <td>
          <select name={'varAnnoPoints[' + this.props.index + '].Category'} defaultValue={this.props.point.Category === undefined ? 'pl choose' : this.props.point.Category}>
            <option value="pl choose">pl choose</option>
            <option value="PATH" >PATH</option>
            <option value="LiPATH" >LiPATH</option>
            <option value="VUS" >VUS</option>
            <option value="BEN" >BEN</option>
            <option value="LiBEN" >LiBEN</option>
            <option value="Other" >Other</option>
          </select>
        </td>
        <td>
          <input
            name={'varAnnoPoints[' + this.props.index + '].Comments'}
            type="text" maxLength="128" defaultValue={this.props.point.Comments}
          />
        </td>
        <td>
          <a href="varAnnoDetail" onClick={this.handleSelectType}>detail</a>
        </td>
        <td>
          <a href="history" onClick={this.handleSelectType}>History</a>
        </td>
        <td>
          <select name={'varAnnoPoints[' + this.props.index + '].report'} defaultValue={this.props.point.REPORT} >
            <option value="yes">yes</option>
            <option value="no">no</option>
          </select>
        </td>
      </tr>
    );
  }
}
