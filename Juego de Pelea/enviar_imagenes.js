document.addEventListener('DOMContentLoaded', function () {
    const imgHeroCarousel = new bootstrap.Carousel(document.getElementById('img-hero'));
    const imgEnemyCarousel = new bootstrap.Carousel(document.getElementById('img-enemy'));

    // Mantener el índice actual de los carouseles
    let selectedHeroIndex = 0;
    let selectedEnemyIndex = 0;

    // Actualizar los índices cuando cambie el carrusel
    imgHeroCarousel._element.addEventListener('slid.bs.carousel', function () {
        selectedHeroIndex = imgHeroCarousel._activeIndex;
    });

    imgEnemyCarousel._element.addEventListener('slid.bs.carousel', function () {
        selectedEnemyIndex = imgEnemyCarousel._activeIndex;
    });

    const selectButton = document.getElementById('selectImages');
    selectButton.addEventListener('click', function () {
        const selectedHeroImage = document.querySelector('#img-hero .carousel-item.active img');
        const selectedEnemyImage = document.querySelector('#img-enemy .carousel-item.active img');

        // Aquí puedes manejar la lógica para enviar las imágenes seleccionadas a otra página
        // Vamos a enviar las URLs de las imágenes como parámetros de URL

        const params = new URLSearchParams();
        params.append('heroImage', selectedHeroImage.src);
        params.append('enemyImage', selectedEnemyImage.src);

        // Redirigir a la otra página con los parámetros de URL
        window.location.href = 'index.html?' + params.toString();
    });
});
