const canvas = document.getElementById('smokeCanvas');
const ctx = canvas.getContext('2d');
let particles = [];
let mouse = { x: -1000, y: -1000, force: 0 };

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function createParticles() {
    const particleCount = 1000;
    particles = [];
    for (let i = 0; i < particleCount; i++) {
        particles.push(createParticle(true));
    }
}

function createParticle(isInitial = false) {
    // Adjust particle size based on screen width
    const sizeMultiplier = Math.min(1, window.innerWidth / 1000);
    return {
        x: Math.random() * canvas.width,
        y: isInitial ? Math.random() * canvas.height : canvas.height + Math.random() * 400,
        radius: (Math.random() * 2 + 0.5) * sizeMultiplier,
        speed: Math.random() * 0.4 + 0.2,
        opacity: Math.random() * 0.6 + 0.4,
    };
}

function drawSmoke() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#111';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle, index) => {
        ctx.beginPath();
        ctx.fillStyle = `rgba(180, 180, 180, ${particle.opacity})`;
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fill();

        // Normal movement
        particle.y -= particle.speed;

        // Mouse interaction
        const dx = mouse.x - particle.x;
        const dy = mouse.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const interactionRadius = 150;
        if (distance < interactionRadius) {
            const angle = Math.atan2(dy, dx);
            const force = (interactionRadius - distance) / interactionRadius * mouse.force;
            particle.x -= Math.cos(angle) * force * 10;
            particle.y -= Math.sin(angle) * force * 10;
        }

        // Fade particles closer to the top
        const fadeStart = canvas.height * 0.2;
        if (particle.y < fadeStart) {
            const fadeRatio = particle.y / fadeStart;
            particle.opacity = Math.min(particle.opacity, fadeRatio * 0.6);
        }

        // Reset particles
        if (particle.y < 0 || particle.opacity <= 0) {
            particles[index] = createParticle();
        }

        particle.opacity -= 0.0005;
    });

    // Gradually reduce mouse force
    mouse.force *= 0.95;

    requestAnimationFrame(drawSmoke);
}

function init() {
    resizeCanvas();
    createParticles();
    drawSmoke();
}

window.addEventListener('resize', () => {
    resizeCanvas();
    createParticles();
});

document.addEventListener('mousemove', (event) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = event.clientX - rect.left;
    mouse.y = event.clientY - rect.top;
    mouse.force = 1;
});

canvas.addEventListener('touchstart', handleTouch);
canvas.addEventListener('touchmove', handleTouch);
canvas.addEventListener('touchend', () => {
    mouse.x = -1000;
    mouse.y = -1000;
});

function handleTouch(event) {
    event.preventDefault();
    const rect = canvas.getBoundingClientRect();
    const touch = event.touches[0];
    mouse.x = touch.clientX - rect.left;
    mouse.y = touch.clientY - rect.top;
    mouse.force = 1;
}

init();