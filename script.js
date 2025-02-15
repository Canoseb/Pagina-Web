document.addEventListener('DOMContentLoaded', () => {
    // Array para almacenar los productos en el carrito
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // Función para agregar un producto al carrito
    function agregarAlCarrito(nombre, precio) {
        const producto = { nombre, precio, cantidad: 1 };
        carrito.push(producto);
        console.log(carrito); // Verificar que el producto se agrega al carrito
        localStorage.setItem('carrito', JSON.stringify(carrito));
        actualizarCarrito();
    }

    // Función para actualizar el carrito en la página del carrito de compras
    function actualizarCarrito() {
        const tablaCarrito = document.querySelector('tbody');
        if (!tablaCarrito) return; // Si la tabla del carrito no existe, salir de la función

        tablaCarrito.innerHTML = '';

        carrito.forEach((producto, index) => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${producto.nombre}</td>
                <td>$${producto.precio}</td>
                <td>${producto.cantidad}</td>
                <td>$${producto.precio * producto.cantidad}</td>
                <td><button class="btn-eliminar" data-index="${index}">Eliminar</button></td>
            `;
            tablaCarrito.appendChild(fila);
        });

        // Actualizar el total
        const total = carrito.reduce((sum, producto) => sum + producto.precio * producto.cantidad, 0);
        const totalElement = document.querySelector('.total h3');
        if (totalElement) {
            totalElement.textContent = `Total: $${total}`;
        }

        // Vincular botones de eliminar
        const botonesEliminar = document.querySelectorAll('.btn-eliminar');
        botonesEliminar.forEach(boton => {
            boton.addEventListener('click', () => {
                const index = boton.getAttribute('data-index');
                eliminarDelCarrito(index);
            });
        });
    }

    // Función para eliminar un producto del carrito
    function eliminarDelCarrito(index) {
        carrito.splice(index, 1);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        actualizarCarrito();
    }

    // Agregar eventos a los botones de "Agregar al Carrito"
    document.querySelectorAll('.producto button').forEach((button) => {
        button.addEventListener('click', () => {
            const nombre = button.parentElement.querySelector('h3').textContent;
            const precio = parseFloat(button.parentElement.querySelector('p').textContent.replace('$', '').replace('.', ''));
            agregarAlCarrito(nombre, precio);
        });
    });

    // Funcionalidad del botón "Proceder al Pago"
    const botonPagar = document.querySelector('.total button');
    if (botonPagar) {
        botonPagar.addEventListener('click', () => {
            alert('Procediendo al pago...');
            // Aquí puedes redirigir a la página de pago
            // window.location.href = 'pagina_de_pago.html';
        });
    }

    // Inicializar el carrito cuando se carga la página del carrito
    actualizarCarrito();
});