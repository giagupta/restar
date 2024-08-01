window.onload = () => {
  setTimeout(() => {
    document.getElementById("breathingContainer").style.display = "none";
    document.getElementById("timerContainer").style.display = "flex";
  }, 5000); // Adjust the time as needed for your breathing animation duration
};

function showMainContent() {
  document.getElementById("timerContainer").style.display = "none";
  document.getElementById("mainContent").style.display = "flex";
}

let timerInterval;
let breakInterval;
let minutes;
let seconds;
let totalSeconds;
let isPaused = false;
let isPausedBreak = false;
let workDuration;
let breakDuration;

const iframe = document.getElementById("breakFrame");

let breakValue;
const choosingTimer = function (input) {
  if (input == "five") {
    breakValue = "five";
  } else if (input == "ten") {
    breakValue = "ten";
  }
};

document.getElementById("startBreakNow").addEventListener("click", () => {
  document.getElementById("timerContainer").style.display = "none";
  document.getElementById("breathingContainer").style.display = "flex";
  setTimeout(() => {
    document.getElementById("breathingContainer").style.display = "none";
    document.getElementById("mainContent").style.display = "flex";
  }, 5000);
  setTimeout(() => {
    if (breakValue === "five") {
      startBreakTimer(5);
    } else {
      startBreakTimer(10);
    }
    randomMinute(breakValue);
  }, 5000);
});

const randomMinute = function (breakValue) {
  if (breakValue === "five") {
    displayRandomSite(fiveMinuteSites);
  } else {
    displayRandomSite(tenMinuteSites);
  }
};

document.getElementById("chooseNewBreak").addEventListener("click", () => {
  console.log(breakValue);
  randomMinute(breakValue);
});

document.getElementById("pauseResumeButton").addEventListener("click", () => {
  if (isPaused) {
    resumeTimer();
  } else {
    pauseTimer();
  }
});

document
  .getElementById("pauseResumeButtonBreak")
  .addEventListener("click", () => {
    if (isPausedBreak) {
      resumeTimerBreak();
    } else {
      pauseTimerBreak();
    }
  });

function resetTimer() {
  clearInterval(timerInterval);
  clearInterval(breakInterval);
  document.getElementById("timer").textContent = "25:00"; // Reset to the initial timer value (e.g., 25:00)
  document.getElementById("workProgress").style.width = "0";
  document.getElementById("breakTimer").textContent = "05:00"; // Reset break timer value
  document.getElementById("breakProgress").style.width = "0";
}

document.getElementById("reset").addEventListener("click", () => {
  resetTimer();
  isPaused = false;
  document.getElementById("pauseResumeButton").textContent = "Pause";
});

document.getElementById("resetBreak").addEventListener("click", () => {
  resetTimer();
  isPausedBreak = false;
  document.getElementById("pauseResumeButtonBreak").textContent = "Pause";
});

function startTimer(workMinutes, breakMinutes) {
  workDuration = workMinutes * 60;
  breakDuration = breakMinutes * 60;

  clearInterval(timerInterval);
  clearInterval(breakInterval);
  minutes = workMinutes;
  seconds = 0;
  totalSeconds = workMinutes * 60;
  isPaused = false;
  displayTime();
  updateProgressBar(workDuration);

  timerInterval = setInterval(updateTimer, 1000);

  function updateTimer() {
    if (!isPaused) {
      if (seconds > 0) {
        seconds--;
      } else if (minutes > 0) {
        seconds = 59;
        minutes--;
      } else {
        clearInterval(timerInterval);
        playAlarm();
        alert("Timer completed! Take a break.");
        showMainContent();
        startBreakTimer(breakMinutes);
        return;
      }

      totalSeconds--;
      displayTime();
      updateProgressBar(workDuration);
    }
  }

  function displayTime() {
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    document.getElementById(
      "timer"
    ).textContent = `${formattedMinutes}:${formattedSeconds}`;
  }

  function updateProgressBar(duration) {
    const progress = ((duration - totalSeconds) / duration) * 100;
    document.getElementById("workProgress").style.width = `${progress}%`;
  }
}

function startBreakTimer(breakMinutes) {
  clearInterval(breakInterval);
  let breakTotalSeconds = breakMinutes * 60;
  let breakMinutesLeft = breakMinutes;
  let breakSecondsLeft = 0;
  isPausedBreak = false;

  if (breakValue === "five") {
    displayRandomSite(fiveMinuteSites);
  } else {
    displayRandomSite(tenMinuteSites);
  }

  displayBreakTime();
  updateBreakProgressBar();

  breakInterval = setInterval(() => {
    if (!isPausedBreak) {
      if (breakSecondsLeft > 0) {
        breakSecondsLeft--;
      } else if (breakMinutesLeft > 0) {
        breakSecondsLeft = 59;
        breakMinutesLeft--;
      } else {
        clearInterval(breakInterval);
        playAlarm();
        alert("Break time over! Back to work.");
        iframe.src = " ";
        document.getElementById("mainContent").style.display = "none";
        document.getElementById("timerContainer").style.display = "flex";
        resetTimer();
        return;
      }

      breakTotalSeconds--;
      displayBreakTime();
      updateBreakProgressBar();
    }
  }, 1000);

  function displayBreakTime() {
    const formattedMinutes =
      breakMinutesLeft < 10 ? `0${breakMinutesLeft}` : breakMinutesLeft;
    const formattedSeconds =
      breakSecondsLeft < 10 ? `0${breakSecondsLeft}` : breakSecondsLeft;
    document.getElementById(
      "breakTimer"
    ).textContent = `${formattedMinutes}:${formattedSeconds}`;
  }

  function updateBreakProgressBar() {
    const progress =
      ((breakMinutes * 60 - breakTotalSeconds) / (breakMinutes * 60)) * 100;
    document.getElementById("breakProgress").style.width = `${progress}%`;
  }
}

