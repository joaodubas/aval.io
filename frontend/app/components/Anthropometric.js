import React from "react/addons";

export class AnthropometricFields extends React.Component {
  render() {
    return (
      <fieldset onChange={this.props.onChangeFields}>
        <legend>Anthropometric</legend>
        <div><input
            type="text"
            name="weight"
            value={this.props.weight}
            placeholder="weight (kg)" /></div>
        <div><input
            type="text"
            name="height"
            value={this.props.height}
            placeholder="height (cm)" /></div>
      </fieldset>
    );
  }
}

