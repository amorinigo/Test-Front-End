const Slider = () => {

    const swiper = new Swiper('.swiper', {
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        }
    });
      

};

export default Slider;