function pauseTimer() {
  isPaused = true;
  document.getElementById("pauseResumeButton").textContent = "Resume";
}

function resumeTimer() {
  isPaused = false;
  document.getElementById("pauseResumeButton").textContent = "Pause";
}

function pauseTimerBreak() {
  isPausedBreak = true;
  document.getElementById("pauseResumeButtonBreak").textContent = "Resume";
}

function resumeTimerBreak() {
  isPausedBreak = false;
  document.getElementById("pauseResumeButtonBreak").textContent = "Pause";
}

function playAlarm() {
  const breakSound = document.getElementById("timerSound");
  breakSound.currentTime = 0;
  breakSound.play();
  setTimeout(() => {
    breakSound.pause();
  }, 9000); // Play the sound for 9 seconds
}

const fiveMinuteSites = [
  "https://www.youtube.com/embed/H3Zmx1HaVng?si=Ve9xE7VuFa84mndC",
  "https://www.youtube.com/embed/ETdAlFuJ9PE?si=w8UL-UQrUNmbMppB",
  "https://www.youtube.com/embed/JrQMlzvsLIU?si=3z6YywieYhKfO6aY",
  "https://www.youtube.com/embed/4V8pZaD9tgg?si=j42QpPTYbm5S7IOz",
  "https://www.youtube.com/embed/jPbp18ij0qQ?si=s9b3cA2PGmsWr7G_",
  "https://www.youtube.com/embed/gfzC9XMEypg?si=j4n9PSGwtKWaBRZC",
  "https://www.youtube.com/embed/nGnX6GkrOgk?si=IZQ5xafZgnp_UfIN",
  "https://www.youtube.com/embed/-HRSxAxMJO8?si=AlOG2sPRyKNZHoe2",
  "https://www.youtube.com/embed/xRH1To_xyr8?si=hqFCejrr7PKdt1gg",
  "https://www.youtube.com/embed/tzIJfCMBBRs?si=JQu9aVBXkIl1S7CL",
  "https://www.youtube.com/embed/7HGJ_hC730Q?si=ZrMB0wALrAajKS2f",
  // Add more 5-minute break URLs as needed
];

const tenMinuteSites = [
  "https://www.youtube.com/embed/SvPKFsCiMsw?si=OBbZ1RKzw64x1SNn",
  "https://www.youtube.com/embed/4hXYRXaJdtk?si=iXYWNuY2NzU1fL2C",
  "https://www.youtube.com/embed/vFai116E69M?si=yPGRAEMJlqsD2LuH",
  "https://www.youtube.com/embed/X3-gKPNyrTA?si=yS2lvd2T4YvgxJik",
  "https://www.youtube.com/embed/vGAuxPUTi5Q?si=vHbuzs1-xlRzxeH3",
  "https://www.youtube.com/embed/vj0JDwQLof4?si=TKaAw1OlcfBuIxWw",
  "https://www.youtube.com/embed/eoSvD7YQnNQ?si=gc2J0wBTHbtdAsaF",
  "https://www.youtube.com/embed/BPlCatqZRPI?si=PWnFO2fuYM7vOY4U",
  "https://www.youtube.com/embed/Kcg6dtlhVgg?si=syE0u0wnvHwiS-Ok",
  "https://www.youtube.com/embed/TSrfB7JIzxY?si=Bk8M2hXbSon5H6Sa",
  // Add more 10-minute break URLs as needed
];

document.getElementById("fiveMinuteButton").addEventListener("click", () => {
  randomMinute(breakValue);
  startBreakTimer(5);
});

document.getElementById("tenMinuteButton").addEventListener("click", () => {
  randomMinute(breakValue);
  startBreakTimer(10);
});

document.getElementById("returnToTimer").addEventListener("click", () => {
  iframe.src = " ";
  document.getElementById("mainContent").style.display = "none";
  document.getElementById("breathingContainer").style.display = "flex";
  setTimeout(() => {
    document.getElementById("breathingContainer").style.display = "none";
    document.getElementById("timerContainer").style.display = "flex";
  }, 5000); // Adjust the time as needed for your breathing animation duration
  resetTimer();
});

function displayRandomSite(sites) {
  const randomIndex = Math.floor(Math.random() * sites.length);
  const randomSite = sites[randomIndex];

  iframe.src = randomSite;
  iframe.onerror = function () {
    alert("The selected site could not be loaded. Please try another one.");
  };
}
