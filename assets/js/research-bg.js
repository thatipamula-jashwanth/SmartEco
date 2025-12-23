const canvas = document.getElementById("research-bg");
const ctx = canvas.getContext("2d");

let w, h;
function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight * 0.6; // hero height
}
resize();
window.addEventListener("resize", resize);

const points = [];
const total = 85;

for (let i = 0; i < total; i++) {
  points.push({
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.25,
    vy: (Math.random() - 0.5) * 0.25
  });
}

function draw() {
  ctx.clearRect(0, 0, w, h);

  // 🔥 Glowing white nodes (visible on blue)
  points.forEach(p => {
    ctx.beginPath();
    ctx.fillStyle = "rgba(255,255,255,0.92)";
    ctx.shadowBlur = 10;
    ctx.shadowColor = "rgba(255,255,255,0.9)";
    ctx.arc(p.x, p.y, 3.2, 0, Math.PI * 2);
    ctx.fill();
  });

  // 🔥 Soft blueprint connection lines
  ctx.shadowBlur = 0;
  ctx.lineWidth = 1.3;
  points.forEach(p1 => {
    points.forEach(p2 => {
      const dist = (p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2;
      if (dist < 11000) {
        ctx.strokeStyle = "rgba(255,255,255,0.30)";
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }
    });
  });

  // movement
  points.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0 || p.x > w) p.vx *= -1;
    if (p.y < 0 || p.y > h) p.vy *= -1;
  });

  requestAnimationFrame(draw);
}

draw();

// ✨ Fade-in animation for sections upon scroll
const sections = document.querySelectorAll(".section-block");
function revealOnScroll() {
  sections.forEach(sec => {
    const rect = sec.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      sec.classList.add("visible");
    }
  });
}
window.addEventListener("scroll", revealOnScroll);
revealOnScroll();
