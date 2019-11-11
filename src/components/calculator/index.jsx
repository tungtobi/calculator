import React from "react";
import Display from "../screen";
import ButtonPanel from "../keyboard";
import calculate from '../../logic/calculate';
import "./style.css";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      result: null,
      next: null,
      prev: null,
      operator: null,
      expr: []
    };
  }

  handleClick = buttonName => {
    this.setState(calculate(this.state, buttonName));
  };

  render() {
    return (
      <div className="component-app">
        <Display 
          next={this.state.next ? this.state.next : (this.state.result ? "" : "0")} 
          prev={this.state.expr.length === 0 ? " " : this.state.expr} 
          result={this.state.result ? "= " + this.state.result : ""}
        />
        <ButtonPanel clickHandler={this.handleClick} />
      </div>
    );
  }
}
