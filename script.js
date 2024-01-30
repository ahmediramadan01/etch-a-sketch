"user strict";

// GLOBAL VARIABLES //

let COLOR = "black";

// DOM ELEMENTS //

const sketchpadElement = document.querySelector(".sketchpad");
const sizeValueElement = document.querySelector("#size-value");
const sizeSliderElement = document.querySelector("#size-slider");
const actionButtonsContainerElement = document.querySelector(".buttons--actions");
const actionButtonsElements = document.querySelectorAll(".button--action");
const clearButtonElement = document.querySelector(".button--clear");

const pixelElement = document.createElement("div");
pixelElement.classList.add("pixel");

// HELPER FUNCTIONS //

const renderGrid = function () {
  sketchpadElement.innerHTML = "";
  const gridSize = sizeSliderElement.value;

  sizeValueElement.textContent = `${gridSize} x ${gridSize}`;

  sketchpadElement.style["grid-template-columns"] = `repeat(${gridSize}, 1fr)`;
  sketchpadElement.style["grid-template-rows"] = `repeat(${gridSize}, 1fr)`;

  for (let i = 0; i < gridSize ** 2; i++) {
    sketchpadElement.insertAdjacentHTML("beforeend", pixelElement.outerHTML);
  }
};
renderGrid();

const randomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const randomColor = () => `rgb(${randomInteger(0, 255)}, ${randomInteger(0, 255)}, ${randomInteger(0, 255)})`;

// CALLBACK FUNCTIONS //

const setColor = function (event) {
  const clickedButton = event.target.closest(".button--action");
  if (!clickedButton) return;

  actionButtonsElements.forEach((actionButton) => actionButton.classList.remove("button--active"));
  clickedButton.classList.add("button--active");

  COLOR = clickedButton.dataset.color;
};

const renderColor = function (event) {
  event.preventDefault();

  if (event.target.classList.contains("pixel") && COLOR !== "rainbow") event.target.style.backgroundColor = COLOR;
  else event.target.style.backgroundColor = randomColor();
};

// EVENT LISTENERS //

sketchpadElement.addEventListener("mouseover", renderColor);
sizeSliderElement.addEventListener("change", renderGrid);
clearButtonElement.addEventListener("click", renderGrid);
actionButtonsContainerElement.addEventListener("click", setColor);
