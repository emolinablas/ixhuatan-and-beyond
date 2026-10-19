# Ixhuatán & Beyond — Guatemala Family Trip 2026 🇬🇹

Aplicación interactiva y visual diseñada para planificar, visualizar y organizar un viaje familiar y de amigos de 27 días (del 15 de noviembre al 11 de diciembre de 2026) a través de Guatemala y El Salvador.

Base del viaje: **Santa María Ixhuatán, Santa Rosa, Guatemala**.

---

## 🌟 Características Principales

- **🌐 Bilingüe (Español / English):** detecta el idioma del teléfono la primera vez; un toque para cambiar.
- **📅 Itinerario de 27 días con los planes definitivos:**
  - **🦃 Thanksgiving (25–30 Nov):** Cueva de Andá Mirá y pupusas en Ahuachapán → noche y comida de Thanksgiving en el Lago de Coatepeque → Grand Caporal (Chiquimula) → 2 noches en Río Dulce con lancha a Livingston → noche en Paragliding Chiquimula → casa.
  - **🎄 Diciembre (3–7 Dic):** 2 noches en Antigua (Casa Santo Domingo) y 2 en Panajachel (Hotel Atitlán).
  - Cada viaje trae su resumen (quién viaja, horas de manejo, hoteles, pasaportes), "antes de salir" y presupuesto editable. Tira de días fija, botón "Hoy" y horas de carretera por día.
- **🖨️ Imprimir / PDF:** versión en papel en el idioma activo, con números de emergencia, para la maleta de Bruce y Norma.
- **📶 Funciona sin señal (PWA):** se puede instalar en la pantalla de inicio; tras abrirla una vez con internet, el itinerario y el mapa funcionan en tramos sin cobertura.
- **👵 Accesible:** botón de texto grande (Aa / Aa+ / Aa++), zoom con los dedos habilitado, contraste AA, navegación por teclado y lector de pantalla.
- **🗺️ Mapa para ver lo que les espera:** pestañas *Todo el viaje / En casa / Thanksgiving / Diciembre*, una ruta a la vez sobre las carreteras reales (OpenStreetMap), con flechas de dirección y lancha punteada. Marcadores numerados con foto real donde duermen (🛏 noches), 🛂 en fronteras, y una historia día por día sacada del itinerario. **▶ Recorrer el viaje** anima un carrito por cada tramo. Cada lugar abre su ficha (qué harán cada día, facilidad para Emily y abuelos, ideas, Google Maps / Waze). Se carga solo al abrir la pestaña.
- **🎒 Equipaje y trámites:** checklist con "solo pendientes" e imprescindibles faltantes.
- **🆘 Emergencias tocables:** PROATUR 1500 (y su número desde teléfonos de EE.UU.), PNC 110, Bomberos 122, 911 en El Salvador y embajadas de EE.UU.

---

## 🗂️ Dónde editar el contenido

| Qué | Archivo |
| :-- | :-- |
| Planes de Thanksgiving y diciembre (resumen, "antes de salir", presupuesto) | `src/data/plans.ts` |
| Día a día de los dos viajes (días 11–16 y 19–23) | `src/data/planDays.ts` |
| Días fijos (llegada, descanso, despedida) | `src/data/baseDays.ts` |
| Destinos y lugares del mapa | `src/data/destinations.ts` |
| Viajeros y quién viaja en cada fase | `src/data/travelers.ts` |
| Equipaje / trámites | `src/data/packing.ts` |
| Números de emergencia | `src/data/contacts.ts` |
| Mapa: puntos y rutas por día | `src/data/routes.ts` (luego `npm run build:routes`) |
| Fotos reales de cada lugar (Wikimedia Commons, con crédito) | `src/data/photos.ts` |

El contenido viaja con el código y **no** se guarda en el teléfono: al publicar una versión nueva, todos la ven sin borrar caché. En el teléfono solo se guarda lo que la familia hace (equipaje marcado, lugares agregados, precios cotizados). En desarrollo, la consola avisa si falta o se repite algún día.

---

## 🚀 Tecnologías

- **React 18** + **TypeScript**
- **Vite** (Build Tool ultra rápido)
- **Tailwind CSS** (Diseño moderno, responsivo y mobile-first)
- **MapLibre GL** (Mapas interactivos vectoriales)
- **Lucide React** (Iconografía limpia)
- **Canvas Confetti** (Efectos visuales interactivos)

---

## 💻 Instalación y Desarrollo Local

1. **Clonar el repositorio:**
   ```bash
   git clone <url-del-repositorio>
   cd ixhuatan-and-beyond
   ```

2. **Usar Node 18 o más nuevo** (el repo trae `.nvmrc`):
   ```bash
   nvm use
   ```

3. **Instalar dependencias:**
   ```bash
   npm install
   ```

4. **Iniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```
   Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

5. **Compilar para producción:**
   ```bash
   npm run build
   ```

---

## ✈️ Familia Viajera
- **Anfitriones:** Ever & Cori, con sus hijas Isabella y la pequeña Emily (7 meses).
- **Visitantes Especiales de EE.UU.:** Bruce & Norma.
- **Familia Local:** Jonchito & Lidia, Doña Isabel y Nely.
