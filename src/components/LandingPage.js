import React, { Component } from "react";

export default class LandingPage extends Component {
  handleClick = e => {
    e.preventDefault();
    window.location.href = "/adopt";
  };
  render() {
    return (
      <section className="landing-page-container">
        <h3 className="landing-header">Welcome to Petful</h3>
        <p className="landing-content">adopt a pet</p>
        <button className="landing-button" onClick={e => this.handleClick(e)}>
          Adopt a Pet!
        </button>
      </section>
    );
  }
}
