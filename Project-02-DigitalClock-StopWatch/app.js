function updateClock() {
  const now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();
  let ampm = 'AM';
  if (hours >= 12) ampm = 'PM';
  if (hours > 12) hours = hours - 12;
  if (hours === 0) hours = 12;
  if (hours < 10) hours = '0' + hours;
  if (minutes < 10) minutes = '0' + minutes;
  if (seconds < 10) seconds = '0' + seconds;
  document.getElementById('clockH').textContent = hours;
  document.getElementById('clockM').textContent = minutes;
  document.getElementById('clockS').textContent = seconds;
  document.getElementById('ampm').textContent = ampm;
  document.getElementById('dateDisplay').textContent = now.toLocaleDateString('en-PK', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  setTimeout(updateClock, 1000);
}
updateClock();
let running = false;
let minutes = 0;
let seconds = 0;
let hundredths = 0;
let timer;
const swMain = document.querySelector('.sw-main');
const swMs = document.getElementById('swMs');
const btnStart = document.getElementById('btnStart');
const btnStop = document.getElementById('btnStop');
const btnReset = document.getElementById('btnReset');
function pad(n) {
  return n < 10 ? '0' + n : n;
}
function updateDisplay() {
  swMain.textContent = pad(minutes) + ':' + pad(seconds);
  swMs.textContent = pad(hundredths);
}
function start() {
  if (running) return;
  running = true;
  btnStart.disabled = true;
  btnStop.disabled = false;

  timer = setInterval(() => {
    hundredths++;
    if (hundredths === 100) {
      hundredths = 0;
      seconds++;
    }
    if (seconds === 60) {
      seconds = 0;
      minutes++;
    }
    updateDisplay();
  }, 10);
}
function stop() {
  running = false;
  clearInterval(timer);
  btnStart.disabled = false;
  btnStop.disabled = true;
}
function reset() {
  stop();
  minutes = 0;
  seconds = 0;
  hundredths = 0;
  updateDisplay();
}
btnStart.addEventListener('click', start);
btnStop.addEventListener('click', stop);
btnReset.addEventListener('click', reset);
updateDisplay();
