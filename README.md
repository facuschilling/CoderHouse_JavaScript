
# Simulador carrito de compras 🛒

Proyecto realizado para el curso de JavaScript en CoderHouse.




#### Explicación de las funciones y el proyecto:
- **Línea 3 y 4**: declaro el carrito de compras y el precio final inicia en $0.
- **Línea 6**: declaro el objeto literal con el inventario de productos utilizando un array.

- **Función *bienvenidaUsuario***: solicito el nombre del usuario y chequeo que sea un nombre (corroboro que no sea null, ni un número ni esté vacío), en caso de estar todo correcto, ejecuta la función mostrarProductos.

- **Función *agregarProducto***: realiza un recorrido al array para mostrar los productos disponibles.

- **Función *mostrarProductos***: declara la variable *productoSeleccionado* la cual tiene como valor la función anterior. Permite agregar productos al carrito y chequear si ese producto está disponible (Por ejemplo, si se indica un número que no está.)

- **Función *finalizarCompra***: muestra el total final del carrito de compras y en caso de estar vacío devuelve un alert que indica eso.



