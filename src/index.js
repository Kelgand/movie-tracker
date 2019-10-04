import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import "./styles.less";


var mountNode = document.getElementById("app");
ReactDOM.render(<App name="Jane" />, mountNode);