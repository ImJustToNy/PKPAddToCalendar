import { chromeExtension, simpleReloader } from 'rollup-plugin-chrome-extension'
import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';

export default {
    input: 'src/manifest.json',
    output: {
        dir: 'dist',
        format: 'esm',
    },
    onwarn: function(warning, warn) {
        if (warning.message.startsWith('Use of eval in "node_modules/pdfjs-dist/build/pdf.js')) return;
        warn(warning);
    },
    plugins: [
        chromeExtension(),
        simpleReloader(),
        nodeResolve({
            browser: true,
        }),
        commonjs(),
        typescript()
    ]
};