// Initialisation des animations
document.addEventListener('DOMContentLoaded', function() {
    // Initialiser AOS
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });
    
    // Animation GSAP pour la section hero
    gsap.from('.hero-title', {
        duration: 1,
        y: 50,
        opacity: 0,
        ease: 'power3.out'
    });
    
    gsap.from('.hero-subtitle', {
        duration: 1,
        y: 30,
        opacity: 0,
        delay: 0.3,
        ease: 'power3.out'
    });
    
    gsap.from('.cta-button', {
        duration: 1,
        y: 30,
        opacity: 0,
        delay: 0.6,
        ease: 'power3.out'
    });
    
    // Animation GSAP pour le formulaire de contact
    gsap.from('.contact-form', {
        scrollTrigger: {
            trigger: '.contact-form',
            start: 'top 80%'
        },
        duration: 1,
        x: -50,
        opacity: 0,
        ease: 'power3.out'
    });
    
    gsap.from('.social-links', {
        scrollTrigger: {
            trigger: '.social-links',
            start: 'top 80%'
        },
        duration: 1,
        x: 50,
        opacity: 0,
        ease: 'power3.out'
    });
    
    // Menu hamburger
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Lightbox améliorée pour le portfolio
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const lightbox = document.getElementById('portfolio-lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    const lightboxCounter = document.querySelector('.lightbox-counter');
    
    let currentImageIndex = 0;
    let images = [];
    
    // Préparer les données des images
    if (portfolioItems.length > 0) {
        portfolioItems.forEach((item, index) => {
            const imgSrc = item.querySelector('img').src;
            const title = item.querySelector('h3').textContent;
            const description = item.querySelector('p').textContent;
            
            images.push({
                src: imgSrc,
                title: title,
                description: description,
                index: index
            });
            
            // Ajouter un attribut data-index pour référence
            item.setAttribute('data-index', index);
            
            // Événements de clic sur les éléments du portfolio
            item.addEventListener('click', function() {
                const index = this.getAttribute('data-index');
                lightbox.style.display = 'flex';
                setTimeout(() => {
                    openLightbox(index);
                }, 10);
            });
        });
    }
    
    // Fonction pour ouvrir la lightbox
    function openLightbox(index) {
        currentImageIndex = parseInt(index);
        updateLightboxContent();
        lightbox.classList.add('show');
        document.body.style.overflow = 'hidden'; // Empêcher le défilement
    }
    
    // Fonction pour fermer la lightbox
    function closeLightbox() {
        lightbox.classList.remove('show');
        document.body.style.overflow = ''; // Rétablir le défilement
        
        // Réinitialiser après l'animation de fermeture
        setTimeout(() => {
            lightbox.style.display = 'none';
        }, 300);
    }
    
    // Fonction pour mettre à jour le contenu de la lightbox
    function updateLightboxContent() {
        const currentImage = images[currentImageIndex];
        
        // Afficher l'indicateur de chargement
        lightboxImg.style.display = 'none';
        lightboxCaption.style.display = 'none';
        
        const loadingIndicator = document.createElement('div');
        loadingIndicator.className = 'lightbox-loading';
        loadingIndicator.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        lightbox.appendChild(loadingIndicator);
        
        // Précharger l'image
        const img = new Image();
        img.onload = function() {
            lightboxImg.src = currentImage.src;
            lightboxCaption.innerHTML = `<strong>${currentImage.title}</strong> - ${currentImage.description}`;
            lightboxCounter.textContent = `${currentImageIndex + 1} / ${images.length}`;
            
            // Cacher l'indicateur de chargement et afficher l'image
            const loadingEl = document.querySelector('.lightbox-loading');
            if (loadingEl) {
                loadingEl.remove();
            }
            
            lightboxImg.style.display = 'block';
            lightboxCaption.style.display = 'block';
        };
        img.src = currentImage.src;
    }
    
    // Fonction pour naviguer vers l'image suivante
    function nextImage() {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        updateLightboxContent();
    }
    
    // Fonction pour naviguer vers l'image précédente
    function prevImage() {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        updateLightboxContent();
    }
    
    // Événements de la lightbox
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }
    
    if (lightboxNext) {
        lightboxNext.addEventListener('click', nextImage);
    }
    
    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', prevImage);
    }
    
    // Fermer la lightbox en cliquant à l'extérieur de l'image
    if (lightbox) {
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }
    
    // Navigation au clavier
    document.addEventListener('keydown', function(e) {
        if (lightbox && lightbox.classList.contains('show')) {
            switch(e.key) {
                case 'Escape':
                    closeLightbox();
                    break;
                case 'ArrowRight':
                    nextImage();
                    break;
                case 'ArrowLeft':
                    prevImage();
                    break;
            }
        }
    });
    
    // Navigation par glissement tactile (pour mobile)
    let touchStartX = 0;
    let touchEndX = 0;
    
    if (lightbox) {
        lightbox.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        }, false);
        
        lightbox.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, false);
    }
    
    function handleSwipe() {
        const minSwipeDistance = 50; // Distance minimale pour considérer un glissement
        
        if (touchEndX < touchStartX && touchStartX - touchEndX > minSwipeDistance) {
            nextImage(); // Glissement vers la gauche -> image suivante
        }
        
        if (touchEndX > touchStartX && touchEndX - touchStartX > minSwipeDistance) {
            prevImage(); // Glissement vers la droite -> image précédente
        }
    }
    
    // Validation du formulaire de contact
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validation basique
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            if (name && email && message) {
                // Construire l'URL mailto avec les données du formulaire
                const subject = encodeURIComponent('Message depuis le site web');
                const body = encodeURIComponent(`Nom: ${name}\nEmail: ${email}\nMessage:\n${message}`);
                const mailtoUrl = `mailto:gdevfullstck@gmail.com?subject=${subject}&body=${body}`;

                // Ouvrir le client de messagerie
                window.location.href = mailtoUrl;

                alert('Votre client de messagerie s\'ouvre avec le message pré-rempli. Envoyez-le pour me contacter !');
                contactForm.reset();
            } else {
                alert('Veuillez remplir tous les champs du formulaire.');
            }
        });
    }
    
    // Animation de la navbar au scroll
    let lastScrollY = window.scrollY;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (!navbar) return;
        
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.background = 'var(--white)';
            navbar.style.backdropFilter = 'none';
        }
        
        // Cacher/montrer la navbar au scroll
        if (window.scrollY > lastScrollY && window.scrollY > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollY = window.scrollY;
    });
});