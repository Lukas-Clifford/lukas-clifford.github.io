
const imageContainer = document.getElementById("imageContainer");
const productContainer = document.getElementById("productContainer");


// Agregar campos de imágenes
document.getElementById("addImage").addEventListener("click", () => {
    const imageFields = document.createElement("div");
    imageFields.classList.add("list-item");
    imageFields.innerHTML = `
        <label>Alt de la Imagen:</label>
        <input type="text" class="image-alt" placeholder="Texto descriptivo de la imagen" />
        <label>URL de la Imagen:</label>
        <input type="text" class="image-url" placeholder="URL de la imagen" />
        <button type="button" class="remove-item">Eliminar</button>

      `;
    // Botón para eliminar la imagen
    imageFields.querySelector(".remove-item").addEventListener("click", () => {
        imageFields.remove();
    });
    imageContainer.appendChild(imageFields);
});

// Agregar campos de productos
document.getElementById("addProduct").addEventListener("click", () => {
    const productFields = document.createElement("div");
    productFields.classList.add("list-item");
    productFields.innerHTML = `
        <label>Nombre del Producto:</label>
        <input type="text" class="product-name" placeholder="Nombre del producto" />
        <label>Precio del Producto:</label>
        <input type="text" class="product-price" placeholder="Precio del producto" />
        <label>URL de la Imagen del Producto:</label>
        <input type="text" class="product-image-url" placeholder="URL de la imagen" />
        <label>URL de la Tienda:</label>
        <input type="text" class="product-shop-url" placeholder="URL de la tienda" />
        <button type="button" class="remove-item">Eliminar</button>
      `;
    // Botón para eliminar el producto
    productFields.querySelector(".remove-item").addEventListener("click", () => {
        productFields.remove();
    });
    productContainer.appendChild(productFields);
});


// Descargar el XML al hacer clic en el botón
document.getElementById("downloadXML").addEventListener("click", () => {
    if (generatedBlogContent) {
        downloadXML(generatedBlogContent.blog, generatedBlogContent.categories, generatedBlogContent.date);
    } else {
        alert("No se ha generado ningún blog aún.");
    }
});