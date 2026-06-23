# CineSearch 🎬 - Premium Anti-Slop Discovery

CineSearch es una plataforma de descubrimiento de contenido (Películas, Series y Anime) diseñada bajo estándares de ingeniería de software de alto nivel y principios de diseño **Taste Skill v2**. La aplicación está optimizada para ofrecer una experiencia visual premium, eliminando el "slop" visual mediante una estructura rígida, tipografía refinada y movimientos fluidos.

## 🚀 Características Principales

- **Anti-Slop Architecture**: Diseño blindado donde los componentes nunca desbordan sus contenedores, asegurando integridad visual en cualquier resolución.
- **Multicategoría Inteligente**: Descubrimiento unificado de Películas, Series y Anime con paginación optimizada (10 ítems/página).
- **IA Recommendations**: Recomendaciones personalizadas impulsadas por Genkit y Google Gemini.
- **Internacionalización (i18n)**: Soporte completo para Inglés y Español con persistencia segura para evitar errores de hidratación.
- **Performance**: Carga progresiva con Skeletons y cacheo inteligente de datos (OMDb API).
- **Glassmorphism UI**: Navegación con efectos de transparencia y desenfoque (Backdrop Filter).

## 🛠️ Stack Tecnológico

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS + ShadCN UI
- **AI Engine**: Genkit (Google Gemini)
- **Data Source**: OMDb API
- **Persistence**: Safe LocalStorage Hook (SSR Friendly)

## 📦 Instalación y Desarrollo

La aplicación es totalmente compatible con `npm`, `yarn` y `pnpm`.

### 1. Requisitos Previos
Debes tener una clave de API de OMDb activa. Puedes obtener una gratuita en [omdbapi.com](http://www.omdbapi.com/apikey.aspx).

### 2. Configuración
Configura tu clave en el archivo `src/lib/constants.ts`:
```typescript
export const OMDB_API_KEY = 'TU_CLAVE_AQUI';
```

### 3. Comandos de Instalación

```bash
# Con npm
npm install

# Con yarn
yarn install

# Con pnpm
pnpm install
```

### 4. Ejecución
```bash
# Desarrollo
npm run dev # o yarn dev / pnpm dev
```

## 🧠 Lógica de Diseño

- **Containment**: Uso estricto de `overflow-hidden` y `shrink-0` para asegurar que ratings y títulos nunca rompan la cuadrícula.
- **Hydration Safety**: Implementación de un hook de persistencia que sincroniza el estado del cliente después del montaje inicial, eliminando desajustes entre el servidor y el cliente.
- **Motion**: Curvas de Bézier personalizadas (`cubic-bezier(0.23, 1, 0.32, 1)`) para transiciones de 500ms que elevan la sensación de calidad.

## 🚧 Futuro Escalable

1. **Watchlist en la Nube**: Integración con Firebase Firestore para sincronización entre dispositivos.
2. **Social Discovery**: Compartir recomendaciones generadas por IA directamente en redes sociales.
3. **Advanced Filtering**: Filtros avanzados por género, año y rating IMDb en tiempo real.
4. **PWA Support**: Capacidades offline para consultar la lista de favoritos sin conexión.

---
Desarrollado para ser el estándar de interfaces premium construidas con IA.
