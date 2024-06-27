import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@site': resolve('src/site/src')
        }
    },
    server: {
        port: 4143,
        proxy: {
            '/socket.io': {
                target: 'ws://localhost:4143',
                ws: true
            }
        }
    },
    root: 'src/site',

    build: {
        outDir: 'out/site',
        rollupOptions: {
            input: {
                app: 'src/site/index.html'
            }
        }
    }
})
