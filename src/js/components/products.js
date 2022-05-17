import { updateMinicart } from "../common/minicart";
import { resetText, toCapitalize, toBrReal } from "../utils/helpers";

const Products = () => {

    const createCarrusel = () => {

        const sliderCtn = document.querySelector( '.products-slider__swiper .swiper-wrapper' );
        const url = 'https://corebiz-test.herokuapp.com/api/v1/products';

        fetch( url )
            .then( resp => resp.json() )
            .then( products => {

                // console.log( products );
                
                products.forEach( product => {

                    sliderCtn.innerHTML += `
                        <div class="swiper-slide">
                            <div class="card">
                                <div class="card__top">
                                    <a class="card__thumbnail" href="#">
                                        <img src="${ product.imageUrl }" class="card__img" alt="${ toCapitalize(product.productName) }" />

                                        ${
                                            product.listPrice ? '<span class="discount">Off</span>' : ''
                                        }
                                    </a>

                                    <div class="card__content">
                                        <h6 class="card__product-name">${ resetText(product.productName) }</h6>
                                        <span class="card__product-stars stars-${ product.stars }"></span>
                                        <div class="prices">
                                            ${
                                                product.listPrice ?
                                                `<span class="old-price">de ${ toBrReal(product.listPrice).replace('R', '') }</span>`: ''
                                            }
                                            <span class="final-price">por ${ toBrReal(product.price).replace('R', '') }</span>
                                        </div>
                                        ${
                                            product.installments.length > 0 ? 
                                            `
                                            <span class="installments">
                                                ou em ${product.installments[0].quantity}x de ${toBrReal(product.installments[0].value)}
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

                // ESTA FUNCIÓN LA EJECUTO LUEGO DE INSERTAR TODOS LOS PRODUCTOS DE LA API.
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

    try { createCarrusel(); } catch (error) { console.log( error ); }

    const handleBuyButtons = () => {

        const buyButtons = Array.from( document.querySelectorAll( '.card span.card__button' ) );

        buyButtons.forEach( button => {
            button.addEventListener( 'click', e => runCompra(e) );
        } );

        const runCompra = e => {
            e.target.parentElement.classList.add( 'loading' );
            const productId = e.target.dataset.productid;
            const url = 'https://corebiz-test.herokuapp.com/api/v1/products';

            fetch( url )
                .then( resp => resp.json() )
                .then( products => {
                    const product = products.find( product => String( product.productId ) === String( productId ) );
                    addProduct(product);
                    updateMinicart();
                    e.target.parentElement.classList.remove( 'loading' );
                } );
        }

        const addProduct = product => { 

            const { imageUrl, price, listPrice, productId, productName } = product;

            let purchasedProducts = JSON.parse( localStorage.getItem( 'purchasedProducts' ) ) || [];
            const productInStorage = purchasedProducts?.find( product => String( product.productId ) === String( productId ) );
            purchasedProducts = purchasedProducts.filter( product => String( product.productId ) !== String( productId ) );
            
            purchasedProducts.push({
                imageUrl,
                price,
                listPrice,
                productId,
                productName,
                quantity: productInStorage ? (Number( productInStorage?.quantity ) + 1) : 1
            });

            localStorage.setItem( 'purchasedProducts', JSON.stringify(purchasedProducts) );

        }
        
    }

};

export default Products;