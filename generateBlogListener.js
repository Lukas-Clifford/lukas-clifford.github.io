window.generatedBlogContent = null;
// Manejo del botón para generar el blog
document.getElementById("generateBlog").addEventListener("click", async () => {
    const apiKey = document.getElementById("apiKey").value;
    const orientation = document.getElementById("orientation").value;
    const generateButton = document.getElementById("generateBlog");


    // Comprobar si hay imágenes en el contenedor (puede estar vacío)
    const imageContainer = document.getElementById("imageContainer");
    const images = Array.from(imageContainer.querySelectorAll(".list-item")).map(item => ({
        alt: item.querySelector(".image-alt").value || "",
        url: item.querySelector(".image-url").value || "",
    }));

    // Comprobar si hay productos en el contenedor (puede estar vacío)
    const productContainer = document.getElementById("productContainer");
    const products = Array.from(productContainer.querySelectorAll(".list-item")).map(item => ({
        name: item.querySelector(".product-name").value || "",
        price: item.querySelector(".product-price").value || "",
        image_url: item.querySelector(".product-image-url").value || "",
        shop_url: item.querySelector(".product-shop-url").value || "",
    }));
    

    // Validar solamente los campos obligatorios
    if (!apiKey || !orientation || categories.length === 0) {
        alert("Por favor, asegúrate de rellenar los campos obligatorios: Clave API, Orientación y al menos una Categoría.");
        return;
    }

    try {

        generateButton.disabled = true; // Deshabilitar el botón
        generateButton.textContent = "Generando..."; // Cambiar el texto del botón
        const blog = await generateBlog(apiKey, orientation, images, products);

        // Si no hay productos, eliminamos el apartado de productos relacionados del contenido
        if (products.length === 0) {
            console.log("No se detectaron productos, por lo que no se añadirá el apartado de Productos Relacionados.");
        } else {
            // Formatear y añadir los productos relacionados solo si hay productos
            const productHTML = formatProducts(products);
            blog.content += productHTML;
        }

        // Mostrar vista previa
        document.getElementById("blogContent").innerHTML = blog.content;
        document.getElementById("downloadXML").style.display = "block"; // Botón de descarga visible
        document.getElementById("translateButton").style.display = "block"; // Botón de traducción visible
        generateImageControls(); // Cargar controles de tamaño para imágenes

        window.generatedBlogContent = blog; // Guardar el blog generado globalmente
    } catch (error) {
        console.error("Error al generar el blog:", error);
        alert("Ha ocurrido un error. Revisa la consola.");
    } finally {
        generateButton.disabled = false; // Reactivar el botón después de la solicitud (éxito o error)
        generateButton.textContent = "Generar Blog"; // Restaurar el texto del botón
    }
});