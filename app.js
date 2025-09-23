let productos = [];
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const contenedorProductos = document.getElementById("contenedorProductos");
const verCarrito = document.getElementById("verCarrito");
const contadorCarrito = document.getElementById("contadorCarrito");

async function cargarProductos() {
  try {
    const respuesta = await fetch("https://fakestoreapi.com/products");
    productos = await respuesta.json();
    mostrarProductos();
  } catch (error) {
    console.error("Error al cargar productos:", error);
  }
}

function mostrarProductos() {
  contenedorProductos.innerHTML = "";
  productos.forEach((producto) => {
    const div = document.createElement("div");
    div.classList.add("tarjeta-producto");
    div.innerHTML = `
      <img src="${producto.image}" alt="${producto.title}">
      <h3>${producto.title}</h3>
      <p>$${producto.price}</p>
      <button class="ver-detalles" onclick="Swal.fire({
        title: '${producto.title}',
        text: '${producto.description}',
        imageUrl: '${producto.image}',
        imageWidth: 200,
        imageHeight: 200,
        imageAlt: '${producto.title}',
        confirmButtonText: 'Cerrar'
      })">Ver detalles</button>
      <button class="boton-agregar" onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>`;
    contenedorProductos.appendChild(div);
  });
}
function agregarAlCarrito(id) {
  const producto = productos.find((p) => p.id === id);
  const itemEnCarrito = carrito.find((p) => p.id === id);

  if (itemEnCarrito) {
    itemEnCarrito.cantidad++;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }

  guardarCarrito();
  actualizarContador();
  Swal.fire("Producto agregado.", `Agregaste <strong>${producto.title}</strong> al carrito.`, "success");
}

function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function actualizarContador() {
  contadorCarrito.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad, 0);
}

function mostrarCarrito() {
  if (carrito.length === 0) {
    Swal.fire("¡Hey!", "El carrito está vacío", "info");
    return;
  }

  let htmlCarrito = "<ul>";
  carrito.forEach((p, index) => {
    htmlCarrito += `
      <li>
        ${p.title} (x${p.cantidad}) - $${p.price * p.cantidad}
        <button class="boton-eliminar" onclick="eliminarDelCarrito(${index})">❌</button>
      </li>
    `;
  });
  htmlCarrito += "</ul>";

  Swal.fire({
    title: "Tu Carrito",
    html: htmlCarrito,
    showCancelButton: true,
    confirmButtonText: "Finalizar compra",
    cancelButtonText: "Seguir comprando"
  }).then((resultado) => {
    if (resultado.isConfirmed) {
      finalizarCompra();
    }
  });
}

function eliminarDelCarrito(indice) {
  carrito.splice(indice, 1);
  guardarCarrito();
  actualizarContador();
  mostrarCarrito();
}

function finalizarCompra() {
  const total = carrito.reduce((acc, p) => acc + p.price * p.cantidad, 0);
  Swal.fire({
    title: "¡Gracias por tu compra!",
    text: `El total a pagar es $${total.toFixed(2)}.`,
    icon: "success",
    confirmButtonText: "Pagar."
  });
  carrito = [];
  guardarCarrito();
  actualizarContador();
}

verCarrito.addEventListener("click", mostrarCarrito);

cargarProductos();
actualizarContador();
