const targets = document.querySelectorAll(".target");

const targets_list = Array.from(targets);
const default_offsets = targets_list.reduce((acc, curr, index) => {
  const id = `div${index}`;
  curr.id = id;
  acc[id] = { left: curr.offsetLeft, top: curr.offsetTop };
  return acc;
}, {});

console.log(default_offsets);

let activeTarget = null;
let initialX, initialY;
let currentX, currentY;

function handleMouseDown(event) {
  if (event.button === 0) {
    activeTarget = event.target;

    initialX = event.clientX - activeTarget.offsetLeft;
    initialY = event.clientY - activeTarget.offsetTop;

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  }
}

function handleMouseMove(event) {
  if (activeTarget) {

    currentX = event.clientX - initialX;
    currentY = event.clientY - initialY;

    activeTarget.style.left = currentX + "px";
    activeTarget.style.top = currentY + "px";
  }
}

function handleMouseUp(event) {
  if (activeTarget) {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
    activeTarget = null;
  }
}

function handleDoubleClick(event) {
  activeTarget = event.target;

  initialX = event.clientX - activeTarget.offsetLeft;
  initialY = event.clientY - activeTarget.offsetTop;

  activeTarget.style.backgroundColor = "blue";

  document.addEventListener("mousemove", handleMouseMove);
  document.addEventListener("mouseup", handleMouseUp);

  activeTarget.addEventListener("click", handleMouseClick);
}

function handleMouseClick(event) {
  document.removeEventListener("mousemove", handleMouseMove);
  document.removeEventListener("mouseup", handleMouseUp);

  activeTarget = null;
  event.target.style.backgroundColor = "";
}

function handleKeyDown(event) {
  if (event.key === "Escape" && activeTarget) {
    activeTarget.style.backgroundColor = "red";

    activeTarget.style.left = default_offsets[activeTarget.id].left + "px";
    activeTarget.style.top = default_offsets[activeTarget.id].top + "px";

    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);

    activeTarget = null;
  }
}

targets.forEach((target) => {
  target.addEventListener("mousedown", handleMouseDown);
  target.addEventListener("dblclick", handleDoubleClick);
});

document.addEventListener("keydown", handleKeyDown);
