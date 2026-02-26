/*
Archivo JavaScript para TecnoEmprender
Contiene la funcionalidad interactiva del sitio web:
- Generación de enlaces de WhatsApp
- Sistema de pestañas (tabs) en la sección Soluciones

Para modificar:
- Cambiar WHATSAPP_NUMBER por tu número de WhatsApp (formato internacional sin +)
- Modificar los mensajes de WhatsApp en las llamadas a wa()
- Para agregar más pestañas, copiar la estructura existente y actualizar los IDs
*/

// CONFIGURACIÓN DE WHATSAPP
// Número de WhatsApp en formato internacional (sin + ni espacios)
// Ejemplo: Para +57 315 6090975 → "573156090975"
const WHATSAPP_NUMBER = "573156090975"; // Reemplaza con tu número

// FUNCIÓN PARA GENERAR ENLACES DE WHATSAPP
// Recibe un mensaje y devuelve la URL completa de WhatsApp
// Uso: wa("Hola, mensaje personalizado") → "https://wa.me/573156090975?text=Hola%2C%20mensaje%20personalizado"
function wa(msg) {
   return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

// CONFIGURACIÓN DE ENLACES DE WHATSAPP
// - Cualquier <a> con data-wa tendrá el enlace automático
// - waFloat: Botón flotante de WhatsApp
document.querySelectorAll("a[data-wa]").forEach(a => {
   if (a && typeof a.setAttribute === "function") {
      a.setAttribute("href", wa("Hola, vengo de TecnoEmprender."));
   }
});

const waFloat = document.getElementById("waFloat");
if (waFloat) waFloat.href = wa("Hola, vengo de TecnoEmprender.");

// FUNCIONALIDAD DE PESTAÑAS (TABS)
// Sistema interactivo para la sección "Soluciones según tu negocio"
// Permite alternar entre diferentes tipos de negocio (Turismo, Eventos, Salud, Servicios)

// Selecciona todos los botones de pestaña y les asigna el evento click
document.querySelectorAll(".tabbtn").forEach(btn => {
   btn.onclick = () => {
      // 1. Desactiva todos los botones (remueve aria-selected="true")
      document.querySelectorAll(".tabbtn").forEach(b => b.setAttribute("aria-selected", "false"));

      // 2. Oculta todos los paneles (remueve clase "active")
      document.querySelectorAll(".tabpanel").forEach(p => p.classList.remove("active"));

      // 3. Activa el botón clickeado (agrega aria-selected="true")
      btn.setAttribute("aria-selected", "true");

      // 4. Muestra el panel correspondiente usando el atributo aria-controls del botón
      // aria-controls="t1" → busca elemento con id="t1"
      document.getElementById(btn.getAttribute("aria-controls")).classList.add("active");
   };
});

/*
INSTRUCCIONES PARA DESARROLLADORES FUTUROS:

1. WHATSAPP:
   - El número debe estar en formato internacional sin símbolos
   - Los mensajes se pueden personalizar cambiando el texto en las llamadas a wa()
   - Para probar: Copia la URL generada y pégala en un navegador

2. PESTAÑAS:
   - Cada botón debe tener aria-controls="ID_DEL_PANEL"
   - Cada panel debe tener id="ID_DEL_PANEL" y class="tabpanel"
   - El panel activo debe tener class="active" además de "tabpanel"
   - Para agregar pestañas: Copiar estructura HTML + actualizar este código si es necesario

3. ACCESIBILIDAD:
   - Los atributos aria-selected y aria-controls mejoran la accesibilidad
   - El sistema funciona sin JavaScript (los paneles se muestran todos)
   - Con JS activado, solo se muestra el panel seleccionado

4. DEPURACIÓN:
   - Verificar que los IDs en aria-controls coincidan con los ids de los paneles
   - Asegurarse de que los elementos con id existan en el HTML
*/

// ANIMACIÓN DE ESTADÍSTICAS
// Anima los números de estadísticas cuando la sección es visible
function animateStats() {
  const stats = document.querySelectorAll('.stat-number');
  
  stats.forEach(stat => {
    const target = parseInt(stat.getAttribute('data-target'));
    const customSuffix = stat.getAttribute('data-suffix');
    let suffix = '%';
    
    if (customSuffix) {
      suffix = customSuffix;
    } else if (stat.textContent.includes('%')) {
      suffix = '%';
    } else {
      suffix = '+';
    }
    
    let current = 0;
    const increment = target / 50; // Velocidad de animación
    const duration = 2000; // 2 segundos
    const stepTime = duration / 50;
    
    // Resetear el valor inicial
    if (customSuffix) {
      stat.textContent = suffix + '0';
    } else {
      stat.textContent = '0' + suffix;
    }
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        if (customSuffix) {
          stat.textContent = suffix + target;
        } else {
          stat.textContent = target + suffix;
        }
        clearInterval(timer);
      } else {
        if (customSuffix) {
          stat.textContent = suffix + Math.floor(current);
        } else {
          stat.textContent = Math.floor(current) + suffix;
        }
      }
    }, stepTime);
  });
}

// Observador para iniciar animación cuando la sección sea visible
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateStats();
    }
  });
}, { threshold: 0.5 });

// Observar la sección de estadísticas
const statsSection = document.querySelector('.stat-number');
if (statsSection) {
  observer.observe(statsSection.parentElement.parentElement.parentElement);
}