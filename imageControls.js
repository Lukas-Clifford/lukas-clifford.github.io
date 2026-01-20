// Generar automáticamente los controles de tamaño para cada imagen en el blog
const blogContent = document.getElementById('blogContent'); // Contenedor de las imágenes
const imageControls = document.getElementById('imageControls'); // Contenedor para los controles


async function generateImageControls() {
    imageControls.style.display = 'block'; // Asegurarse de que el contenedor de controles sea visible

    // Detectar todas las imágenes en la vista previa del blog
    const images = blogContent.querySelectorAll('img');

    images.forEach((image, index) => {
        const imageId = index + 1; // Identificador único para cada imagen

        // Crear un contenedor para los controles de cada imagen
        const controlContainer = document.createElement('div');
        controlContainer.classList.add('control-container');

        controlContainer.innerHTML = `
        <p>Control de tamaño para Imagen ${image.alt}</p>
        <div class="image-controller">
            <label>Tamaño (%):</label>
            <input type="number" value="20" step="5" data-image-id="${imageId}">
            <button data-image-id="${imageId}">Aplicar</button>
        </div>
        `;

        // Evento para el botón asociado al control de esta imagen
        const button = controlContainer.querySelector('button');
        button.addEventListener('click', () => {
            const input = controlContainer.querySelector(`input[data-image-id="${imageId}"]`); // Input del tamaño
            const scalePercentage = parseInt(input.value, 10); // Valor del tamaño como entero

            // Aplicar el tamaño a la imagen correspondiente
            image.style.width = `${scalePercentage}%`;
            window.generatedBlogContent.content = blogContent.innerHTML; // Actualizar el contenido global del blog
        });

        // Añadir el control generado dinámicamente al contenedor
        imageControls.appendChild(controlContainer);
    });
}
