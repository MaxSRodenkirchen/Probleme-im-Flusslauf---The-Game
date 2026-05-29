import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
    base: '/Probleme-im-Flusslauf---The-Game/',
    plugins: [
        VitePWA({
            registerType: 'autoUpdate',
            workbox: {
                maximumFileSizeToCacheInBytes: 30 * 1024 * 1024, // 30 MB
                globPatterns: ['**/*.{js,css,html,ico,png,svg,jpeg,jpg,ttf,woff2}'],
            },
            manifest: {
                name: 'Probleme im Flusslauf - The Game',
                short_name: 'Flusslauf-Spiel',
                description: 'Ein interaktives Lernspiel über Probleme im Flusslauf und die Kläranlage',
                theme_color: '#0f5e9c',
                background_color: '#ffffff',
                display: 'standalone',
                orientation: 'landscape',
                icons: [
                    {
                        src: 'pwa-192x192.png',
                        sizes: '192x192',
                        type: 'image/png'
                    },
                    {
                        src: 'pwa-512x512.png',
                        sizes: '512x512',
                        type: 'image/png'
                    },
                    {
                        src: 'pwa-512x512.png',
                        sizes: '512x512',
                        type: 'image/png',
                        purpose: 'any maskable'
                    }
                ]
            }
        })
    ]
})
