const canvas = document.getElementById("knn-animation");
const ctx = canvas.getContext("2d");

let w, h;
function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

const nodes = [];
const nodeCount = 70;

for (let i = 0; i < nodeCount; i++) {
  nodes.push({
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.45,
    vy: (Math.random() - 0.5) * 0.45
  });
}

function draw() {
  ctx.clearRect(0, 0, w, h);

  // glowing nodes
  nodes.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255,255,255,0.85)";
    ctx.shadowColor = "#69b7ff";
    ctx.shadowBlur = 12;
    ctx.fill();
  });

  // KNN connection lines
  nodes.forEach(p1 => {
    const nearest = nodes
      .map(p2 => ({ p2, dist: (p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2 }))
      .sort((a, b) => a.dist - b.dist)
      .slice(1, 4);

    nearest.forEach(({ p2 }) => {
      ctx.beginPath();
      ctx.strokeStyle = "rgba(143, 206, 255, 0.60)";
      ctx.lineWidth = 1.25;
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();
    });
  });

  // motion
  nodes.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0 || p.x > w) p.vx *= -1;
    if (p.y < 0 || p.y > h) p.vy *= -1;
  });

  requestAnimationFrame(draw);
}
draw();
