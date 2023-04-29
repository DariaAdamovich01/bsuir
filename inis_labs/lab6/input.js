const targets = document.querySelectorAll(".target");

const targets_list = Array.from(targets);
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

// моб

const followingDiv = document.querySelector('.target');

// исходное положение div
const originalPosition = { x: followingDiv.offsetLeft, y: followingDiv.offsetTop };

// активен ли в данный момент режим "следования за пальцем"
let followingModeActive = false;

// обнаружен ли в данный момент второй палец
let secondFingerDetected = false;

document.addEventListener('touchstart', handleTouchStart);
document.addEventListener('touchmove', handleTouchMove);

function handleTouchStart(event) {
  // было ли касание на div, который должен следовать за пальцем
  if (event.target === followingDiv) {
    // режим "следования за пальцем"
    followingModeActive = true;
  }
}

function handleTouchMove(event) {
  // активен ли режим "следования за пальцем"
  if (followingModeActive) {
    // обнаружен ли второй палец
    if (event.touches.length > 1) {
      // остановка режима "следования за пальцем" и возврат div в исходное положение
      followingModeActive = false;
      secondFingerDetected = true;
      followingDiv.style.left = originalPosition.x + 'px';
      followingDiv.style.top = originalPosition.y + 'px';
    } else {
      // перемещение div так, чтобы он следовал за пальцем пользователя
      followingDiv.style.left = event.touches[0].clientX + 'px';
      followingDiv.style.top = event.touches[0].clientY + 'px';
    }
  }
}

document.addEventListener('touchend', handleTouchEnd);
document.addEventListener('touchcancel', handleTouchEnd);

function handleTouchEnd(event) {
  // активен ли режим "следования за пальцем"
  if (followingModeActive) {
    followingModeActive = false;
    // обнаружен ли второй палец во время перетаскивания
    if (secondFingerDetected) {
      secondFingerDetected = false;
    } else {
      // проверка, были ли события touchstart и touchend быстрыми в одном и том же месте (т.е. действие щелчка).
      const touchDuration = event.timeStamp - event.touches[0].timeStamp;
      const touchDistance = Math.sqrt(Math.pow(event.changedTouches[0].clientX - event.touches[0].clientX, 2) + Math.pow(event.changedTouches[0].clientY - event.touches[0].clientY, 2));
      if (touchDuration < 500 && touchDistance < 10) {
        // выполнение действие щелчка
        followingDiv.click();
      }
    }
  }
}
///
function click(event) {
  if (event.touches.length === 1) {
    // если один палец на экране
    let touch = event.touches[0];
    if (touch.target === followingDiv) {
      // если палец коснулся элемента div
      following = true;
      offsetX = touch.pageX - followingDiv.offsetLeft;
      offsetY = touch.pageY - followingDiv.offsetTop;
    }
  } else if (event.touches.length > 1) {
    // остановка режима "следования за пальцем" и возврат div в исходное положение
    followingModeActive = false;
    secondFingerDetected = true;
    followingDiv.style.left = originalPosition.x + 'px';
    followingDiv.style.top = originalPosition.y + 'px';
  }
}
