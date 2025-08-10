// Hola chicos, está todo explicado en el README de Github.

const carritoDeCompras = []
let precioFinal = 0;

const inventarioProductos = [
    { nombre: "Coca-Cola", precio: 1500 },
    { nombre: "Sprite", precio: 1350 },
    { nombre: "Fanta", precio: 1200},
    { nombre: "Papas Fritas", precio: 1800},
    { nombre: "Galletitas", precio: 800},
    { nombre: "Alfajor", precio: 700}
]

function bienvenidaUsuario() {
    const nombreUsuario = prompt("¡Hola! Por favor, indica tu nombre:");
    if (nombreUsuario === null || nombreUsuario === "" || isNaN(nombreUsuario) === false) {
        alert("Porfavor, ingresá un nombre válido.");
        bienvenidaUsuario();
    } else if (confirm(`Hola ${nombreUsuario}, ¿Querés comprar algo?`)) {
        mostrarProductos();
    } else {
        alert(`Esperamos verte dentro de poco, ${nombreUsuario}.`);
    }
}

function agregarProducto() {
    let productos = "Productos disponibles:\n";
    for (let i = 0; i < inventarioProductos.length; i++) {
        productos += `${i + 1}. Nombre: ${inventarioProductos[i].nombre} - Precio: $${inventarioProductos[i].precio}\n`;
    }
    return prompt(productos + "\nEscribí el número del producto que querés agregar al carrito (O tocá cancelar para finalizar la compra):");
}

function mostrarProductos() {
    let productoSeleccionado = agregarProducto();
    while (productoSeleccionado !== null) {
        const producto = inventarioProductos[parseInt(productoSeleccionado) - 1];
        if (producto) {
            carritoDeCompras.push(producto);
            precioFinal += producto.precio;
            alert(`Producto agregado: ${producto.nombre}. Precio: $${producto.precio}`);
        } else {
            alert("Producto no válido. Por favor, intenta de nuevo.");
        }
        productoSeleccionado = agregarProducto();
    }
    finalizarCompra();
}

function finalizarCompra() {
    if (carritoDeCompras.length > 0) {
        let resumenCompra = "Resumen de tu compra:\n";
        carritoDeCompras.forEach((producto, index) => {
            resumenCompra += `${index + 1}. ${producto.nombre} - $${producto.precio}\n`;
        });
        resumenCompra += `\nTotal a pagar: $${precioFinal}`;
        alert(resumenCompra);
    } else {
        alert("No has agregado productos al carrito.");
    }
}

bienvenidaUsuario();