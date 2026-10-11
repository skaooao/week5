const popup = document.getElementById("popup");
const failure = document.getElementById("failure");
const success = document.getElementById("success");
const completePanel = document.getElementById("complete");
const caughtCount = document.getElementById("caught-count");
const rating = document.getElementById("rating");
document.getElementById("yes").addEventListener("click", function () {
    popup.hidden = true;
    success.hidden = false;
});

document.getElementById("no").addEventListener("click", function () {
    failure.hidden = false;
    popup.hidden = true;
});

function checkSection() {
    const section = document.querySelector(".s2");
    const position = section.getBoundingClientRect();

    if (position.top < window.innerHeight && position.bottom > 0) {
        popup.hidden = false;
        document.getElementById("yes").focus();
        window.removeEventListener("scroll", checkSection);
    }
    }

    window.addEventListener("scroll", checkSection);

const section = document.querySelector(".s2");
    const colorArea = document.getElementById("really-large-div");
    const depthPanel = document.getElementById("box-scroll-values");
    const centerPanel = document.getElementById("box-center");
  const scoreDisplay = document.getElementById("score");
    const scoreboard = document.querySelector(".scoreboard");
const fishZones = Array.from(document.querySelectorAll(".fish-zone, .goby-zone")).map(function (zone) {
  return {
    zone,
    image: zone.querySelector("img"),
    collected: false
  };
});
const sceneWidth = 1672;
const sceneHeight = 941;
let isDiving = false;
  let score = 0;
let isFinished = false;

function finishDive() {
  if (isFinished) {
    return;
  }

  isFinished = true;
  caughtCount.textContent = score;
  if (score === 12) {
    rating.textContent = "Rating: Perfect";
  } else if (score >= 8) {
    rating.textContent = "Rating: Excellent";
  } else if (score >= 5) {
    rating.textContent = "Rating: Good";
  } else {
    rating.textContent = "Rating: Average";
  }
  completePanel.hidden = false;
  fishZones.forEach(function (fish) {
    fish.zone.hidden = true;
    fish.image.hidden = true;
  });
}

function restartGame() {
  failure.hidden = true;
  success.hidden = true;
  popup.hidden = true;
  completePanel.hidden = true;
  isDiving = false;
  isFinished = false;
  section.style.backgroundImage = "url('images/peopleonsea.png')";
  section.style.cursor = "default";
  colorArea.hidden = true;
  colorArea.style.backgroundColor = "#2556b0";
  depthPanel.hidden = true;
  centerPanel.hidden = true;
  fishZones.forEach(function (fish) {
    fish.zone.hidden = true;
    fish.image.hidden = true;
    fish.collected = false;
  });
  scoreboard.hidden = true;
  score = 0;
  scoreDisplay.textContent = score;
  caughtCount.textContent = score;
  document.getElementById("depth").textContent = "0";
  window.scrollTo(0, 0);
  window.addEventListener("scroll", checkSection);
}

document.getElementById("restart").addEventListener("click", restartGame);
document.getElementById("restart-complete").addEventListener("click", restartGame);

fishZones.forEach(function (fish) {
  fish.zone.addEventListener("mouseenter", function () {
    if (isDiving && !fish.collected) {
      fish.image.hidden = false;
    }
  });

  fish.zone.addEventListener("mouseleave", function () {
    fish.image.hidden = true;
  });

  fish.image.addEventListener("click", function () {
    if (!isDiving || isFinished || fish.collected) {
      return;
    }

    fish.collected = true;
    fish.image.hidden = true;
    score += 1;
    scoreDisplay.textContent = score;
  });
});

function isOverDiver(event) {
    const scale = Math.max(window.innerWidth / sceneWidth, window.innerHeight / sceneHeight);
    const imageWidth = sceneWidth * scale;
    const imageHeight = sceneHeight * scale;
    const offsetX = (window.innerWidth - imageWidth) / 2;
    const offsetY = (window.innerHeight - imageHeight) / 2;
    const imageX = (event.clientX - offsetX) / scale;
    const imageY = (event.clientY - offsetY) / scale;
    return imageX >= 120 && imageX <= 200 && imageY >= 470 && imageY <= 590;
}

section.addEventListener("mousemove", function (event) {
    const overDiver = isOverDiver(event);
    section.style.cursor = overDiver && !isDiving ? "pointer" : "default";

    if (isDiving) {
        section.style.backgroundImage = "url('images/dive.png')";
    } else {
        section.style.backgroundImage = overDiver
            ? "url('images/jump.png')"
            : "url('images/peopleonsea.png')";
    }
});

section.addEventListener("click", function (event) {
    if (isOverDiver(event)) {
        isDiving = true;
        section.style.backgroundImage = "url('images/dive.png')";
        section.style.cursor = "default";
        document.getElementById("really-large-div").hidden = false;
    document.getElementById("box-scroll-values").hidden = false;
        document.getElementById("box-center").hidden = false;
        fishZones.forEach(function (fish) {
          fish.zone.hidden = false;
        });
    scoreboard.hidden = false;
    }
});

section.addEventListener("mouseleave", function () {
    if (!isDiving) {
        section.style.backgroundImage = "url('images/peopleonsea.png')";
    }
});

window.addEventListener("scroll", function (e) {
  const y = window.scrollY;

  if (isDiving) {
    const colorAreaTop = colorArea.getBoundingClientRect().top + y;
    const colorProgress = Math.max(0, y - colorAreaTop);
    const maxColorProgress = Math.max(1, colorArea.offsetHeight - window.innerHeight);
    const darkness = Math.min(1, colorProgress / maxColorProgress);
    const colorR = Math.round(37 * (1 - darkness));
    const colorG = Math.round(86 * (1 - darkness));
    const colorB = Math.round(176 * (1 - darkness));

    colorArea.style.backgroundColor =
      "rgb(" + colorR + "," + colorG + "," + colorB + ")";
    document.getElementById("depth").textContent = Math.round(darkness * 10000);

    if (y + window.innerHeight >= document.documentElement.scrollHeight - 2) {
      finishDive();
    }
  }

  let paragraph = document.getElementById("content-center");
  if (y < 500) {
    paragraph.innerHTML = "Content 1";
  } else if (y >= 500 && y < 1000) {
    paragraph.innerHTML = "Content 2";
  } else if (y >= 1000 && y < 1500) {
    paragraph.innerHTML = "Content 3";
  } else if (y >= 1500 && y < 2000) {
    paragraph.innerHTML = "Content 4";
  } else {
    paragraph.innerHTML = "fin.";
  }
});

window.addEventListener("mousemove", function (event) {
  document.getElementById("client-x").textContent = event.clientX;
  document.getElementById("client-y").textContent = event.clientY;
});