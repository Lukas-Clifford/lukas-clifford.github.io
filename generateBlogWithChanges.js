const blogContentElement = document.getElementById("preview");
const changeRequestInput = document.getElementById("changeRequest");
const requestChangeButton = document.getElementById("requestChangeButton");

async function requestBlogChanges() {
    const fullPrompt = `${roles.copywriter} ${JSON.stringify(window.generatedBlogContent)} Por favor, realiza los siguientes cambios en el blog manteniendo la estructura del diccionario y SIN USAR MARKDOWN: ${changeRequestInput.value}`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${document.getElementById("apiKey").value}`,
        },
        body: JSON.stringify({
            model: "gpt-4o-mini", 
            messages: [
                { role: "user", content: fullPrompt }
            ],
        }),
    });

    if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return JSON.parse(data.choices[0].message.content);
}

// Manejar la solicitud de cambios
requestChangeButton.addEventListener("click", async () => {
    const changes = changeRequestInput.value.trim(); // Texto de los cambios requeridos
    const blogContent = blogContentElement.innerHTML; // Contenido actual del blog generado

    if (!changes) {
        alert("Por favor, escribe los cambios que deseas realizar.");
        return;
    }

    try {
        document.getElementById("requestChangeButton").disabled = true;
        document.getElementById("requestChangeButton").innerText = "Solicitando cambios...";

        // Llamar a OpenAI para solicitar los cambios
        const updatedBlog = await requestBlogChanges(blogContent, changes);
        window.generatedBlogContent = updatedBlog;
        // Actualizar la vista previa con el contenido modificado
        blogContentElement.innerHTML = updatedBlog.content;
        generateImageControls(); // Regenerar los controles de imagen para el nuevo contenido
        alert("Los cambios han sido aplicados correctamente.");

    } catch (error) {
        console.error("Error solicitando cambios:", error);
        alert("Ocurrió un error al realizar la solicitud. Revisa la consola para más detalles.");
    }finally {
        document.getElementById("requestChangeButton").disabled = false;
        document.getElementById("requestChangeButton").innerText = "Solicitar Cambios";
    }
});
