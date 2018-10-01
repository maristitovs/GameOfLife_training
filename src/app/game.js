import GameOfLife from "./GameOfLife";
import { DOMProvider } from "./../providers";
const formElement = ["sizeX", "sizeY", "speed"];
let paused = false
let emptySubmit = false

const game = new GameOfLife({
  provider: new DOMProvider(),
  sizeX: 100,
  sizeY: 50,
  speed: 100
});

const form = document.querySelector("form");
const pauseButton = document.querySelector("#pause")


form.addEventListener("submit", () => {
  event.preventDefault();
  formElement.forEach(element => {
    if (form.querySelector("#" + element).value == '') {
      emptySubmit = true
      window.alert("Hey, dude, please, set " + element + " value!")
    }
  })
  if (!emptySubmit) {
    let config = { provider: new DOMProvider() };
    formElement.forEach(element => {
      config[element] = parseInt(form.elements[element].value);
    });
    game.pause(true)
    console.log(config);

    game.restart(config);
  }
  emptySubmit = false
});

pauseButton.addEventListener("click", () => {
  if (game.nextIter) {
    pauseButton.textContent = "Resume"
    game.pause()
  } else {
    pauseButton.textContent = "Pause"
    game.start();
  }
});

game.start();
