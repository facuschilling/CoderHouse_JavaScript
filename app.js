const inventarioProductos = [
  { nombre: "Coca-Cola", precio: 1500 },
  { nombre: "Sprite", precio: 1350 },
  { nombre: "Fanta", precio: 1200 },
  { nombre: "Papas Fritas", precio: 1800 },
  { nombre: "Galletitas", precio: 800 },
  { nombre: "Alfajor", precio: 700 }
];

let carritoDeCompras = JSON.parse(localStorage.getItem("carrito")) || [];
let precioFinal = carritoDeCompras.reduce((acc, prod) => acc + prod.precio, 0);

const nombreInput = document.getElementById("nombreUsuario");
const botonIniciar = document.getElementById("botonIniciar");
const saludo = document.getElementById("saludo");
const seccionProductos = document.getElementById("seccionProductos");
const listaDeProductos = document.getElementById("listaDeProductos");
const seccionCarrito = document.getElementById("seccionCarrito");
const carritoLista = document.getElementById("carritoLista");
const total = document.getElementById("total");
const botonFinalizar = document.getElementById("botonFinalizar");
const botonVaciar = document.getElementById("botonVaciar");

function mostrarProductos() {
  listaDeProductos.innerHTML = "";
  inventarioProductos.forEach((producto, index) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <span>${producto.nombre} - $${producto.precio}</span>
      <button onclick="agregarAlCarrito(${index})">Agregar</button>
    `;
    listaDeProductos.appendChild(div);
  });
}

function agregarAlCarrito(index) {
  const producto = inventarioProductos[index];
  carritoDeCompras.push(producto);
  precioFinal += producto.precio;
  guardarCarrito();
  renderCarrito();
}

function renderCarrito() {
  carritoLista.innerHTML = "";
  carritoDeCompras.forEach((producto, i) => {
    const li = document.createElement("li");
    li.textContent = `${producto.nombre} - $${producto.precio}`;
    carritoLista.appendChild(li);
  });
  total.textContent = `Total: $${precioFinal}`;
}

function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carritoDeCompras));
}

function finalizarCompra() {
  if (carritoDeCompras.length === 0) {
    alert("Tu carrito está vacío.");
    return;
  }
  alert(`¡Gracias por tu compra! Total: $${precioFinal}`);
  carritoDeCompras = [];
  precioFinal = 0;
  guardarCarrito();
  renderCarrito();
}

function vaciarCarrito() {
  carritoDeCompras = [];
  precioFinal = 0;
  guardarCarrito();
  renderCarrito();
}

botonIniciar.addEventListener("click", () => {
  const nombreUsuario = nombreInput.value.trim();
  if (nombreUsuario === "" || !isNaN(nombreUsuario)) {
    alert("Ingresá un nombre válido");
    return;
  }
  saludo.textContent = `Hola ${nombreUsuario}, elegí lo que quieras comprar 👇`;
  seccionProductos.classList.remove("oculto");
  seccionCarrito.classList.remove("oculto");
  mostrarProductos();
  renderCarrito();
});

botonFinalizar.addEventListener("click", finalizarCompra);
botonVaciar.addEventListener("click", vaciarCarrito);

renderCarrito();
