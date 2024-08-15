const canvas = document.getElementById("simulationCanvas");
const ctx = canvas.getContext("2d");
const drawer = new Drawer(ctx, config);

let runnerA, runnerB, simulation;
let animationId = null;
let isRunning = false;
let isPaused = false;

const directionA = document.getElementById("directionA");
const speedASlider = document.getElementById("speedASlider");
const speedALabel = document.getElementById("speedALabel");
const lapsASlider = document.getElementById("lapsASlider");
const lapsALabel = document.getElementById("lapsALabel");

const directionB = document.getElementById("directionB");
const speedBSlider = document.getElementById("speedBSlider");
const speedBLabel = document.getElementById("speedBLabel");
const lapsBSlider = document.getElementById("lapsBSlider");
const lapsBLabel = document.getElementById("lapsBLabel");

speedASlider.addEventListener("input", () => {
  speedALabel.textContent = speedASlider.value;
});

lapsASlider.addEventListener("input", () => {
  lapsALabel.textContent = lapsASlider.value;
});

speedBSlider.addEventListener("input", () => {
  speedBLabel.textContent = speedBSlider.value;
});

lapsBSlider.addEventListener("input", () => {
  lapsBLabel.textContent = lapsBSlider.value;
});

function initializeSimulation() {
  if (isRunning) {
    cancelAnimationFrame(animationId);
    isRunning = false;
    isPaused = false;
    document.getElementById("pauseResumeButton").textContent = "Pause";
  }

  const speedA = parseInt(speedASlider.value) * parseInt(directionA.value);
  const lapsA = parseInt(lapsASlider.value);
  const speedB = parseInt(speedBSlider.value) * parseInt(directionB.value);
  const lapsB = parseInt(lapsBSlider.value);

  runnerA = new Runner("#FF6F61", speedA, lapsA);
  runnerB = new Runner("#1A8F85", speedB, lapsB);
  simulation = new Simulation(runnerA, runnerB);

  drawer.draw(simulation);
}

function startSimulation() {
  initializeSimulation();

  isRunning = true;
  runAnimation();
}

function runAnimation() {
  function animate() {
    if (!simulation.isFinished && isRunning && !isPaused) {
      simulation.update();
      drawer.draw(simulation);
      animationId = requestAnimationFrame(animate);
    } else if (simulation.isFinished) {
      isRunning = false;
      document.getElementById("pauseResumeButton").textContent = "Pause";
    }
  }

  animate();
}

function pauseResumeSimulation() {
  if (!isRunning && !isPaused) return;

  if (isPaused) {
    isPaused = false;
    document.getElementById("pauseResumeButton").textContent = "Pause";
    runAnimation();
  } else {
    isPaused = true;
    document.getElementById("pauseResumeButton").textContent = "Resume";
    if (animationId) {
      cancelAnimationFrame(animationId);
      animationId = null;
    }
  }
}

document
  .getElementById("startButton")
  .addEventListener("click", startSimulation);
document
  .getElementById("pauseResumeButton")
  .addEventListener("click", pauseResumeSimulation);

initializeSimulation();
