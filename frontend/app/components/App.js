import React from "react/addons";
import {BMIBox} from "./BMI";
import {WTHBox} from "./WTH";

export class App extends React.Components {
  render() {
    return (
      <div>
        <BMIBox></BMIBox>
        <WTHBox></WTHBox>
      </div>
    );
  }
}