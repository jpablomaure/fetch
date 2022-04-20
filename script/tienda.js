fetch('data.json')
    .then((res) => res.json())
    .then((data) => generarCards(data))

const carrito = validarStorageCarrito();

function validarStorageCarrito() {
    if (localStorage.getItem("carrito") != null) {
        const storageProductos = JSON.parse(localStorage.getItem("carrito"));
        return storageProductos;
    } else {
        return [];
    }
}

document.getElementById("cantidad-prod").innerHTML = carrito.length;

const agregarAlCarrito = (idProducto) => {
    fetch('data.json')
        .then((res) => res.json())
        .then((data) => {
            const productosAgregados = data.find(producto => producto.id === idProducto);
            // Agregando al carrito
            carrito.push(productosAgregados);

            Toastify({
                text: `Agregaste ${productosAgregados.titulo} al carrito`,
                duration: 3000,
                destination: "./detalle.html",
                newWindow: true,
                close: true,
                gravity: "bottom", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: false, // Prevents dismissing of toast on hover
                style: {
                    background: "linear-gradient(to right, #6b705c, #eaeaea)",
                },
                onClick: function () {} // Callback after click
            }).showToast();

            // Actualizando el storage del carrito
            localStorage.setItem("carrito", JSON.stringify(carrito));

            // Actualizando el html
            document.getElementById("cantidad-prod").innerHTML = carrito.length;

        })

}



function generarCards(productosAMostrar) {

    let acumuladorDeCards = ``;

    productosAMostrar.forEach((elementoDelArray) => {
        acumuladorDeCards += `<div class="producto">
        <p>${elementoDelArray.titulo}</p>
        <div class="producto--prod${elementoDelArray.id}"> </div>
        <p>$${elementoDelArray.precio}</p>
        <button onclick='agregarAlCarrito(${elementoDelArray.id});'>Agregar al Carrito</button>
        
    </div>`;

    });

    mostrarCardsEnElHTML(acumuladorDeCards);

}



function mostrarCardsEnElHTML(cards) {
    document.getElementById("product").innerHTML = cards;
};

function buscarProducto() {
    const tecla = document.getElementById("buscarProducto");

    tecla.addEventListener('keyup', function (event) {

        if (event.keyCode === 13) {
            event.preventDefault();
            document.getElementById("botonBuscar").click();
        }
    });
    const nombreProductoBuscado = document.getElementById("buscarProducto").value.toUpperCase().trim();
    // console.log(nombreProductoBuscado);
    const productosEncontrados = productos.filter((producto) => {
        return producto.titulo.toUpperCase().match(nombreProductoBuscado);
        // console.log(productosEncontrados);
    });

    generarCards(productosEncontrados);
};


// function reset() {
//     const reset = document.getElementById("botonBuscar").value;
//     console.log(reset);
//     document.getElementById("botonBuscar").value = "";
//     console.log(reset);
// }