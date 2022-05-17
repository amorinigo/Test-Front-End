import { toBrReal, getSubtotalOf, getTotalOf, getTotalQuantityOf } from "../../utils/helpers";

const Minicart = () => {
    updateMinicart();
};

export const updateMinicart = () => {

    const minicart = document.querySelector( '.minicart__sidenav .minicart__sidenav-body' );
    const products = JSON.parse( localStorage.getItem( 'purchasedProducts' ) ) || [];
    
    const updateProducts = () => {

        const productsCtn = minicart.querySelector( '.minicart__products' );
        productsCtn.innerHTML = ''; // To remove products that are currently loaded.
        
        products.reverse().forEach( product => {

            const { productName, imageUrl, quantity, productId, listPrice, price } = product;
            
            productsCtn.innerHTML += `
                <div class="minicart__product">
                    <div class="minicart__product-thumbnail">
                        <img alt="${ productName }" src="${ imageUrl }" class="minicart__product-img" />
                    </div>

                    <div class="minicart__product-info">
                        <div class="info-top">
                            <p class="name">
                                <span>${ productName }</span>
                                <span class="units">${ quantity } U.</span>
                            </p>
                            <i class="icon-trash" data-productid="${ productId }"></i>
                        </div>

                        <span class="info-prices">
                            ${
                                listPrice ? `<em class="old-price">${ toBrReal(listPrice * quantity) }</em>` : ''
                            }
                            <em class="best-price">${ toBrReal(price * quantity) }</em>
                        </span>
                    </div>
                </div>
            `;
            
        } );  
        
        // handleCleanIcons();
    }

    const showProducts = show => {

        if( show ) {
            minicart.classList.remove( 'show-msg' );
            minicart.classList.add( 'show-products' );  
        } else {
            minicart.classList.remove( 'show-products' );
            minicart.classList.add( 'show-msg' );
        }
        
    }
    
    if( products.length === 0 ) {
        showProducts( false );
    } else {
        updateProducts();
        showProducts( true );
    }

    const updateQuantityIcon = () => {
        const quantityIcon = document.querySelector( '.minicart .minicart__icon .minicart__quantity' );
        const newQuantity = getTotalQuantityOf( products );
        quantityIcon.textContent = newQuantity > 99 ? '+99' : newQuantity;
    }

    try { updateQuantityIcon(); } catch (error) { console.log( error ); }

    const updateTotals = () => {

        const subtotalHTML = document.querySelector( '.sidenav-footer__subtotal .number' );
        const totalHTML = document.querySelector( '.sidenav-footer__total .number' );
        
        const newSubtotal = getSubtotalOf( products );
        const newTotal = getTotalOf( products );
        
        subtotalHTML.textContent = toBrReal( newSubtotal );
        totalHTML.textContent = toBrReal( newTotal ); 
        
    }

    try { updateTotals(); } catch (error) { console.log( error ); }
    
}

export default Minicart;