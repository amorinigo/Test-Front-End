export const nameRegex = /^[a-zA-ZÀ-ÿ\u00f1\u00d1\s]{3,150}$/;

export const emailRegex = /^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,63}$/i;

// Receives ' PANTALÓN ', returns 'pantalon'.
export const resetText = text => {
    return text.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,"");
}

// Receives 'CINTO MARRÓN', returns 'Cinto marrón'.
export const toCapitalize = text => {
    return text.trim().toLowerCase().replace(/^\w/, (c) => c.toUpperCase());
}

// Receives a Number like 29900, returns that number divided by 100 in Brazilian Real format. 'R$ 299,00'.
export const toBrReal = number => {

    number = Number(number) / 100;
    
    return Number(number).toLocaleString("pt-BR", {
        style: "currency",
        currency: 'BRL',
        minimumFractionDigits: 2
    });

}

// Returns all endpoint products.
export const getProducts = () => {

    return fetch( 'https://corebiz-test.herokuapp.com/api/v1/products' )
    .then( resp => resp.json() )     
    .then( products => products );
    
}

// Receives a list of products and a term. Returns a list of products filtered by name.
export const getProductsWithName = ( products, term ) => {
    return products.filter( ({productName}) => resetText(productName).includes( term ) );
}

// Receives a list of products and an id. Returns the product with productId === id.
export const getProductById = ( products, id ) => {
    return products.find( product => String( product.productId ) === String( id ) );
}

// Receives a list of products and an id. Returns a list of products without the product with productId === id.
export const getProductsWithout = ( products, id ) => {
    return products.filter( product => String( product.productId ) !== String( id ) );
}

// Receives a list of products. Returns the quantity of products in the cart.
export const getTotalQuantityOf = products => {
    return products.map( ({quantity}) => Number(quantity) ).reduce( (x,y) => x + y, 0 );
}

// Receives a list of products. Returns the total price WITHOUT discount.
export const getSubtotalOf = products => {
    return products.map(({listPrice, quantity, price}) => listPrice ? Number(listPrice) * Number(quantity) : Number(price) * Number(quantity)).reduce( (x,y) => x + y, 0);
}

// Receives a list of products. Returns the total price WITH discount.
export const getTotalOf = products => {
    return products.map( ({price, quantity}) => Number(price) * Number(quantity) ).reduce( (x,y) => x + y, 0 );
}