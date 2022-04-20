const carrito = validarStorageCarrito();

function validarStorageCarrito(){
    if(localStorage.getItem("carrito") != null){
        storageProductos = JSON.parse(localStorage.getItem("carrito"));
        return storageProductos;
    }else{
        return [];
    }
}

generarCards(carrito);

function generarCards(productosAMostrar){
    let acumuladorDeCards = ``;
    productosAMostrar.forEach((elementoDelArray) => {
        acumuladorDeCards += `<div class="producto">
        <p>${elementoDelArray.titulo}</p>
        <div class="producto--prod${elementoDelArray.id}"> </div>
        <p>$${elementoDelArray.precio}</p>
        <p>$${elementoDelArray.cantidad}</p>
        <p>$${elementoDelArray.total}</p>
    </div>`;
    
    });
    
    mostrarCardsEnElHTML(acumuladorDeCards);
}

function mostrarCardsEnElHTML(cards) {
    document.getElementById("mostrarCarrito").innerHTML = cards;
};
