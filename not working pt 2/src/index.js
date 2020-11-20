import React from "react";
import Routes from "./Routes";
import ReactDOM from "react-dom";

const root = document.getElementById('root')

if (root !== null) {
  ReactDOM.render(<Routes /> , root)
}

//ReactDOM.render(<Routes />, document.getElementById("root"));
