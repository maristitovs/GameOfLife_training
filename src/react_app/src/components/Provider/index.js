import React, { Component } from "react";
import ReactProvider from "./../../main_app/providers/ReactProvider";
import GameOfLife from "./../../main_app/app/GameOfLife";
import Changelog from "./../Changelog";
import GameGrid from "./../GameGrid";
import SubmitForm from "./../SubmitForm";
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
      <Grid container direction="row" justify="space-evenly" alignItems="space-between">
        <Grid item className="config" xs="auto">
          <SubmitForm
            handleSubmit={this.handleSubmit}
            handleClick={this.handlePause}
            pauseText={this.state.pauseText}
          />
        </Grid>
        <Grid item xs={6}>
          <GameGrid grid={grid} />
        </Grid>
        <Grid item xs="auto" alignItems="space-between">
          <Changelog counterIterations={counterIterations} />
        </Grid>
      </Grid>
    );
  }
}
