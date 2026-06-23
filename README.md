# CineSearch 🎬 - Anti-Slop Entertainment Discovery

CineSearch es una plataforma premium de descubrimiento de contenido (Películas, Series y Anime) construida bajo los principios de **Taste Skill v2**. La aplicación está diseñada para ofrecer una experiencia visual de alto nivel, eliminando la estética genérica de las IAs mediante un enfoque en tipografía, espaciado y movimiento refinado.

## 🚀 Características Principales

- **Anti-Slop UI/UX**: Interfaces limpias, con jerarquía visual clara y sin desbordamientos de contenedores.
- **Paginación Inteligente**: Sistema de 10 ítems por página con precarga de skeletons.
- **Multilenguaje**: Soporte nativo para Inglés y Español.
- **IA Recommendations**: Integración con Genkit para recomendaciones basadas en contexto.
- **Real-time API**: Conexión robusta con OMDb para datos verídicos y actualizados.
- **Glassmorphism**: Navegación fluida con efectos de transparencia y desenfoque.

## 🛠️ Stack Tecnológico

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS + ShadCN UI
- **AI Engine**: Genkit (Google Gemini)
- **Data Source**: OMDb API
- **Package Managers**: Totalmente compatible con `npm`, `yarn` y `pnpm`.

## 📦 Instalación y Desarrollo

### Requisitos Previos
1. Una clave de API de [OMDb](http://www.omdbapi.com/apikey.aspx) activada.
2. Configurar la clave en `src/lib/constants.ts`.

### Comandos de Instalación

```bash
# Con npm
npm install

# Con yarn
yarn install

# Con pnpm
pnpm install
```

### Iniciar Servidor de Desarrollo

```bash
# Con npm
npm run dev

# Con yarn
yarn dev

# Con pnpm
pnpm dev
```

## 🧠 Lógica de Diseño (Taste Skill)

- **VARIANCE**: Se aplica una cuadrícula dinámica que se adapta perfectamente desde resoluciones móviles (1 columna) hasta pantallas ultra-wide (5 columnas).
- **MOTION**: Transiciones suavizadas de 500ms con curvas de Bézier personalizadas (`cubic-bezier(0.23, 1, 0.32, 1)`).
- **CONTAINMENT**: Blindaje de contenedores para asegurar que el contenido hijo (ratings, títulos, géneros) nunca sobrepase los límites del padre, manteniendo la integridad visual.

## 🚧 Futuro Escalable

1. **Autenticación Completa**: Habilitar Firebase Auth para perfiles de usuario persistentes.
2. **Social Features**: Listas compartidas, reseñas de usuarios y foros de discusión.
3. **Advanced Filtering**: Filtros por año, género y rating directamente en las páginas de categoría.
4. **Offline Mode**: Cacheo avanzado de datos para consulta sin conexión a internet.
5. **Watchlist Sync**: Sincronización entre dispositivos mediante Firestore.

---

Desarrollado con ❤️ para ser el estándar de interfaces premium construidas con IA.