# 🧮 Calculadora de Variables y Parciales

Una aplicación web ligera y autocontenida en un solo archivo (`index.html`), desarrollada únicamente con **HTML5, CSS3 y JavaScript puro**. Diseñada para realizar cálculos de variables, evaluar expresiones parciales y obtener resultados en tiempo real sin necesidad de servidores ni dependencias externas.

---

## ✨ Características Principales

* **Arquitectura de Archivo Único:** Todo el código (estructura, estilos y lógica) vive dentro de un único archivo `.html`, lo que facilita su transporte, respaldo y despliegue.
* **Cálculo de Variables:** Permite definir, asignar y reutilizar variables dinámicas dentro de tus operaciones.
* **Evaluación de Parciales:** Desglosa y calcula resultados intermedios o subtotales antes de llegar al resultado final.
* **Cero Dependencias:** No requiere Node.js, npm, frameworks ni conexión a internet para funcionar.
* **Multiplataforma:** Compatible con cualquier navegador web moderno (Chrome, Firefox, Edge, Safari) en computadoras o dispositivos móviles.
* **Interfaz Responsiva:** Diseño limpio que se adapta a distintos tamaños de pantalla.

---

## ⚙️ ¿Cómo funciona?

La aplicación opera completamente del lado del cliente (en el navegador del usuario) siguiendo este flujo:

1. **Entrada de Datos:** El usuario ingresa valores numéricos, asigna nombres a variables ejmplo: `x = 10`, `iva = 0.16` o escribe fórmulas parciales en la interfaz.
2. **Procesamiento en Memoria:** JavaScript captura los eventos del DOM, almacena las variables en un objeto de estado temporal y evalúa las expresiones matemáticas de forma segura.
3. **Cálculo de Parciales:** Cada bloque o sección calcula su propio subtotal de manera independiente.
4. **Renderizado Instantáneo:** Los resultados parciales y el total general se actualizan automáticamente en pantalla sin recargar la página y sus graficos.

---

## 🚀 Instalación y Uso

Al tratarse de una aplicación estática de un solo archivo, no requiere un proceso de instalación complejo.

### Opción 1: Ejecución directa (Más rápida)
1. Descarga el archivo `index.html` (o clona este repositorio).
2. Ubica el archivo en tu computadora.
3. Haz **doble clic** sobre `index.html` para abrirlo directamente en tu navegador web predeterminado.

### Opción 2: Usando un servidor local (Opcional, para desarrollo)
Si deseas modificar el código y ver los cambios en vivo:
1. Abre la carpeta del proyecto en **Visual Studio Code**.
2. Instala la extensión **Live Server**.
3. Haz clic derecho sobre `index.html` y selecciona **"Open with Live Server"**.

---

##  Estructura del Proyecto

```text
├── index.html   # Contiene toda la estructura HTML
├── styles.css   # Contiene los estilos
├── script.js    #Contiene la logica de programacion
└── README.md    # Documentación del proyecto
```

---

##  Tecnologías Utilizadas

* **HTML5:** Estructura semántica de la calculadora y formularios de entrada.
* **CSS3:** Estilos, variables CSS (`:root`), Flexbox/Grid para la distribución y diseño responsivo.
* **JavaScript (ES6+):** Manipulación del DOM, gestión de estado en memoria y lógica matemática.

---

##  Contribuciones

Las contribuciones son bienvenidas. Si deseas mejorar la calculadora:
1. Haz un *Fork* del proyecto.
2. Crea una rama para tu mejora (`git checkout -b feature/nueva-funcion`).
3. Realiza tus cambios en el archivo `index.html` manteniendo la filosofía de cero dependencias.
4. Envía un *Pull Request*.

---
