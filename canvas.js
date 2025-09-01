const COLORS = ["255,108,80", "5,117,18", "29,39,57", "67,189,81"];
const BUBBLE_DENSITY = 100;

function generateDecimalBetween(left, right) {
  return (Math.random() * (left - right) + right).toFixed(2);
}
class Bubble {
  constructor(canvas) {
    this.canvas = canvas;
    this.getCanvasSize();
    this.init();
  }

  getCanvasSize() {
    this.canvasWidth = this.canvas.clientWidth;
    this.canvasHeight = this.canvas.clientHeight;
  }
  init() {
    const index = Math.floor(Math.random() * COLORS.length);
    this.color = COLORS[index];
    this.size = Math.floor(Math.random() * 3 + 1);
    this.alpha = Math.floor(Math.random() * 6 + 5) / 10;
    this.translateX = Math.random() * this.canvasWidth;
    this.translateY = Math.random() * this.canvasHeight;
    this.velocity = generateDecimalBetween(20, 40);
    this.movementX = generateDecimalBetween(-2, 2) / this.velocity;
    this.movementY = generateDecimalBetween(1, 20) / this.velocity;
  }
  move() {
    this.translateX = this.translateX - this.movementX;
    this.translateY = this.translateY - this.movementY;
    if (
      this.translateY < 0 ||
      this.translateX < 0 ||
      this.translateX > this.canvasWidth
    ) {
      this.init();
      this.translateY = this.canvasHeight;
    }
  }
}
class CanvasBackground {
  constructor(id) {
    this.canvas = document.getElementById(id);
    this.ctx = this.canvas.getContext("2d");
    this.dpr = window.devicePixelRatio;
  }
  canvasSize() {
    this.canvas.width = this.canvas.offsetWidth * this.dpr;
    this.canvas.height = this.canvas.offsetHeight * this.dpr;
    this.ctx = this.canvas.getContext("2d");
    this.ctx.scale(this.dpr, this.dpr);
  }
  generateBubbles() {
    this.bubblesList = [];
    for (let i = 0; i < BUBBLE_DENSITY; i++) {
      this.bubblesList.push(new Bubble(this.canvas));
    }
  }

  animate() {
    // 1) Учитываем devicePixelRatio (и одновременно сбрасываем любые прошлые трансформации)
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);

    // 2) Чистим весь холст в "CSS-пикселях"
    this.ctx.clearRect(0, 0, this.canvas.clientWidth, this.canvas.clientHeight);

    // 3) Обновляем позицию и рисуем каждый пузырёк
    this.bubblesList.forEach((bubble) => {
      bubble.move();

      // переносим систему координат в позицию пузырька
      this.ctx.save();
      this.ctx.translate(bubble.translateX, bubble.translateY);

      // начинаем новый путь и рисуем кружок в центре (0,0)
      this.ctx.beginPath();
      this.ctx.arc(0, 0, bubble.size, 0, Math.PI * 2);

      // цвет: bubble.color = "r,g,b", alpha = bubble.alpha
      this.ctx.fillStyle = `rgba(${bubble.color}, ${bubble.alpha})`;
      this.ctx.fill();

      // возвращаемся к исходной системе координат
      this.ctx.restore();
    });

    // 4) Следующий кадр
    requestAnimationFrame(this.animate.bind(this));
  }
  start() {
    this.canvasSize();
    this.generateBubbles();
    this.animate();
  }
}
const background = new CanvasBackground("orb-canvas");
background.start();
