import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';

const host = process.env.HOST;
const port = parseEnvNumber(process.env.PORT);
const hmrPort = parseEnvNumber(process.env.HMR_PORT);

export default defineConfig({
    plugins: [
        vue(),
        vueDevTools(),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
    envDir: '../',

    server: {
        host,
        port,
        hmr: {
            port: hmrPort,
        },
    },
});

function parseEnvNumber (value: string | undefined): number | undefined {
    return value !== undefined ? Number(value) : undefined;
}
