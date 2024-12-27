// URL base de la API
const API_URL = 'http://localhost:3000';

// Función para cargar los productos
async function cargarProductos() {
    try {
        const response = await fetch(`${API_URL}/productos`);
        const productos = await response.json();
        const productosGrid = document.getElementById('productos-grid');
        productosGrid.innerHTML = '';

        productos.forEach(producto => {
            const productoCard = document.createElement('div');
            productoCard.className = 'producto-card';
            productoCard.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <div class="producto-info">
                    <span class="nombre-producto">${producto.nombre}</span>
                    <span class="precio">$ ${producto.precio.toFixed(2)}</span>
                    <button onclick="borrarProducto(${producto.id})" class="cart-button">🗑</button>
                </div>
            `;
            productosGrid.appendChild(productoCard);
        });
    } catch (error) {
        console.error('Error al cargar productos:', error);
        alert('Error al cargar los productos');
    }
}

// Función para agregar un producto
async function agregarProducto(evento) {
    evento.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const precio = parseFloat(document.getElementById('precio').value);
    const imagen = document.getElementById('imagen').value;

    const nuevoProducto = {
        nombre,
        precio,
        imagen
    };

    try {
        const response = await fetch(`${API_URL}/productos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevoProducto)
        });

        if (response.ok) {
            document.getElementById('agregar-form').reset();
            cargarProductos();
        } else {
            throw new Error('Error al agregar el producto');
        }
    } catch (error) {
        console.error('Error al agregar producto:', error);
        alert('Error al agregar el producto');
    }
}

// Función para borrar un producto
async function borrarProducto(id) {
    if (confirm('¿Estás seguro de que quieres borrar este producto?')) {
        try {
            const response = await fetch(`${API_URL}/productos/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                cargarProductos();
            } else {
                throw new Error('Error al borrar el producto');
            }
        } catch (error) {
            console.error('Error al borrar producto:', error);
            alert('Error al borrar el producto');
        }
    }
}

// Event Listeners
document.getElementById('agregar-form').addEventListener('submit', agregarProducto);

// Cargar productos al iniciar la página
document.addEventListener('DOMContentLoaded', cargarProductos); 