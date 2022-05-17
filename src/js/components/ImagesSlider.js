const ImagesSlider = () => {

    const swiper = new Swiper('.swiper.main-slider', {
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        }
    });

};

export default ImagesSlider;