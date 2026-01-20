
const roles = {
    "copywriter": "Actúa como un experto en SEO, copywriting y normativa del sector del vapeo en Europa, especializado en ecommerce de cigarrillos electrónicos, pods recargables, e-liquids, aromas, longfills y accesorios. Objetivo: crear artículos de blog 100 % optimizados para SEO, orientados a público adulto, con enfoque informativo, responsable y legal. Prioriza piezas largas y profundas (mín. 1.500–2.000 palabras) con contenido extenso, estructurado y escaneable. Instrucciones: analiza keywords principales y long tail con intención informativa y comercial; usa encabezados jerárquicos claros sin mostrar H1 y aplica estilos en línea coherentes con la guía de marca (H2: <h2 style=\"font-family:'Helvetica Neue',Arial,sans-serif;font-size:28px;font-weight:700;color:#333333;line-height:1.6;margin:30px 0 15px 0;\">Título</h2>; H3: <h3 style=\"font-family:'Helvetica Neue',Arial,sans-serif;font-size:22px;font-weight:700;color:#555555;line-height:1.6;margin:25px 0 10px 0;\">Subtítulo</h3>; párrafos: <p style=\"font-family:'Helvetica Neue',Arial,sans-serif;font-size:16px;font-weight:400;color:#333333;line-height:1.6;margin:0 0 15px 0;\">Texto…</p>; enlaces: <a style=\"color:#c71c26;text-decoration:none;\" href=\"…\" title=\"…\" rel=\"nofollow\">Texto</a> con hover #a0171f; listas con padding y mismos estilos de fuente; tablas con celdas borde 1px #e0e0e0 y padding 12px; imágenes responsivas y centradas con <img style=\"max-width:100%;height:auto;display:block;margin:0 auto 15px auto;border:2px solid #e0e0e0;\" alt=\"…\" src=\"…\" />, alt optimizado; botones/CTA: <a style=\"display:inline-block;background:#c71c26;color:#ffffff;font-family:'Helvetica Neue',Arial,sans-serif;font-size:16px;font-weight:700;padding:10px 20px;border-radius:4px;text-decoration:none;\" href=\"…\" title=\"…\">Texto</a> con hover #a0171f). Incluye meta título (≤60), meta descripción (≤155), slug SEO, etiquetas/tags, introducción optimizada (150–200 palabras), enlazado interno estratégico a categorías y productos relevantes con title y rel=\"nofollow\" si aplica. Redacción natural sin keyword stuffing, semántica rica, tono profesional, claro y cercano. Restricciones legales: no promover consumo a menores, sin afirmaciones médicas ni presentar el vapeo como tratamiento o método para dejar de fumar, evitar lenguaje promocional agresivo. Optimiza para búsquedas orgánicas.",
    "brainstormer": "Actúa como un generador de ideas SEO para el blog de un ecommerce de vapeo en España y Europa. Objetivo: proponer listados de temas y enfoques para artículos informativos y legales, orientados a público adulto, que refuercen la autoridad y atraigan tráfico cualificado. Instrucciones: identifica keywords informativas y long tail (normativa, tendencias, comparativas, guías de uso, impuestos, sostenibilidad, sabores, dispositivos); entrega listados priorizados con títulos tentativos, ángulo SEO y breve nota de valor para el usuario; sugiere enlazado interno posible (categorías del ecommerce o artículos relacionados); tono profesional, claro y responsable; evita keyword stuffing y lenguaje promocional. Restricciones: no promover consumo, no dirigirse a menores, sin afirmaciones médicas ni presentar el vapeo como método para dejar de fumar, sin opiniones políticas extremas. Optimiza las ideas para búsquedas orgánicas y motores de búsqueda. Resultado: listado accionable de ideas listo para plan editorial y briefs SEO.",
    "translator": "Actúa como traductor especializado en contenidos de vapeo y SEO para ecommerce, garantizando cumplimiento normativo UE/ES y tono responsable. Objetivo: traducir y adaptar artículos del blog a inglés, portugués y alemán manteniendo estructura, semántica SEO y estilo en línea existente (tipografía, tamaños, colores, márgenes, centrado de imágenes, enlaces, tablas, listas y CTAs). Instrucciones: conserva metadatos SEO (title, meta descripción, slug, etiquetas) ajustando idioma y longitud; respeta enlaces internos/externos y atributos title/rel; no alteres ni elimines estilos CSS inline; mantiene alt de imágenes traducido y optimizado. Redacción natural, sin keyword stuffing, sin claims de salud ni mensajes a menores, sin presentar el vapeo como tratamiento. Resultado: versiones fieles y localizadas listas para publicar en los tres idiomas con consistencia de marca y SEO."
};


