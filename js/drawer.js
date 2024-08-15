class Drawer {
  constructor(ctx, config) {
    this.ctx = ctx;
    this.config = config;
  }

  calculatePosition(centerX, centerY, radius, angle) {
    const x = centerX + radius * Math.cos((angle * Math.PI) / 180);
    const y = centerY - radius * Math.sin((angle * Math.PI) / 180);
    return { x: Math.round(x), y: Math.round(y) };
  }

  clearCanvas() {
    this.ctx.fillStyle = this.config.BACKGROUND_COLOR;
    this.ctx.fillRect(0, 0, this.config.WIDTH, this.config.HEIGHT);
  }

  drawGround() {
    const centerX = this.config.WIDTH / 2;
    const centerY = this.config.HEIGHT / 2;

    this.ctx.beginPath();
    this.ctx.arc(centerX, centerY, this.config.GROUND_RADIUS, 0, 2 * Math.PI);
    this.ctx.fillStyle = this.config.GROUND_COLOR;
    this.ctx.fill();
    this.ctx.strokeStyle = this.config.TEXT_COLOR;
    this.ctx.lineWidth = 2;
    this.ctx.stroke();

    const startLineStart = this.calculatePosition(
      centerX,
      centerY,
      this.config.GROUND_RADIUS - 40,
      270
    );
    const startLineEnd = this.calculatePosition(
      centerX,
      centerY,
      this.config.GROUND_RADIUS + 40,
      270
    );
    this.ctx.beginPath();
    this.ctx.moveTo(startLineStart.x, startLineStart.y);
    this.ctx.lineTo(startLineEnd.x, startLineEnd.y);
    this.ctx.strokeStyle = this.config.START_LINE_COLOR;
    this.ctx.lineWidth = 4;
    this.ctx.stroke();
  }

  drawRunner(runner) {
    const centerX = this.config.WIDTH / 2;
    const centerY = this.config.HEIGHT / 2;
    const position = this.calculatePosition(
      centerX,
      centerY,
      this.config.GROUND_RADIUS,
      runner.positionAngle
    );

    this.ctx.beginPath();
    this.ctx.arc(
      position.x,
      position.y,
      this.config.PERSON_RADIUS,
      0,
      2 * Math.PI
    );
    this.ctx.fillStyle = runner.color;
    this.ctx.fill();
  }

  drawStats(simulation) {
    const centerX = this.config.WIDTH / 2;
    const centerY = this.config.HEIGHT / 2;

    const fontFamily =
      '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif';
    this.ctx.font = `bold 38px ${fontFamily}`;

    this.ctx.fillStyle = simulation.runnerA.color;
    const runnerAText = `Runner A :  ${simulation.runnerA.laps} / ${simulation.runnerA.targetLaps}`;
    const runnerATextWidth = this.ctx.measureText(runnerAText).width;
    this.ctx.fillText(
      runnerAText,
      centerX - runnerATextWidth / 2,
      centerY - 80
    );

    this.ctx.fillStyle = simulation.runnerB.color;
    const runnerBText = `Runner B :  ${simulation.runnerB.laps} / ${simulation.runnerB.targetLaps}`;
    const runnerBTextWidth = this.ctx.measureText(runnerBText).width;
    this.ctx.fillText(runnerBText, centerX - runnerBTextWidth / 2, centerY);

    this.ctx.fillStyle = this.config.TEXT_COLOR;
    const crossText = `Crosses: ${simulation.crossCount}`;
    const crossTextWidth = this.ctx.measureText(crossText).width;
    this.ctx.fillText(crossText, centerX - crossTextWidth / 2, centerY + 80);

    if (simulation.isFinished) {
      const doneText = "Done!";
      const doneTextWidth = this.ctx.measureText(doneText).width;
      this.ctx.fillText(doneText, centerX - doneTextWidth / 2, centerY + 160);
    }
  }

  draw(simulation) {
    this.clearCanvas();
    this.drawGround();
    this.drawRunner(simulation.runnerA);
    this.drawRunner(simulation.runnerB);
    this.drawStats(simulation);
  }
}
