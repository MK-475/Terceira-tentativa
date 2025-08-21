const sky = document.querySelector('.sky');

const phrases = [
  "Te Amo", "My love", "Eres preciosa", "Me encantas",
  "Amor da minha vida", "Meu tudo", "Eres mi sol", "Contigo siempre",
  "Meu gnominho", "Te quiero",
  "❤️","❤️","❤️","❤️",
  "❤️","❤️","❤️","❤️",
  "❤️","❤️","❤️","❤️",
  "❤️","❤️","❤️","❤️",
  "❤️","❤️","❤️","❤️",
  "❤️","❤️","❤️","❤️"
];

const images = [
  "./imag-8/imag-1.jpg", "./imag-8/imag-2.jpg", "./imag-8/imag-3.jpg",
  "./imag-8/imag-4.jpg", "./imag-8/imag-5.jpg", "./imag-8/imag-6.jpg",
  "./imag-8/imag-7.jpg", "./imag-8/imag-8.jpg", "./imag-8/imag-9.jpg",
  "./imag-8/imag-10.jpg", "./imag-8/imag-11.jpg", "./imag-8/imag-12.jpg",
  "./imag-8/imag-13.jpg", "./imag-8/imag-14.jpg"
];

class TunnelObject {
  constructor(element) {
    this.el = element;
    this.x = (Math.random() - 0.5) * window.innerWidth;
    this.y = (Math.random() - 0.5) * window.innerHeight;
    this.z = Math.random() * 1000 + 500;
    this.speed = Math.random() * 5 + 2;
    this.el.style.transform = `translate3d(${this.x}px, ${this.y}px, ${this.z}px) scale(${1 - this.z / 1500})`;
    this.el.style.opacity = 0;
    sky.appendChild(this.el);
  }

  update() {
    this.z -= this.speed;
    if (this.z < 1) {
      this.z = Math.random() * 1000 + 500;
      this.x = (Math.random() - 0.5) * window.innerWidth;
      this.y = (Math.random() - 0.5) * window.innerHeight;
    }
    const scale = 1 - this.z / 1500;
    this.el.style.transform = `translate3d(${this.x * scale}px, ${this.y * scale}px, 0) scale(${scale})`;
    this.el.style.opacity = Math.min(1, scale * 2);
  }
}

const tunnelObjects = [];

// Criar uma estrela para cada frase/coração do array
phrases.forEach(phrase => {
  const star = document.createElement('span');
  star.className = 'star';
  star.textContent = phrase;
  tunnelObjects.push(new TunnelObject(star));
});

// Criar imagens
for (let i = 0; i < 10; i++) {
  const img = document.createElement('img');
  img.className = 'tunnel-image';
  img.src = images[Math.floor(Math.random() * images.length)];
  tunnelObjects.push(new TunnelObject(img));
}

// Animação
function animate() {
  requestAnimationFrame(animate);
  tunnelObjects.forEach(obj => obj.update());
}

animate();
