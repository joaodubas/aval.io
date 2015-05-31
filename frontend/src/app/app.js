import React from "react/addons";
import {App} from "./components/App";

class Main {
  render(element) {
    var node = React.createElement(App);
    React.render(node, element);
  }
}

export default Main;