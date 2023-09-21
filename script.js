"user strict";

// HTML Elements

const sketchpadElement = document.querySelector(".sketchpad");

const sizeValueElement = document.querySelector("#size-value");
const sizeSliderElement = document.querySelector("#size-slider");

const actionBtnsContainerElement = document.querySelector(".btns--actions");
const actionBtnsElements = document.querySelectorAll(".btn--action");
const resetBtnElement = document.querySelector(".btn--reset");

const pixelElement = document.createElement("div");
pixelElement.classList.add("pixel");

// Helper and Callback Functions

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

let color = "black";
const setColor = function (event) {
    const clickedBtn = event.target.closest(".btn--action");
    if (!clickedBtn) return;

    actionBtnsElements.forEach((actionBtn) => actionBtn.classList.remove("btn--active"));
    clickedBtn.classList.add("btn--active");

    color = clickedBtn.dataset.color;
};

const renderColor = function (event) {
    event.preventDefault();

    if (event.target.classList.contains("pixel") && color !== "rainbow") event.target.style.backgroundColor = color;
    else event.target.style.backgroundColor = randomColor();
};

// Event Listeners

sketchpadElement.addEventListener("mouseover", renderColor);

sizeSliderElement.addEventListener("change", renderGrid);

resetBtnElement.addEventListener("click", renderGrid);

actionBtnsContainerElement.addEventListener("click", setColor);
