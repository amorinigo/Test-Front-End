const Menu = () => {

    const menu = document.querySelector( '.navbar .menu' );
    
    const handleMenuToggle = () => {
        
        const menuIcon = document.querySelector( '.navbar .menu .menu__icon' );
        menuIcon.addEventListener( 'click', () => menu.classList.toggle( 'active' ) );
        
    }
    
    try { handleMenuToggle(); } catch (error) { console.log( error ); }

    const handleMenuClose = () => {

        const menuCtn = document.querySelector( '.navbar .menu .menu__content' );

        menuCtn.addEventListener( 'click', ({ target }) => {
            const isCloseElement = target.classList.contains( 'menu__content' ) || target.classList.contains( 'menu__sidenav-icon' )
            isCloseElement && menu.classList.remove( 'active' );
        } );
        
    }

    try { handleMenuClose(); } catch (error) { console.log( error ); }
    
};

export default Menu;