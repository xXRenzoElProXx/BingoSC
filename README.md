# 🎉 **Bingo Virtual - Seguidores de Cristo** 🎯

<div align="center">
  <img src="Archivos Media/logo.ico" alt="Logo Bingo Virtual" width="150">
</div>

Bienvenido al proyecto **Bingo Virtual**, una aplicación interactiva que combina diversión y tecnología. Diseñado para **eventos juveniles**, **reuniones familiares** o **actividades parroquiales**, este sistema hace que jugar bingo sea más dinámico e intuitivo.

---

## 🚀 **Características Principales**

### 🎯 **Juego Versátil**
- **Figuras personalizadas**: Escoge entre cruz, apagón, cuadrado y más.
- **Cartillas múltiples**: Soporte para diferentes jugadores.

### ✅ **Validación Inteligente**
- Garantiza que solo se ingresen números válidos.
- Evita números duplicados automáticamente.

### 🏆 **Ganadores Automáticos**
- Detecta y anuncia automáticamente al ganador al completar una figura.
- Efectos visuales y alertas sonoras 🎊.

### 📱 **Interfaz Moderna**
- Diseño responsive con **Bootstrap**.
- Efectos interactivos y amigables.

---

## 📋 **Requisitos del Sistema**
> ¡No necesitas grandes configuraciones para disfrutar del Bingo Virtual!

- Navegador moderno: **Google Chrome**, **Firefox**, etc.
- Servidor local para cargar los archivos JSON (opcional).

---

## 🛠️ **Instalación y Configuración**

1. **Clona el Repositorio**:
   ```bash
   git clone https://github.com/tu-usuario/bingo-virtual.git
   cd bingo-virtual
## 2. **Verifica los Archivos:**

- **index.html**: Página principal.
- **styles.css**: Estilos personalizados.
- **Carpeta Scripts**: Contiene los archivos de lógica (`script.js` y `confetti.js`).
- **Carpeta Datos**: Incluye configuraciones de figuras y cartillas en formato JSON.
  
  📌 **Nota**: Las cartillas están en `Datos/cartillas.json`. Puedes reemplazarlas según las cartillas que uses en tu evento. Actualmente, el sistema ha sido probado con **50 cartillas generadas aleatoriamente**.

## 3. **Ejecuta el Proyecto:**

- Abre `index.html` directamente en el navegador.
- Alternativamente, usa un servidor local como [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer).

<div align="center">
  <img src="Archivos Media/preview.gif" alt="Vista previa del Bingo Virtual" width="70%">
</div>

## 📖 **Guía de Uso**

1️⃣ **Selecciona una Figura**  
   Escoge una figura desde el menú desplegable y haz clic en **"Generar Figura"**.

2️⃣ **Ingresa un Número**  
   Escribe un número entre **1 y 75** y presiona **"Marcar"**.

3️⃣ **Revisa el Progreso**  
   Observa cómo se marcan los números en las cartillas de los jugadores.

4️⃣ **Configura tus Cartillas**  
   Modifica el archivo `cartillas.json` en la carpeta `Datos` con tus propias cartillas.  
   **Sugerencia**: Puedes generar cartillas utilizando herramientas online o software como Excel.

5️⃣ **Anuncio del Ganador**  
   El sistema te notificará automáticamente cuando alguien complete la figura.  
   🎉 ¡Déjate sorprender con confeti y sonidos especiales!

## 📂 **Estructura del Proyecto**

```plaintext
bingo-virtual/
├── Archivos Media/
│   ├── bingo-sound.mp3
│   ├── logo.ico
│   ├── preview.gif
├── Datos/
│   ├── cartillas.json
│   ├── figuras.json
├── Scripts/
│   ├── script.js
│   ├── confetti.js
├── styles.css
├── index.html
