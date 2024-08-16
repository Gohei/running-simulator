class Simulation {
  constructor(runnerA, runnerB) {
    this.runnerA = runnerA;
    this.runnerB = runnerB;
    this.resetCrossCounting();
    this.resetLapCounting();
  }

  resetCrossCounting() {
    this.crossCount = 0;
    this.aAhead = this.runnerA.positionAngle > this.runnerB.positionAngle;
    this.isFirstUpdate = true;
  }

  resetLapCounting() {
    this.runnerA.reset();
    this.runnerB.reset();
  }

  checkBoundaryCross(prevAngle, currentAngle) {
    return (
      (prevAngle > 270 && currentAngle < 90) ||
      (prevAngle < 90 && currentAngle > 270)
    );
  }

  updateCrossCounting(prevAAngle, prevBAngle, currentAAngle, currentBAngle) {
    if (
      this.checkBoundaryCross(prevAAngle, currentAAngle) &&
      this.checkBoundaryCross(prevBAngle, currentBAngle)
    ) {
      // Do Nothing
    } else if (
      this.checkBoundaryCross(prevAAngle, currentAAngle) ||
      this.checkBoundaryCross(prevBAngle, currentBAngle)
    ) {
      this.aAhead = !this.aAhead;
    }

    const currentAAhead = currentAAngle > currentBAngle;
    if (!this.isFirstUpdate && this.aAhead !== currentAAhead) {
      this.crossCount++;
    }
    this.aAhead = currentAAhead;

    this.isFirstUpdate = false;
  }

  update() {
    const prevAAngle = this.runnerA.updatePosition();
    const prevBAngle = this.runnerB.updatePosition();

    this.runnerA.checkLapCompletion(prevAAngle);
    this.runnerB.checkLapCompletion(prevBAngle);

    if (!this.isFinished) {
      this.updateCrossCounting(
        prevAAngle,
        prevBAngle,
        this.runnerA.positionAngle,
        this.runnerB.positionAngle
      );
    }
  }

  get isFinished() {
    return this.runnerA.finished && this.runnerB.finished;
  }
}
