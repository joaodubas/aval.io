import React from "react/addons";
import {AssessResult, PersonFields, AssessFields} from "./Assess";
import {updateStat} from "../helper";

export class WTHBox extends React.Component {
  handleSubmit(payload) {
    var inlinePayload = Object
      .keys(payload)
      .map(k => k + "=" + payload[k])
      .join("&");
    var url = `/wth?${inlinePayload}`;
    fetch(url)
      .then(status)
      .then(text)
      .then(this.updateState)
      .catch(function (error) {
        console.log(error);
      });
  }
  updateState(response) {
    this.setState({
      result: response
    });
  }
  getInitialState() {
    return {
      result: "not data so far"
    };
  }
  render() {
    return (
      <div className="assess-box">
        <h1>Waist to hip ratio</h1>
        <AssessResult result={this.state.result}></AssessResult>
        <WTHForm onWTHSubmit={this.handleSubmit}></WTHForm>
      </div>
    );
  }
}

export class WTHForm extends React.Component {
  handleChangeFields(e) {
    var key = e.target.name;
    var value = e.target.value.trim();
    this.setState(updateState(key, value, this.state));
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.onWTHSubmit(this.state);
    this.setState({
      fullname: "",
      birth: "",
      gender: "",
      date: ""
    });
    return;
  }
  getInitialState() {
    return {
      fullname: "",
      birth: "",
      gender: "",
      date: ""
    }
  }
  render() {
    return (
      <div className="assess-form">
        <form method="get" action="/wth" onSubmit={this.handleSubmit}>
          <PersonFields
            fullname={this.state.fullname}
            birth={this.state.birth}
            gender={this.state.gender}
            onChangeFields={this.handleChangeFields}></PersonFields>
          <AssessFields
            date={this.state.date}
            onChangeFields={this.handleChangeFields}></AssessFields>
          <div><input type="submit" value="GO" /></div>
        </form>
      </div>
    );
  }
}

