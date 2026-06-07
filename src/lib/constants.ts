/**
 * Configuración de APIs
 * 
 * Para OMDb API, obtén tu clave gratuita en: http://www.omdbapi.com/apikey.aspx
 * Es necesario confirmar el email que te envían para activar la clave.
 */

// NOTA: Si ves un error 401, es que esta clave ha caducado o llegado a su límite.
// Por favor, genera una propia en el enlace de arriba y cámbiala aquí.
export const OMDB_API_KEY = process.env.NEXT_PUBLIC_OMDB_API_KEY || '6453000b'; 

export const OMDB_BASE_URL = 'https://www.omdbapi.com/';