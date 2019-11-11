import React from "react";
import "./style.css";

class Screen extends React.Component {
  render() {
    return (
      <div className="component-display">
        <div>
          <div className="prev-expr">{this.props.prev}</div>
          <div className="next-value">{this.props.next}</div>
          <div className="result">{this.props.result}</div>
        </div>
      </div>
    );
  }
}

export default Screen;