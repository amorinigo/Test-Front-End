import { resetText, toCapitalize, getProducts, getProductsWithName } from "../../utils/helpers";

const Searcher = () => {
    
    const handleSearch = () => {

        const input = document.querySelector( '.searcher__form .searcher__form-input' );
        const searcherModal = document.querySelector( '.searcher .searcher__modal' );

        // debouncer.
        let debounceTimer;
    
        const debounce = ( callback, time ) => {
            window.clearTimeout( debounceTimer );
            debounceTimer = window.setTimeout( callback, time );
        };
        // debouncer.

        input.addEventListener( 'input', () => debounce( runSearch, 500 ), false );

        const runSearch = () => {
            const term = resetText( input.value );

            if( term === '' ) {
                showModalWith( 'any' );
                return;
            }

            getProducts()
                .then( products => showResults( products, term ) )
                .catch( err => showResults( [] ) );
        }

        const showResults = ( products, term = '' ) => {

            const filteredProducts = getProductsWithName( products, term );
            
            if( filteredProducts.length > 0 ) {
                createNewResults( filteredProducts );
                showModalWith( 'results' );
            } else {
                showModalWith( 'message' );
            }
            
        }

        const showModalWith = typeOfView => {

            switch( typeOfView ) {
                case 'results':
                    searcherModal.classList.remove( 'show-message' );
                    searcherModal.classList.add( 'show-results' );
                    break;
                case 'message':
                    searcherModal.classList.remove( 'show-results' );
                    searcherModal.classList.add( 'show-message' );
                    break;
                case 'any':
                    searcherModal.classList.remove( 'show-message' );
                    searcherModal.classList.remove( 'show-results' );
                    break;
                default:
                    searcherModal.classList.remove( 'show-message' );
                    searcherModal.classList.remove( 'show-results' );
            }
            
        }

        const createNewResults = products => {

            const resultsCtn = document.querySelector( '.searcher__modal-results .modal-results__products' );
            resultsCtn.innerHTML = ''; // To remove products that are currently loaded.

            products.forEach( ({ imageUrl, productName }) => {
                
                const name = toCapitalize( productName );
                
                resultsCtn.innerHTML += `
                    <a class="product" href="#">
                        <div class="product__thumbnail">
                            <img src="${ imageUrl }" alt="${ name }" class="product__thumbnail-img" />
                        </div>

                        <span class="product__name">${ name }</span>
                    </a>
                `;
                
            } );
            
        }
        
    }

    try { handleSearch(); } catch (error) {  }
    
    const handleShowMoreResults = () => {

        const searchForm = document.querySelector( '.searcher .searcher__form' );
        const showMoreBtn = document.querySelector( '.searcher__modal .modal-results__button' );

        searchForm.addEventListener( 'submit', e => goToSearch(e) );
        showMoreBtn.addEventListener( 'click', e => goToSearch(e) );

        const goToSearch = event => {
            event.preventDefault();
            const inputValue = searchForm.querySelector( '.searcher__form-input' )?.value?.trim()?.toLowerCase();

            if( inputValue === '' ) {
                return;
            }
            
            const newHref = `${ location.origin }/?search=${ inputValue }`;
            location.href = newHref;
        }
        
    }

    try { handleShowMoreResults(); } catch (error) {  }
    
};

export default Searcher;