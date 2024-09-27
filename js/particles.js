const canvas = document.getElementById('smokeCanvas');
const ctx = canvas.getContext('2d');
let particles = [];
let mouse = { x: 0, y: 0 };

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
    return {
        x: Math.random() * canvas.width,
        y: isInitial ? Math.random() * canvas.height : canvas.height + Math.random() * 400,
        radius: Math.random() * 2 + 0.5,
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
            const force = (interactionRadius - distance) / interactionRadius;
            particle.x -= Math.cos(angle) * force * 10;
            particle.y -= Math.sin(angle) * force * 10;
        }

        // Fade particles closer to the top
        const fadeStart = canvas.height * 0.2; // Start fading at 20% from the top
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
});

init();