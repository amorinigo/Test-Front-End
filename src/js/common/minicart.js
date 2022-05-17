import { resetText, toCapitalize, toBrReal } from "../utils/helpers";

const Minicart = () => {
    updateMinicart();
};

export const updateMinicart = () => {

    const minicart = document.querySelector( '.minicart__sidenav .minicart__sidenav-body' );
    const products = JSON.parse( localStorage.getItem( 'purchasedProducts' ) ) || [];

    // const handleCleanIcons = () => {
    
    //     const icons = Array.from( document.querySelectorAll( '.minicart__products .minicart__product .icon-trash' ) );

    //     icons.forEach( icon => {
    //         icon.addEventListener( 'click', e => {

    //             const productId = e.target.dataset.productid;
    //             let purchasedProducts = JSON.parse( localStorage.getItem( 'purchasedProducts' ) ) || [];
    //             purchasedProducts = purchasedProducts.filter( product => String( product.productId ) !== String( productId ) );
    //             localStorage.setItem( 'purchasedProducts', JSON.stringify(purchasedProducts) );
    //             updateProducts( purchasedProducts );

    //         } );
    //     } );
        
    // }
    
    const updateProducts = () => {
        const productsCtn = minicart.querySelector( '.minicart__products' );
        productsCtn.innerHTML = '';
        
        products.reverse().forEach( product => {

            productsCtn.innerHTML += `
                <div class="minicart__product">
                    <div class="minicart__product-thumbnail">
                        <img alt="${ product.productName }" src="${ product.imageUrl }" class="minicart__product-img" />
                    </div>

                    <div class="minicart__product-info">
                        <div class="info-top">
                            <p class="name">
                                <span>${ product.productName }</span>
                                <span class="units">${ product.quantity } U.</span>
                            </p>
                            <i class="icon-trash" style="display: none;" data-productid="${ product.productId }"></i>
                        </div>

                        <span class="info-prices">
                            ${
                                product.listPrice ? `<em class="old-price">${ toBrReal(product.listPrice) }</em>` : ''
                            }
                            <em class="best-price">${ toBrReal(product.price) }</em>
                        </span>
                    </div>
                </div>
            `;
            
        } );  
        
        // handleCleanIcons();
    }
    
    if( products.length === 0 ) {
        minicart.classList.remove( 'show-products' );
        minicart.classList.add( 'show-msg' );
    } else {
        updateProducts();
        minicart.classList.remove( 'show-msg' );
        minicart.classList.add( 'show-products' );  
    }

    const updateQuantityIcon = () => {
        const quantityIcon = document.querySelector( '.minicart .minicart__icon .minicart__quantity' );
        const newQuantity = products.map( ({quantity}) => Number(quantity) ).reduce( (x,y) => x + y, 0 );
        quantityIcon.textContent = newQuantity > 99 ? '+99' : newQuantity;
    }

    updateQuantityIcon();

    const updateTotals = () => {

        const subtotalHTML = document.querySelector( '.sidenav-footer__subtotal .number' );
        const totalHTML = document.querySelector( '.sidenav-footer__total .number' );
        
        const newSubtotal=products.map(({listPrice, quantity, price}) => listPrice ? Number(listPrice) * Number(quantity) : Number(price) * Number(quantity)).reduce( (x,y) => x + y, 0);
        
        const newTotal = products.map( ({price, quantity}) => Number(price) * Number(quantity) ).reduce( (x,y) => x + y, 0 );
        
        subtotalHTML.textContent = toBrReal( newSubtotal );
        totalHTML.textContent = toBrReal( newTotal ); 
        
    }

    updateTotals();
    
}

export default Minicart;