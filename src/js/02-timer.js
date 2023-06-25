import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const inputEl = document.getElementById("datetime-picker");
const BtnEl = document.querySelector('[data-start]');
const daysSpan = document.querySelector('[data-days]');
const hoursSpan = document.querySelector('[data-hours]');
const minutesSpan = document.querySelector('[data-minutes]');
const secondsSpan = document.querySelector('[data-seconds]');

let timerId = null;
let timeDifference = 0;
let convertData = {};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 5,
    onClose(selectedDates) {
        getCurrentData(selectedDates);
  },
};

BtnEl.disabled = true;
flatpickr(inputEl, options);
BtnEl.addEventListener("click", onBtnStart)

function onBtnStart() {
timerId = setInterval(() => {
    inputEl.disabled = true;
    BtnEl.disabled = true;
    timeDifference -= 1000;
    if (daysSpan.textContent <= 0 &&
    hoursSpan.textContent <= 0 &&
    minutesSpan.textContent <= 0 &&
    secondsSpan.textContent
 <= 0) {
        clearInterval(timerId);
        inputEl.disabled = false;
    }
  else {
        setDataSpan();
  }

  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function setDate(convertData) {
    daysSpan.textContent = convertData.days;
    hoursSpan.textContent = convertData.hours;
    minutesSpan.textContent = convertData.minutes;
    secondsSpan.textContent = convertData.seconds;

}

function getCurrentData(selectedDates) {
    const currentDate = Date.now();
     if (selectedDates[0] < currentDate) {
           return Notify.failure('Please choose a date in the future');
            BtnEl.disabled = true;
        }
        else {
         timeDifference = selectedDates[0].getTime() - currentDate;
         setDataSpan();
         BtnEl.disabled = false;
    }
}

function addLeadingZero(convertData) {
 Object.keys(convertData).forEach(key => 
  convertData[key] = convertData[key].toString().padStart(2, "0"));
return convertData
    
}

function setDataSpan() {
    convertData = convertMs(timeDifference);
        const convertedMs = addLeadingZero(convertData);
         setDate(convertedMs);
}
