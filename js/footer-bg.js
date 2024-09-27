document.addEventListener('DOMContentLoaded', () => {
    const movingBgCanvas = document.getElementById('moving-bg');
    const ctx = movingBgCanvas.getContext('2d');

    let width, height;

    function resize() {
        const contactSection = document.querySelector('.contact');
        width = movingBgCanvas.width = contactSection.offsetWidth;
        height = movingBgCanvas.height = contactSection.offsetHeight;
    }

    function drawWater() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'; // Very dark background
        ctx.fillRect(0, 0, width, height);

        for (let x = 0; x < width; x += 20) {
            for (let y = 0; y < height; y += 20) {
                let distX = Math.abs(x - width / 2);
                let distY = Math.abs(y - height / 2);
                let dist = Math.sqrt(distX * distX + distY * distY);
                let size = Math.sin(dist * 0.01 + Date.now() * 0.003) * 2 + 2;
                let brightness = Math.sin(dist * 0.01 + Date.now() * 0.002) * 20 + 35; // Darker color
                ctx.fillStyle = `rgba(${brightness}, ${brightness}, ${brightness}, 0.1)`; // Reduced opacity
                ctx.beginPath();
                ctx.arc(x, y, size, 0, Math.PI * 2);
                ctx.fill();
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        drawWater();
        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', resize);

    resize();
    animate();
});