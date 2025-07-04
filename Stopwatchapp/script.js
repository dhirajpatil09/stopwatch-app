let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;

const display = document.getElementById('time');
const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const resetBtn = document.getElementById('reset');
const lapBtn = document.getElementById('lap');
const lapList = document.getElementById('laps');

// Format time as HH:MM:SS
function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return (
    (hours < 10 ? "0" + hours : hours) + ":" +
    (minutes < 10 ? "0" + minutes : minutes) + ":" +
    (seconds < 10 ? "0" + seconds : seconds)
  );
}

// Update display
function updateTime() {
  const now = Date.now();
  const diff = now - startTime + elapsedTime;
  display.textContent = formatTime(diff);
}

// Start timer
function startTimer() {
  if (!isRunning) {
    startTime = Date.now();
    timerInterval = setInterval(updateTime, 500);
    isRunning = true;
  }
}

// Pause timer
function pauseTimer() {
  if (isRunning) {
    clearInterval(timerInterval);
    elapsedTime += Date.now() - startTime;
    isRunning = false;
  }
}

// Reset everything
function resetTimer() {
  clearInterval(timerInterval);
  startTime = 0;
  elapsedTime = 0;
  isRunning = false;
  display.textContent = "00:00:00";
  lapList.innerHTML = "";
}

// Record lap
function recordLap() {
  if (isRunning) {
    const now = Date.now();
    const currentTime = formatTime(now - startTime + elapsedTime);
    const lapItem = document.createElement('li');
    lapItem.textContent = `Lap - ${currentTime}`;
    lapList.appendChild(lapItem);
  }
}

// Add event listeners
startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);
lapBtn.addEventListener("click", recordLap);
