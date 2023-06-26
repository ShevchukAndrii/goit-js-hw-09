const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const bodyEl = document.querySelector('body');
let timerId = null;
stopBtn.disabled = true;

const getRandomHexColor= () => {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}
const changeColorBody = () => {
  startBtn.disabled = true;
         stopBtn.disabled = false;
     timerId = setInterval(() => {
        const color = getRandomHexColor();
         bodyEl.style.backgroundColor = color;
         
    }, 1000);

}

const stopChangeColorBody = () => {
    clearInterval(timerId);
    startBtn.disabled = false;
    stopBtn.disabled = true;
}

startBtn.addEventListener("click", changeColorBody);
stopBtn.addEventListener("click", stopChangeColorBody);
