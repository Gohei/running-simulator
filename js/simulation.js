class Simulation {
  constructor(runnerA, runnerB) {
    this.runnerA = runnerA;
    this.runnerB = runnerB;
    this.reset();
  }

  reset() {
    this.runnerA.reset();
    this.runnerB.reset();
    this.crossCount = 0;
    this.aAhead = this.runnerA.positionAngle > this.runnerB.positionAngle;
    this.isFirstUpdate = true;
    this.isHold = false;
  }

  checkBoundaryCross(prevA, prevB, currA, currB) {
    return (
      (prevA > 270 && currA < 90) ||
      (prevA < 90 && currA > 270) ||
      (prevB > 270 && currB < 90) ||
      (prevB < 90 && currB > 270)
    );
  }

  update() {
    const prevAAngle = this.runnerA.updatePosition();
    const prevBAngle = this.runnerB.updatePosition();

    this.runnerA.checkLapCompletion(prevAAngle);
    this.runnerB.checkLapCompletion(prevBAngle);

    if (this.runnerA.positionAngle === this.runnerB.positionAngle) {
      this.isHold = true;
      return;
    }

    if (this.isHold) {
      this.isHold = false;
      const currentAAhead =
        this.runnerA.positionAngle > this.runnerB.positionAngle;
      if (this.aAhead !== currentAAhead) {
        this.crossCount++;
      }
      this.aAhead = currentAAhead;
      return;
    }

    if (
      this.checkBoundaryCross(
        prevAAngle,
        prevBAngle,
        this.runnerA.positionAngle,
        this.runnerB.positionAngle
      )
    ) {
      this.aAhead = this.runnerA.positionAngle > this.runnerB.positionAngle;
    } else {
      const currentAAhead =
        this.runnerA.positionAngle > this.runnerB.positionAngle;
      if (!this.isFirstUpdate && this.aAhead !== currentAAhead) {
        this.crossCount++;
      }
      this.aAhead = currentAAhead;
    }

    this.isFirstUpdate = false;
  }

  get isFinished() {
    return this.runnerA.finished && this.runnerB.finished;
  }
}
