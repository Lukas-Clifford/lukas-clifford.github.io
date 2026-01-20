
// Función para traducir el contenido del blog
async function translateContent(apiKey, blog, lang) {
    const instructions = `${roles.translator}. Traduce este json al ${lang} SIN USAR MARKDOWN y manteniendo la estructura y formato: ${JSON.stringify(blog)}`;


    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [
                { role: "user", content: instructions }
            ],
        }),
    });

    if (!response.ok) {
        throw new Error(`Error al traducir al ${lang}: ${response.status}`);
    }

    const data = await response.json();
    console.log("Traducción recibida:", data.choices[0].message.content);
    return JSON.parse(data.choices[0].message.content);
}

// Manejar la traducción al hacer clic en el botón
document.getElementById("translateButton").addEventListener("click", async () => {
    const apiKey = document.getElementById("apiKey").value;
    const translateButton = document.getElementById("translateButton");
    const previewSection = document.getElementById("preview-section");
    previewSection.style.display = "block"; // Mostrar la sección de vista previa   

    const translationLanguages = [
        { lang: "en", label: "Inglés", elementId: "english-preview" },
        { lang: "de", label: "Alemán", elementId: "german-preview" },
        { lang: "pt", label: "Portugués", elementId: "portuguese-preview" }
    ];

    try {
        translateButton.disabled = true;
        translateButton.textContent = "Traduciendo...";

        for (const { lang, label, elementId } of translationLanguages) {
            const translatedContent = await translateContent(apiKey, window.generatedBlogContent, label);

            // Mostrar traducción en la vista previa
            translations[lang] = translatedContent;
            document.getElementById(elementId).innerHTML = translatedContent.content;

            // Activar la sección de traducción
            document.getElementById(elementId).style.display = "block";
        }
    } catch (error) {
        console.error("Error durante la traducción:", error);
        alert("Ocurrió un error al traducir el contenido. Revisa la consola.");
    } finally {
        translateButton.disabled = false;
        translateButton.textContent = "Traducir y Mostrar Traducciones";
    }
});

// Manejar los botones de descargar XML por idioma
document.querySelectorAll(".xml-button").forEach(button => {
    button.addEventListener("click", () => {
        const lang = button.dataset.lang;
        if (translations[lang]) {
            downloadXML(translations[lang], lang);
        } else {
            alert("El contenido en este idioma aún no ha sido generado.");
        }
    });
});