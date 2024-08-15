class Runner {
  constructor(color, speed, targetLaps, startAngle = 270) {
    this.color = color;
    this.speed = speed;
    this.startAngle = startAngle;
    this.positionAngle = startAngle;
    this.laps = 0;
    this.targetLaps = targetLaps;
    this.finished = false;
  }

  reset() {
    this.positionAngle = this.startAngle;
    this.laps = 0;
    this.finished = false;
  }

  updatePosition() {
    if (this.finished) return this.positionAngle;
    const previousAngle = this.positionAngle;
    this.positionAngle = (this.positionAngle + this.speed + 360) % 360;
    return previousAngle;
  }

  checkLapCompletion(previousAngle) {
    if (this.finished) return;
    if (this.speed > 0 && previousAngle < 270 && this.positionAngle >= 270) {
      this.laps++;
    } else if (
      this.speed < 0 &&
      previousAngle > 270 &&
      this.positionAngle <= 270
    ) {
      this.laps++;
    }

    if (this.laps >= this.targetLaps) {
      this.finishAtStartLine();
    }
  }

  finishAtStartLine() {
    this.positionAngle = 270;
    this.finished = true;
  }
}
