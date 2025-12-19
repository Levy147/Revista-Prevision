// Navegación activa
const navItems = document.querySelectorAll('.nav-item');
const sections = document.querySelectorAll('section, article');

// Observador para detectar sección activa
const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.id;
            
            // Actualizar navegación
            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href') === `#${id}` || 
                    item.getAttribute('data-section') === id) {
                    item.classList.add('active');
                }
            });
        }
    });
}, observerOptions);

sections.forEach(section => {
    observer.observe(section);
});

// Botón volver arriba
const btnTop = document.getElementById('btnTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        btnTop.classList.add('visible');
    } else {
        btnTop.classList.remove('visible');
    }
});

btnTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Smooth scroll para enlaces del índice
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animación al hacer scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.articulo, .regla-item, .paso, .aplicacion-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
};

// Inicializar animaciones
window.addEventListener('load', animateOnScroll);

// Efecto parallax suave en la portada
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const portada = document.querySelector('.portada');
    if (portada && scrolled < window.innerHeight) {
        portada.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Resaltar texto al pasar el mouse en artículos
const articulos = document.querySelectorAll('.texto-articulo p');
articulos.forEach(p => {
    p.addEventListener('mouseenter', function() {
        this.style.backgroundColor = 'rgba(52, 152, 219, 0.1)';
        this.style.transition = 'background-color 0.3s ease';
    });
    
    p.addEventListener('mouseleave', function() {
        this.style.backgroundColor = 'transparent';
    });
});

// Contador de progreso de lectura (opcional)
const createReadingProgress = () => {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 4px;
        background: linear-gradient(90deg, #667eea, #764ba2);
        width: 0%;
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
};

createReadingProgress();

