const popup = document.getElementById("popup");
const failure = document.getElementById("failure");
const success = document.getElementById("success");
document.getElementById("yes").addEventListener("click", function () {
    popup.hidden = true;
    success.hidden = false;
});

document.getElementById("no").addEventListener("click", function () {
    failure.hidden = false;
    popup.hidden = true;
});

window.addEventListener("scroll", function checkSection() {
    const section = document.querySelector(".s2");
    const position = section.getBoundingClientRect();

    if (position.top < window.innerHeight && position.bottom > 0) {
        popup.hidden = false;
        document.getElementById("yes").focus();
        window.removeEventListener("scroll", checkSection);
    }
});

const section = document.querySelector(".s2");
const sceneWidth = 1672;
const sceneHeight = 941;
let isDiving = false;

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
    }
});

section.addEventListener("mouseleave", function () {
    if (!isDiving) {
        section.style.backgroundImage = "url('images/peopleonsea.png')";
    }
});