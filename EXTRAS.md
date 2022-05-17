## Funcionalidades añadidas:

- Funcionamiento del menú.

- Funcionamiento del minicart.

- Funcionamiento del buscador. El input tiene un debouncer para evitar hacer peticiones en cada "input" que realiza el usuario.

- Cuando el usuario envía el formulario del buscador, se "redirige" a los resultados de dicha búsqueda.

- El formulario del newsletter muestra mensajes personalizados. Por ejemplo, si el usuario envía dos veces el mismo correo electrónico, se muestra un mensaje y la petición no se realiza, para evitar correos repetidos en la base de datos. Esto está hecho con localStorage, en la realidad se consultaría a la base de datos.

- El menú y el minicart funcionan con lógicas diferentes. Para abrir y cerrar el menú, se utilizó JavaScript. Para abrir y cerrar el minicart, solamente se utilizó CSS.