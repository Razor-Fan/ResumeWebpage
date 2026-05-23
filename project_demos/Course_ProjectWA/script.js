window.onload = function() {
    // Get Canvas and Drawing Tool
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");

    // Set initial canvas size
    let canvasWidth = canvas.parentElement.clientWidth;
    let canvasHeight = canvas.parentElement.clientHeight;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    // Get cursor position
    let coords = {};

    canvas.addEventListener("mousemove", function(e) {
        coords.x = e.offsetX;
        coords.y = e.offsetY
    });

    let particles = [];

    for (let i = 0; i < 100; i++) {
        particles.push({
            x: Math.random() * ((canvasWidth - 50) - 50) + 50, // x value
            y: Math.random() * ((canvasHeight - 50) - 50) + 50, // y value
            radius: (Math.random() * (50 - 10)) + 10, // radius min 10 max 50
            dx: (Math.random() - 0.5) * 10, // dx
            dy: (Math.random() - 0.5) * 10, // dy
            color: `hsl(${Math.random() * 360}, 70%, 50%)`
    });
    }

    // Stores original radiuses
    let particleRadius = []
    particles.forEach(p => {particleRadius.push(p.radius)});
    
    function draw() {
        // Cleans Canvas
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);

        particles.forEach(p => {
            // Starts Drawing
            ctx.beginPath();

            // Defines Circle
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);

            // Defines Color
            ctx.fillStyle = p.color;

            // Fill Circle
            ctx.fill();

            // Stops Drawing
            ctx.closePath();
        });

        
    };

    function update() {
        particles.forEach(p => {
            // Applies New Coordinates
            p.x += p.dx;
            p.y += p.dy;

            // Check for edge
            if (p.x + p.radius > canvasWidth || p.x - p.radius < 0) {
                p.dx *= -1;
            }

            if (p.y + p.radius > canvasHeight || p.y - p.radius < 0) {
                p.dy *= -1;
            }

            // Scales radius if cursor is close
            cursorCheck(p);
        });
    };

    // Checks if cursor is nearby and scales radius accordingly
    function cursorCheck(particle) {
        // distance before grow
        let threshold = 50

        // Distance Formula to determine distance between cursor and particle
        let distance = Math.sqrt(Math.pow((particle.x - coords.x), 2) + Math.pow((particle.y - coords.y), 2))
        
        // Scale particle radius if cursor is close enough
        if (distance < threshold) {
            particle.radius *= (1 + (1 -(distance / threshold)));
        }
    }

    // restore original radiuses
    function restore() {
        for (let i = 0; i < 100; i++) {
            particles[i].radius = particleRadius[i];
        }
    }

    function animate() {
        update();
        draw();
        restore();

        requestAnimationFrame(animate);
    };

    function resizeCanvas() {
        // update width
        canvasWidth = canvas.parentElement.clientWidth;
        canvas.width = canvasWidth;

        // update height
        canvasHeight = canvas.parentElement.clientHeight;
        canvas.height = canvasHeight
    };

    // Call function when window is resized
    window.addEventListener('resize', resizeCanvas);

    animate();
};