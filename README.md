#  Calculadora de Variables y Parciales

Una aplicación web ligera y directa desarrollada íntegramente con tecnologías nativas (**HTML5, CSS3 y JavaScript**), diseñada para calcular variables y derivadas/resultados parciales de manera rápida, visual e intuitiva sin necesidad de servidores ni dependencias externas.

---

##  Características Principales

* **Arquitectura Ligera:** 100% desarrollada en Vanilla JS, HTML y CSS puro. No requiere Node.js, npm, ni frameworks pesados.
* **Cálculo en Tiempo Real / Instantáneo:** Procesamiento rápido de variables y parciales directamente en el navegador del cliente.
* **Interfaz Intuitiva:** Selección clara de modos de operación y entrada de datos guiada.
* **Multiplataforma:** Funciona en cualquier navegador moderno (Chrome, Firefox, Edge, Safari) tanto en escritorio como en dispositivos móviles.

---

##  Estructura del Proyecto

El repositorio mantiene una estructura plana y limpia para facilitar su despliegue y mantenimiento:

```text
C:.
├── app.js                     # Lógica de cálculo, validación de datos y manipulación del DOM
├── Entrada_Datos.png          # Captura de pantalla: interfaz de ingreso de variables
├── index.html                 # Estructura principal y maquetado de la aplicación
├── Observar_Resultados.png    # Captura de pantalla: visualización de los cálculos obtenidos
├── Seleccionar_Opcion.png     # Captura de pantalla: menú de selección de tipo de cálculo
└── styles.css                 # Hojas de estilo, diseño responsivo y temas visuales
```

---

## 🚀 Instalación y Uso

Al tratarse de una aplicación web estática (Client-Side), no requiere un proceso de compilación ni instalación compleja.

### Opción 1: Ejecución directa (Más rápida)
1. Descarga o clona este repositorio en tu equipo local:
   ```bash
   git clone https://github.com
   ```
2. Abre la carpeta del proyecto.
3. Haz doble clic sobre el archivo **`index.html`** para abrirlo directamente en tu navegador web predeterminado.

### Opción 2: Usando un servidor local (Recomendado para desarrollo)
Si utilizas Visual Studio Code:
1. Abre la carpeta del proyecto en VS Code.
2. Instala la extensión **Live Server**.
3. Haz clic derecho sobre `index.html` y selecciona **"Open with Live Server"**.

---

## 🖥️ Flujo de Funcionamiento (Capturas de Pantalla)

### 1. Seleccionar Opción
El usuario elige el tipo de operación, variable o método parcial que desea resolver.

### 2. Entrada de Datos
Se despliegan los campos correspondientes donde se ingresan los valores numéricos o expresiones requeridas.

### 3. Observar Resultados
Al procesar la información, la aplicación muestra el desglose y el resultado final de forma clara.

---

## 🛠️ Documentación Técnica (Estructura del Código)

* **`index.html`**: Contiene los contenedores principales (`<form>`, `<select>`, `<input>`) y vincula los estilos y scripts.
* **`styles.css`**: Define la paleta de colores, el layout (Flexbox/Grid) y los estados visuales de botones y tarjetas de resultados.
* **`app.js`**: 
  * Escucha los eventos del DOM (`DOMContentLoaded`, `change`, `submit` / `click`).
  * Valida que los campos de entrada no estén vacíos y contengan formatos válidos.
  * Ejecuta las fórmulas matemáticas para el despeje de variables y cálculo de parciales.
  * Inyecta dinámicamente los resultados en el HTML.

---
