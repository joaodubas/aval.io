import React from "react/addons";
import {AssessResult} from "./Assess";
import {updateState} from "../helper";

export class BMIBox extends React.Component {
  handleSubmit(payload) {
    var inlinePayload = Object
      .keys(payload)
      .map(k => k + "=" + payload[k])
      .join("&");
    var url = `/bmi?${inlinePayload}`;
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
      result: "no data so far"
    }
  }
  render() {
    return (
      <div className="assess-box">
        <h1>Body mass index</h1>
        <AssessResult result={this.state.result}></AssessResult>
        <BMIForm onBMISubmit={this.handleSubmit}></BMIForm>
      </div>
    );
  }
}

export class BMIForm extends React.Component {
  handleChangeFields(e) {
    var key = e.target.name;
    var value = e.target.value.trim();
    this.setState(updateState(key, value, this.state));
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.onBMISubmit(this.state);
    this.setState({
      weight: "",
      height: ""
    });

    return;
  }
  getInitialState() {
    return {
      weight: "",
      height: ""
    }
  }
  render() {
    return (
      <div className="assess-form">
        <form method="get" action="/bmi" onSubmit={this.handleSubmit}>
          <AnthropometricFields
            weight={this.state.weight}
            height={this.state.height}
            onChangeFields={this.handleChangeFields}></AnthropometricFields>
          <div><input type="submit" value="GO" /></div>
        </form>
      </div>
    )
  }
}

