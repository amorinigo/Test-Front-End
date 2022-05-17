import { updateMinicart } from "../common/navbar/Minicart";
import { resetText, toCapitalize, toBrReal, getProducts, getProductById, getProductsWithout } from "../utils/helpers";

const ProductsSlider = () => {

    const createProductsSlider = () => {

        const sliderCtn = document.querySelector( '.products-slider__swiper .swiper-wrapper' );

        getProducts()
            .then( products => {

                products.forEach( product => {

                    const { imageUrl, productName, stars, listPrice, price, installments, productId } = product;

                    sliderCtn.innerHTML += `
                        <div class="swiper-slide">
                            <div class="card">
                                <div class="card__top">
                                    <a class="card__thumbnail" href="#">
                                        <img src="${ imageUrl }" class="card__img" alt="${ toCapitalize(productName) }" />
                                        ${ listPrice ? '<span class="discount">Off</span>' : '' }
                                    </a>

                                    <div class="card__content">
                                        <h6 class="card__product-name">${ resetText(productName) }</h6>
                                        <span class="card__product-stars stars-${ stars }"></span>
                                        <div class="prices">
                                            ${
                                                listPrice ?
                                                `<span class="old-price">de ${ toBrReal(listPrice).replace('R', '') }</span>`: ''
                                            }
                                            <span class="final-price">por ${ toBrReal(price).replace('R', '') }</span>
                                        </div>
                                        ${
                                            installments.length > 0 ? 
                                            `
                                            <span class="installments">
                                                ou em ${installments[0].quantity}x de ${toBrReal(installments[0].value)}
                                            </span>
                                            ` : ''
                                        }
                                    </div>
                                </div>

                                <span class="card__button dark-button" data-productId="${ product.productId }">
                                    Comprar
                                </span>
                            </div>
                        </div>
                    `;
                    
                } );

                const swiper = new Swiper('.swiper.products-slider__swiper', {
                    pagination: {
                        el: '.products-swiper-pagination',
                        clickable: true
                    },
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    },
                    slidesPerView: 1,
                    spaceBetween: 30,
                    breakpoints: {
                        380: {
                        slidesPerView: 2,
                        },
                        600: {
                        slidesPerView: 3,
                        },
                        1100: {
                        slidesPerView: 4,
                        spaceBetween: 99
                        }
                    }
                });

                sliderCtn.parentElement.classList.add( 'finished' );
                handleBuyButtons();

            } )
            .catch( err => console.log( err ) );

    }

    try { createProductsSlider(); } catch (error) { console.log( error ); }

    const handleBuyButtons = () => {

        const buyButtons = Array.from( document.querySelectorAll( '.card span.card__button' ) );

        buyButtons.forEach( button => {
            button.addEventListener( 'click', e => runPurchase(e) );
        } );

        const addSpinner = ( element, add ) => {
            ( add )
                ? element.classList.add( 'loading' )
                : element.classList.remove( 'loading' );
        }

        const runPurchase = e => {

            const card = e.target.parentElement;
            const productId = e.target.dataset.productid;
            addSpinner( card, true );

            getProducts()
                .then( products => {
                    const product = getProductById( products, productId );
                    addProduct(product);
                    updateMinicart();
                    addSpinner( card, false );
                } )
                .catch( err => {
                    alert('Ha ocurrido un error.');
                    addSpinner( card, false );
                } );

        }

        const addProduct = product => {

            const { imageUrl, price, listPrice, productId, productName } = product;

            let purchasedProducts = JSON.parse( localStorage.getItem( 'purchasedProducts' ) ) || [];
            const productInStorage = getProductById( purchasedProducts, productId );
            purchasedProducts = getProductsWithout( purchasedProducts, productId );
            
            const newProduct = {
                imageUrl,
                price,
                listPrice,
                productId,
                productName,
                quantity: productInStorage ? (Number( productInStorage?.quantity ) + 1) : 1
            };
            
            purchasedProducts.push( newProduct );
            localStorage.setItem( 'purchasedProducts', JSON.stringify(purchasedProducts) );

        }
        
    }

};

export default ProductsSlider;