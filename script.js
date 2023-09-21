"user strict";

const sketchpadElement = document.querySelector(".sketchpad");
const sizeValueElement = document.querySelector("#size-value");
const sizeSliderElement = document.querySelector("#size-slider");
const resetBtnElement = document.querySelector(".btn--reset");

const pixelElement = document.createElement("div");
pixelElement.classList.add("pixel");

const renderGrid = function () {
    sketchpadElement.innerHTML = "";
    const gridSize = sizeSliderElement.value;

    sizeValueElement.textContent = `${gridSize} x ${gridSize}`;

    sketchpadElement.style["grid-template-columns"] = `repeat(${gridSize}, 1fr)`;
    sketchpadElement.style["grid-template-rows"] = `repeat(${gridSize}, 1fr)`;

    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            sketchpadElement.insertAdjacentHTML("beforeend", pixelElement.outerHTML);
        }
    }
};
renderGrid();

sizeSliderElement.addEventListener("change", renderGrid);

sketchpadElement.addEventListener("mouseover", function (event) {
    event.preventDefault();
    if (event.target.classList.contains("pixel")) event.target.style.backgroundColor = "black";
});

resetBtnElement.addEventListener("click", renderGrid);
