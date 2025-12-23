const canvas = document.getElementById("about-bg");
const ctx = canvas.getContext("2d");

let w, h;
function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight * 0.52; // Responsive hero height
}
resize();
window.addEventListener("resize", resize);

// Cluster colors (SmartKNN vibe)
const clusterColors = ["#4da6ff", "#2ecc71", "#e67e22", "#9b59b6", "#e84393"];

const pts = [];
const clusters = 5;
const perCluster = 15;

for (let c = 0; c < clusters; c++) {
  const cx = Math.random() * w;
  const cy = Math.random() * h;

  for (let i = 0; i < perCluster; i++) {
    pts.push({
      x: cx + (Math.random() - 0.5) * 120,
      y: cy + (Math.random() - 0.5) * 120,
      vx: (Math.random() - 0.5) * 0.28,
      vy: (Math.random() - 0.5) * 0.28,
      color: clusterColors[c]
    });
  }
}

function draw() {
  ctx.clearRect(0, 0, w, h);

  // Draw nodes
  pts.forEach(p => {
    ctx.beginPath();
    ctx.fillStyle = p.color;
    ctx.arc(p.x, p.y, 2.8, 0, Math.PI * 2);
    ctx.fill();
  });

  // Draw SmartKNN-like connections
  pts.forEach(p1 => {
    const nearest = pts
      .map(p2 => ({ p2, dist: (p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2 }))
      .sort((a, b) => a.dist - b.dist)
      .slice(1, 4); // closest 3 neighbours

    nearest.forEach(({ p2 }) => {
      ctx.beginPath();
      ctx.strokeStyle = "rgba(255, 255, 255, 0.55)";
      ctx.lineWidth = 1;
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();
    });
  });

  // Update movement
  pts.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 0 || p.x > w) p.vx *= -1;
    if (p.y < 0 || p.y > h) p.vy *= -1;
  });

  requestAnimationFrame(draw);
}
draw();

// Reveal sections on scroll
const blocks = document.querySelectorAll(".section-block");
function reveal() {
  blocks.forEach(b => {
    const rect = b.getBoundingClientRect();
    if (rect.top < window.innerHeight - 90) {
      b.classList.add("visible");
    }
  });
}
window.addEventListener("scroll", reveal);
reveal();
