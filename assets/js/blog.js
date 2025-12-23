const canvas = document.getElementById("blog-bg");
const ctx = canvas.getContext("2d");

let w, h;
function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight * 0.52;
}
resize();
window.addEventListener("resize", resize);

// points
const pts = [];
const N = 70;
for (let i = 0; i < N; i++) {
  pts.push({
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.35,
    vy: (Math.random() - 0.5) * 0.35
  });
}

function draw() {
  ctx.clearRect(0, 0, w, h);

  // draw points
  ctx.fillStyle = "#d4ebff";
  pts.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, 2.4, 0, Math.PI * 2);
    ctx.fill();
  });

  // ✓ KNN connections (each node -> nearest 4 neighbors)
  pts.forEach((p1, i) => {
    const distances = pts.map((p2, j) => ({
      j,
      d: (p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2
    }));
    distances.sort((a, b) => a.d - b.d);
    const neighbors = distances.slice(1, 5); // k = 4

    neighbors.forEach(({ j }) => {
      const p2 = pts[j];
      ctx.strokeStyle = "rgba(255, 255, 255, 0.75)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();
    });
  });

  // movement physics
  pts.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0 || p.x > w) p.vx *= -1;
    if (p.y < 0 || p.y > h) p.vy *= -1;
  });

  requestAnimationFrame(draw);
}
draw();

// Scroll reveal for blog cards
const cards = document.querySelectorAll(".blog-card");
function revealCards() {
  cards.forEach(card => {
    const rect = card.getBoundingClientRect();
    if (rect.top < window.innerHeight - 90) {
      card.classList.add("visible");
    }
  });
}
window.addEventListener("scroll", revealCards);
revealCards();
