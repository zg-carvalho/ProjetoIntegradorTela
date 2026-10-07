const url = import.meta.env.VITE_INTEGRADOR_API_URL;

if (!url) {
    throw new Error('VITE_INTEGRADOR_API_URL NÃO DEFINIDO')
}

export const VITE_INTEGRADOR_API_URL = url.replace(/\/+$/,'')