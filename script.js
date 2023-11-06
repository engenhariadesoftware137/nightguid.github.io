document.addEventListener("DOMContentLoaded", function() {
    const destaquesContainer = document.querySelector(".destaques-content");
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const prevBtn = document.getElementById("prevHighlightBtn");
    const nextBtn = document.getElementById("nextHighlightBtn");
    const eventos = document.querySelectorAll('.evento-img');

    let currentIndex = 0;
    let interval;
    let modalOpen = false;

    function updateDestaque() {
        const destaque = destaquesData[currentIndex];
        modalImg.src = destaque.imgSrc;
        modalImg.alt = destaque.title;
        modalTitle.textContent = destaque.title;
        modalDescription.textContent = `${destaque.location} - ${destaque.description}`;

        // Limpa o conteúdo atual dos destaquesContainer
        destaquesContainer.innerHTML = '';

        // Adiciona o destaque atual ao destaquesContainer
        const destaqueDiv = document.createElement("div");
        destaqueDiv.classList.add("destaque");
        const destaqueImg = document.createElement("img");
        destaqueImg.src = destaque.imgSrc;
        destaqueImg.alt = destaque.title;
        destaqueImg.addEventListener("click", () => {
            modal.style.display = 'block';
            modalOpen = true;
        });
        destaqueDiv.appendChild(destaqueImg);
        destaquesContainer.appendChild(destaqueDiv);
    }

    function navigateDestaque(direction) {
        if (!modalOpen) {
            currentIndex = (currentIndex + direction + destaquesData.length) % destaquesData.length;
            updateDestaque();
        }
    }

    eventos.forEach(evento => {
        evento.addEventListener('click', function() {
            modal.style.display = 'block';
            modalImg.src = this.src;
            modalImg.alt = this.alt;
            modalTitle.textContent = this.getAttribute('data-title');
            modalDescription.textContent = this.getAttribute('data-description');
            modalOpen = true;
        });
    });

    // Array de destaques
    const destaquesData = [
        {
            imgSrc: "img/01.png",
            title: "Carnaval 2023",
            location: "Praia da Vila",
            description: "Venha curtir o Carnaval da vila 2023."
        },
        {
            imgSrc: "img/02.png",
            title: "Ze Neto e Cristiano",
            location: "Praça do Coração",
            description: "Venha curtir esse show inesquecível."
        },
        {
            imgSrc: "img/03.png",
            title: "Moto Rock",
            location: "Praça do Coração",
            description: "Motorock Saquarema 2023."
        }
    ];

    nextBtn.addEventListener("click", () => {
        navigateDestaque(1);
        clearInterval(interval); // Limpa o intervalo quando o usuário clicar manualmente
    });

    prevBtn.addEventListener("click", () => {
        navigateDestaque(-1);
        clearInterval(interval); // Limpa o intervalo quando o usuário clicar manualmente
    });

    modal.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            modalOpen = false;
        }
    };

    const closeModalBtn = document.getElementById('close-modal-btn');
    closeModalBtn.addEventListener('click', function() {
        modal.style.display = 'none';
        modalOpen = false;
    });

    // Inicializa a página com o primeiro destaque
    updateDestaque();

    // Atualiza o destaque a cada 2 segundos
    interval = setInterval(() => {
        navigateDestaque(1);
    }, 2000);
});