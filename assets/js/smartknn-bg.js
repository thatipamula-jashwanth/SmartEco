const canvas = document.getElementById("smartknn-bg");
const ctx = canvas.getContext("2d");

let W, H;
function resize() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

// Particle cluster generation
const nodes = [];
const total = 85;
const speed = 0.35;

for (let i = 0; i < total; i++) {
  nodes.push({
    x: Math.random() * W,
    y: Math.random() * H,
    vx: (Math.random() - 0.5) * speed,
    vy: (Math.random() - 0.5) * speed,
  });
}

// Weighted KNN — connecting nearest neighbours
function draw() {
  ctx.fillStyle = "#007bff"; // gradient base blend
  ctx.fillRect(0, 0, W, H);

  // Fade blue gradient overlay for SmartEco look
  const grd = ctx.createLinearGradient(0, 0, W, H);
  grd.addColorStop(0, "rgba(0,123,255,0.40)");
  grd.addColorStop(1, "rgba(105,183,255,0.40)");
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, W, H);

  // Draw nodes
  nodes.forEach(p => {
    ctx.fillStyle = "#d9ecff"; // dot color
    ctx.beginPath();
    ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
    ctx.fill();
  });

  // Connect each node to nearest 4 neighbours
  nodes.forEach(p => {
    const nearest = nodes
      .map(n => ({ n, d: (n.x - p.x) ** 2 + (n.y - p.y) ** 2 }))
      .sort((a, b) => a.d - b.d)
      .slice(1, 4);

    nearest.forEach(({ n }) => {
      ctx.beginPath();
      ctx.strokeStyle = "rgba(153, 221, 255, 0.38)";
      ctx.lineWidth = 1.1;
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(n.x, n.y);
      ctx.stroke();
    });
  });

  // Move nodes
  nodes.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 0 || p.x > W) p.vx *= -1;
    if (p.y < 0 || p.y > H) p.vy *= -1;
  });

  requestAnimationFrame(draw);
}

draw();


async function fetchPyPIDownloads() {
  const el = document.getElementById("pypi-download-count");
  if (!el) return;

  try {
    const res = await fetch("https://img.shields.io/pypi/dm/smart-knn.json");
    const data = await res.json();
    const count = data.value;

    el.textContent = ` Downloads - ${count.toLocaleString()}`;
  } catch (e) {
    el.textContent = "Downloads: unavailable";
  }
}
fetchPyPIDownloads();
