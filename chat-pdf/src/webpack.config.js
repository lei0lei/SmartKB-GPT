const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        main: './src/index.tsx',
        'pdf.worker': path.join(__dirname, './node_modules/pdfjs-dist/build/pdf.worker.min.js'),
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].bundle.js'
    },
    plugins: [
        new webpack.NormalModuleReplacementPlugin(
            /^pdfjs-dist$/,
            resource => {
                resource.request = path.join(__dirname, './node_modules/pdfjs-dist/webpack');
            },
        ),
        
    ],
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        alias: {
            // Point to legacy build

            // For pdfjs-dist 2.7.570
            // 'pdfjs-dist': path.resolve('./node_modules/pdfjs-dist/es5/build/pdf.js'),

            // For pdfjs-dist 2.8.335 and later
            'pdfjs-dist': path.resolve('./node_modules/pdfjs-dist/legacy/build/pdf.js'),
        },
    },
};