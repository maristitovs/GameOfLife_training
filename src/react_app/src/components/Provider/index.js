import React, { Component } from "react";
import ReactProvider from "./../../main_app/providers/ReactProvider";
import GameOfLife from "./../../main_app/app/GameOfLife";

import Changelog from "./../Changelog";
import GameGrid from "./../GameGrid";
import SubmitForm from "./../SubmitForm";
// import "./styles.css";
import { Grid } from "@material-ui/core";

const formElement = ["sizeX", "sizeY", "speed"];

export default class Provider extends Component {
  state = { grid: [], counterIterations: [], pauseText: "Pause" };

  componentDidMount = () => {
    this.provider = new ReactProvider(this);
    this.game = new GameOfLife({
      provider: this.provider,
      sizeX: 50,
      sizeY: 50,
      speed: 10
    });
    this.game.start();
  };

  onIteration = (grid, counters) => {
    const { counterIterations } = this.state;
    const newCounters = [counters, ...counterIterations];
    newCounters.length > 10 && newCounters.pop();
    this.setState({
      grid,
      counterIterations: newCounters
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    let config = { provider: new ReactProvider(this) };
    formElement.map(element => (config[element] = parseInt(event.target.elements[element].value)));
    this.game.pause(true);
    this.game.restart(config);
    this.setState({ pauseText: "Pause" });
  };

  handlePause = () => {
    if (this.game.nextIter) {
      this.setState({ pauseText: "Resume" });
      this.game.pause();
    } else {
      this.setState({ pauseText: "Pause" });
      this.game.start();
    }
  };

  render() {
    const { grid, counterIterations } = this.state;
    return (
      <div style={{ padding: 20 }}>
        <Grid container direction="row-reverse" justify="space-evenly" alignItems="center">
          <div id="info" className="info">
            <div id="config" className="config">
              <SubmitForm
                handleSubmit={this.handleSubmit}
                handleClick={this.handlePause}
                pauseText={this.state.pauseText}
              />
            </div>
            <Changelog counterIterations={counterIterations} />
          </div>
          <GameGrid grid={grid} />
        </Grid>
      </div>
    );
  }
}
