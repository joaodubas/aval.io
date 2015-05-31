import React from "react/addons";

export class PersonFields extends React.Component {
  render() {
    return (
      <fieldset onChange={this.props.onChangeFields}>
        <legend>Person</legend>
        <div><input
          type="text"
          name="fullname"
          value={this.props.fullname}
          placeholder="full name"/></div>
        <div><input
          type="text"
          name="birth"
          value={this.props.birth}
          placeholder="birthday (yyyy-MM-dd)" /></div>
        <div>
          <select name="gender" selected={this.props.gender}>
            <option value="">---</option>
            <option value="0">Male</option>
            <option value="1">Female</option>
          </select>
        </div>
      </fieldset>
    );
  }
}

export class AssessFields extends React.Component {
  render() {
    return (
      <fieldset onChange={this.props.onChangeFields}>
        <legend>Assessment</legend>
        <div><input
          type="text"
          name="date"
          value={this.props.date}
          placeholder="date (yyyy-MM-dd)" /></div>
      </fieldset>
    );
  }
}

export class AssessResult extends React.Component {
  render() {
    return (
      <div className="assess-result">
        <pre>{this.props.result}</pre>
      </div>
    );
  }
}