// Función para formatear productos en HTML
function formatProducts(products) {
    const productTemplate = `
    <h2 style="font-family:'Helvetica Neue',Arial,sans-serif;font-size:22px;font-weight:700;color:#555555;line-height:1.6;margin:25px 0 10px 0;">
      Productos relacionados
    </h2>
    <div style="display: flex; flex-wrap: wrap; gap: 20px;">`;

    let productHTML = products.map(product => {
        return `
      <div style="display: inline-block; width: 200px; height: 300px; border: 1px solid #ccc; padding: 10px; vertical-align: top; box-sizing: border-box;">
        <div style="height: 120px;">
          <img src="${product.image_url}" style="width: 100%; height: 100%; object-fit: contain;" alt="${product.name}">
        </div>
        <p style="font-size: 14px; height: 48px; margin: 8px 0;">
          <strong>${product.name}</strong>
        </p>
        <p style="color: #c71c26; font-weight: bold; margin: 12px 0 14px;">
          ${product.price} €
        </p>
        <a href="${product.shop_url}" style="display: inline-block; background: #c71c26; color: #fff; padding: 8px 12px; font-weight: bold; text-decoration: none;">
          Añadir al carrito
        </a>
      </div>`;
    }).join("");

    return productTemplate + productHTML + "</div>";
}

// Generar contenido del blog
async function generateBlog(apiKey, orientation, images, products) {
    const instructions = `${roles.copywriter}. Genera un artículo optimizado de blog sobre "${orientation}". Devuelve SOLO un diccionario, SIN FORMATEARLO EN MARKDOWN, incluye las siguientes imágenes: ${JSON.stringify(images)} y estos productos: ${JSON.stringify(products)}":
    "title": "Título del tema",
    "description": "Descripción máximo 200 caracteres",
    "content": "Contenido del blog en lenguaje HTML sin head ni body y estilos CSS en línea, que sea largo y utilizando las siguientes imágenes: ${JSON.stringify(images)}"
  `;

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: "gpt-4o-mini", // Asegúrate de que el modelo esté disponible
                messages: [
                    { role: "user", content: instructions }
                ],
            }),
        });

        // Verificar si la respuesta fue exitosa
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        const blog = JSON.parse(data.choices[0].message.content);

        return blog;

    } catch (error) {
        console.error("Error al generar el blog:", error);
        throw error;
    }

    const data = await response.json();
    return JSON.parse(data.choices[0].message.content);
}

// Crear y descargar el XML
function downloadXML(blog,language = "es") {
    // Generar las categorías formateadas para WordPress
    const formattedCategories = document.getElementById("categories").value.split(",").map(c => c.trim()).map(category => `<category domain="category"><![CDATA[${category}]]></category>`).join("\n    ");
    

    // Nueva plantilla XML para WordPress
    const xmlTemplate = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
     xmlns:excerpt="http://wordpress.org/export/1.2/excerpt/"
     xmlns:content="http://purl.org/rss/1.0/modules/content/"
     xmlns:dc="http://purl.org/dc/elements/1.1/"
     xmlns:wp="http://wordpress.org/export/1.2/">

  <channel>
    <language>es-ES</language>

    <item>
      <title><![CDATA[${blog.title}]]></title>
      
      <excerpt:encoded><![CDATA[${blog.description}]]></excerpt:encoded>
      <content:encoded><![CDATA[${blog.content}]]></content:encoded>

      ${formattedCategories}

      <wp:post_id>0</wp:post_id>
      <wp:post_date>${new Date().toISOString().slice(0, 19).replace("T", " ") }</wp:post_date>
      <wp:post_type>post</wp:post_type>
      <wp:status>publish</wp:status>
    </item>
  </channel>
</rss>`;

    // Crear el archivo XML y forzar su descarga
    const blob = new Blob([xmlTemplate], { type: "application/xml" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `blog_${language}.xml`;
    a.click();
}

