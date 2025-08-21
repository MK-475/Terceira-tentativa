const sky = document.querySelector('.sky');

// Detectar se é celular
const isMobile = window.innerWidth < 768;

const phrases = [
    "Te Amo", "My love", "Eres preciosa", "Me encantas",
    "Amor da minha vida", "Meu tudo", "Eres mi sol", "Contigo siempre",
    "Meu gnominho", "Te quiero",
    "❤️","❤️","❤️","❤️",
    "❤️","❤️","❤️","❤️"
];

const images = [
    "./imag-8/imag-1.jpg", "./imag-8/imag-2.jpg", "./imag-8/imag-3.jpg",
    "./imag-8/imag-4.jpg", "./imag-8/imag-5.jpg", "./imag-8/imag-6.jpg",
    "./imag-8/imag-7.jpg", "./imag-8/imag-8.jpg", "./imag-8/imag-9.jpg",
    "./imag-8/imag-10.jpg", "./imag-8/imag-11.jpg", "./imag-8/imag-12.jpg"
];

const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;

class TunnelObject {
    constructor(element) {
        this.el = element;
        this.reset();
        sky.appendChild(this.el);
    }

    reset() {
        this.x = (Math.random() - 0.5) * screenWidth;
        this.y = (Math.random() - 0.5) * screenHeight;
        this.z = Math.random() * 800 + 400; // profundidade menor
        this.speed = Math.random() * 3 + 1.5; // velocidade reduzida no mobile
        this.el.style.opacity = 0;
    }

    update() {
        this.z -= this.speed;
        if (this.z < 1) this.reset();

        const scale = 1 - this.z / 1000;
        this.el.style.transform = `translate3d(${this.x * scale}px, ${this.y * scale}px, 0) scale(${scale})`;
        this.el.style.opacity = Math.min(1, scale * 2);
    }
}

const tunnelObjects = [];

// Criar menos objetos no celular
const numPhrases = isMobile ? 10 : phrases.length;
const numImages = isMobile ? 4 : 10;

for (let i = 0; i < numPhrases; i++) {
    const star = document.createElement('span');
    star.className = 'star';
    star.textContent = phrases[i % phrases.length];
    tunnelObjects.push(new TunnelObject(star));
}

for (let i = 0; i < numImages; i++) {
    const img = document.createElement('img');
    img.className = 'tunnel-image';
    img.src = images[Math.floor(Math.random() * images.length)];
    tunnelObjects.push(new TunnelObject(img));
}

// Animação com limite de FPS
let lastTime = 0;
const fps = isMobile ? 30 : 60; // no mobile, 30 FPS para poupar recursos
const frameDuration = 1000 / fps;

function animate(timestamp) {
    if (timestamp - lastTime < frameDuration) {
        requestAnimationFrame(animate);
        return;
    }
    lastTime = timestamp;

    tunnelObjects.forEach(obj => obj.update());
    requestAnimationFrame(animate);
}
animate();
