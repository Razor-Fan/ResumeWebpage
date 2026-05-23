window.onload = function() {
    // Get Canvas + Drawing + Image
    const canvas = document.getElementById("animationCanvas");
    const ctx = canvas.getContext("2d");
    const image = document.getElementById("canvasImage");

    // Get Initial Canvas Size
    let canvasWidth = canvas.parentElement.clientWidth;
    let canvasHeight = 200;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    let varesaBall = {
        x: canvasWidth / 2,
        y: canvasHeight / 2,
        radius: 50,
        dx: 10
    };

    function draw() {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);

        // Begin Drawing
        ctx.beginPath();
        
        // Draw Image
        ctx.drawImage(image, varesaBall.x - varesaBall.radius , varesaBall.y - varesaBall.radius, 100, 100);

        // Stop Drawing
        ctx.closePath();
    };

    function update() {
        varesaBall.x += varesaBall.dx;

        if (varesaBall.x + varesaBall.radius > canvasWidth || varesaBall.x - varesaBall.radius < 0) {
            varesaBall.dx *= -1;
        };
    };

    function animate() {
        update();
        draw();

        requestAnimationFrame(animate);
    };

    function resizeCanvas() {
        canvasWidth = canvas.parentElement.clientWidth;
        canvas.width = canvasWidth;

        canvasHeight = canvas.parentElement.clientHeight;
        canvas.height = canvasHeight;

        varesaBall.y = canvasHeight / 2;
    };

    window.addEventListener('resize', resizeCanvas);

    animate();
};