//======================================start aside======================================
let servicesOpen = false; // Variável para controlar o estado dos serviços

document.getElementById('showServices').addEventListener('click', function(event) {
    event.preventDefault();
    // Ocultar o conteúdo principal
    document.getElementById('serviceCardContent').classList.add('hidden_service');
    // Exibir os serviços
    document.getElementById('nav__services').classList.remove('hidden_service'); // Corrigido o ID
    document.getElementById('closeBtn').classList.remove('hidden_service');
    servicesOpen = true; // Marcar como aberto
});

document.getElementById('closeBtn').addEventListener('click', function(event) {
    event.preventDefault();
    // Ocultar os serviços
    document.getElementById('nav__services').classList.add('hidden_service'); // Corrigido o ID
    document.getElementById('closeBtn').classList.add('hidden_service');
    // Mostrar novamente o conteúdo principal
    document.getElementById('serviceCardContent').classList.remove('hidden_service');
    servicesOpen = false; // Marcar como fechado
});

// Adicionar um evento para fechar os serviços se clicar fora
document.addEventListener('click', function(event) {
    const navServices = document.getElementById('nav__services');
    const serviceCardContent = document.getElementById('serviceCardContent');
    
    // Verifica se o clique foi fora da área de serviços e não no botão "Mostrar Serviços"
    if (servicesOpen && !navServices.contains(event.target) && !event.target.matches('#showServices') && !serviceCardContent.contains(event.target)) {
        document.getElementById('nav__services').classList.add('hidden_service'); // Corrigido o ID
        document.getElementById('closeBtn').classList.add('hidden_service');
        // Mostrar novamente o conteúdo principal
        document.getElementById('serviceCardContent').classList.remove('hidden_service');
        servicesOpen = false; // Marcar como fechado
    }
});
//=======================================end aside=======================================
//=================================== start team slide ==================================
const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const dots = document.querySelectorAll('.dot');
const sliderContainer = document.querySelector('.slider-container');

let currentIndex = 0; // Tracks the current slide index
let autoSlideInterval; // Will hold the interval ID for auto-sliding

// Function to update the active dot indicator
function updateDots() {
    dots.forEach((dot, index) => {
        if (index === currentIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// Function to display a specific slide based on the index
function showSlides(index) {
    if (index >= slides.length) {
        currentIndex = 0; // Reset to first slide if at the end
    } else if (index < 0) {
        currentIndex = slides.length - 1; // Go to last slide if at the beginning
    } else {
        currentIndex = index; // Otherwise, set to the provided index
    }
    slider.style.transform = `translateX(-${currentIndex * 100}%)`; // Slide transition
    updateDots(); // Update the dots to reflect the current slide
}

// Function to move to the next slide
function nextSlide() {
    showSlides(currentIndex + 1);
}

// Function to move to the previous slide
function prevSlide() {
    showSlides(currentIndex - 1);
}

// Start the automatic sliding of images
function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 4000); // Slide every 4 seconds
}

// Stop the automatic sliding
function stopAutoSlide() {
    clearInterval(autoSlideInterval); // Clear the interval
}

// Add click event listeners to dots for direct slide navigation
dots.forEach(dot => {
    dot.addEventListener('click', () => {
        stopAutoSlide(); // Stop auto-slide when manually selecting a slide
        showSlides(parseInt(dot.dataset.index)); // Show the selected slide
        startAutoSlide(); // Restart auto-slide
    });
});

// Add event listeners for navigation buttons
nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

// Stop auto-slide when the mouse enters the slider container
sliderContainer.addEventListener('mouseover', stopAutoSlide);

// Restart auto-slide when the mouse leaves the slider container
sliderContainer.addEventListener('mouseout', startAutoSlide);

// Start auto-slide when the page loads
startAutoSlide();
updateDots(); // Initialize the dots


//--------------------------------------------------------------
// Função para abrir/fechar informações da equipe
// Função para gerenciar o hover e cliques
function manageTeamInfo() {
    const overlayTeams = document.querySelectorAll('.overlay__team');

    overlayTeams.forEach(overlay => {
        const title = overlay.querySelector('.name__title');
        const experties = overlay.querySelector('.experties');
        const infoButton = overlay.previousElementSibling; // O elemento .info

        // Hover
        overlay.addEventListener('mouseenter', () => {
            if (window.innerWidth > 501) { // Apenas para telas maiores
                title.style.display = 'block';
                experties.style.display = 'block';
            }
        });

        overlay.addEventListener('mouseleave', () => {
            if (window.innerWidth > 501) { // Apenas para telas maiores
                if (!infoButton.classList.contains('active')) {
                    title.style.display = 'none';
                    experties.style.display = 'none';
                }
            }
        });

        // Clique no botão .info
        infoButton.addEventListener('click', () => {
            if (title.classList.contains('active')) {
                title.classList.remove('active');
                experties.classList.remove('active');
                title.style.display = 'none';
                experties.style.display = 'none';
            } else {
                title.classList.add('active');
                experties.classList.add('active');
                title.style.display = 'block';
                experties.style.display = 'block';
            }
        });
    });
}

// Função para aplicar as regras das media queries
function applyMediaQueryStyles() {
    const overlayTeams = document.querySelectorAll('.overlay__team');

    overlayTeams.forEach(overlay => {
        const title = overlay.querySelector('.name__title');
        const experties = overlay.querySelector('.experties');

        if (window.innerWidth < 500) {
            title.style.display = 'none';
            experties.style.display = 'none';
        } else if (window.innerWidth > 501) {
            const infoButton = overlay.previousElementSibling; // O elemento .info
            infoButton.style.display = 'none'; // Esconde o botão .info
            title.style.display = 'none'; // Esconde título e experties
            experties.style.display = 'none';
        }
    });
}

// Chama as funções quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    manageTeamInfo();
    applyMediaQueryStyles();

    // Adiciona um listener para mudanças de tamanho da tela
    window.addEventListener('resize', () => {
        applyMediaQueryStyles();
    });
});

//==================================== end team slide ===================================
//================================== start scroll brand =================================

const scrollers = document.querySelectorAll(".brands__carousel");

// If a user hasn't opted in for recuded motion, then we add the animation
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  addAnimation();
}


function addAnimation() {
  scrollers.forEach((scroller) => { //scroller
    // add data-animated="true" to every `.brands__carousel` on the page
    scroller.setAttribute("data-animated", true);

    // Make an array from the elements within `.brands__wraper`
    const scrollerInner = scroller.querySelector(".brands__wraper");
    const scrollerContent = Array.from(scrollerInner.children);
    
    scrollerContent.forEach((item) => {
      const duplicatedItem = item.cloneNode(true);
      duplicatedItem.setAttribute("aria-hidden", true);
      scrollerInner.appendChild(duplicatedItem);
    });
  });
}
//================================== end scroll brand  =================================