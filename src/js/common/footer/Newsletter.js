import { emailRegex, nameRegex } from "../../utils/helpers";

const Newsletter = () => {

    const handleForm = () => {
        
        const form = document.querySelector( '.footer .newsletter .newsletter__form' );
        const formButton = form.querySelector( 'button[type="submit"]' );

        form.addEventListener( 'submit', e => evaluateForm(e) );

        const evaluateForm = event => {

            event.preventDefault();
            const formValues = Object.fromEntries( new FormData(event.target) );
            const { isValidForm, errors } = getFormState( formValues );
            disabledForm( true );
            setErrors( errors );

            ( isValidForm ) ? sendForm( formValues ) : disabledForm( false );
            
        }
        
        const getFormState = formValues => {

            const name = formValues.name?.toLowerCase().trim();
            const email = formValues.email?.toLowerCase().trim();
            const emailsSent = JSON.parse( localStorage.getItem( 'emailsSentNL' ) ) || [];
            const isValidName = nameRegex.test( name );
            const isValidEmail = emailRegex.test( email );

            const isUniqueEmail = emailsSent && !emailsSent.includes( email ); // this value should consult the newsletter database.
            const isValidForm = isValidName && isValidEmail && isUniqueEmail;
            
            const errors = {
                name: !isValidName,
                email: !isValidEmail,
                uniqueEmail: !isUniqueEmail
            };
            
            return ({ isValidForm, errors });
            
        }

        const disabledForm = disabled => {
            
            if( disabled ) {
                formButton.setAttribute( 'disabled', 'true' );
                formButton.classList.add( 'loading' );
            } else {
                formButton.removeAttribute( 'disabled' );
                formButton.classList.remove( 'loading' );
            }

        }

        const setErrors = errors => {

            const nameField = form.querySelector( '.newsletter__form-field.name' );
            const emailField = form.querySelector( '.newsletter__form-field.email' );
            const repeatedEmailMsg = form.nextElementSibling.querySelector( '.msg.email' );

            errors?.name ? nameField.classList.add('is-error') : nameField.classList.remove('is-error');
            errors?.email ? emailField.classList.add('is-error') : emailField.classList.remove('is-error');
            errors?.uniqueEmail ? repeatedEmailMsg.classList.add('is-error') : repeatedEmailMsg.classList.remove('is-error');
            
        }

        const sendForm = formValues => {
            const url = 'https://corebiz-test.herokuapp.com/api/v1/newsletter';

            const data = {
                email: formValues.email.trim(),
                name: formValues.name.trim()
            };

            const options = {
              method: 'POST',
              body: JSON.stringify( data ),
              headers: {
                  'Content-Type': 'application/json',
                  'redirect': 'manual'
              }
            };
            
            fetch( url , options )
                .then( resp => resp.json() )
                .then( ({ status }) => {

                    if( status === 'error' ) {
                        resetForm( 'error' );
                    } else {
                        resetForm( 'success' );
                        saveNewEmail( data.email );
                    }
                    
                } )
                .catch( error => resetForm( 'error' ) );
        }

        const resetForm = msgType => {
            const successMsg = form.nextElementSibling.querySelector( '.msg.success' );
            const errorMsg = form.nextElementSibling.querySelector( '.msg.error' );
            
            if( msgType === 'success' ) {
                successMsg.classList.add( 'show' );
                errorMsg.classList.remove( 'show' );
                setTimeout( () => successMsg.classList.remove( 'show' ), 3000 );
            } else {
                errorMsg.classList.add( 'show' );
                successMsg.classList.remove( 'show' );
                setTimeout( () => errorMsg.classList.remove( 'show' ), 3000 );
            }
            
            disabledForm( false );
            form.reset();
        }

        const saveNewEmail = email => {
            const sentEmails = JSON.parse( localStorage.getItem('emailsSentNL') ) || [];
            sentEmails.push( email );
            localStorage.setItem( 'emailsSentNL', JSON.stringify(sentEmails) );
        }
        
    }

    try { handleForm(); } catch (error) { console.log( error ); }
    
};

export default Newsletter;