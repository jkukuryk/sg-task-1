const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: path.join(__dirname, '/src/index.ts'),
    stats: 'errors-only',
    module: getLoaders(),
    resolve: {
        extensions: ['.ts', '.js', '.json', '.png', '.jpg', '.mp3', '.svg', '.css', '.gif', '.mp4'],
        alias: {
            helper: plath.resolve(__dirname, './src/helper'),
            assets: path.resolve(__dirname, './src/assets'),
            ui: path.resolve(__dirname, './src/ui'),
            src: path.resolve(__dirname, './src'),
        },
    },
    plugins: [new webpack.ProvidePlugin({ 'window.decomp': 'poly-decomp' })],
};

/**
 * Loaders used by the application.
 */
function getLoaders() {
    const esbuild = {
        test: /\.tsx?$/,
        loader: 'esbuild-loader',
        options: {
            loader: 'tsx',
            target: 'es2015',
        },
        exclude: /node_modules/,
    };
    const fileLoader = [
        {
            test: /\.(png|jpg|svg|glb|mp3|gif|mp4)$/,
            loader: 'url-loader',
        },
    ];
    //remove css
    const cssLoader = {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
    };

    const loaders = {
        rules: [...fileLoader, cssLoader, esbuild],
    };

    return loaders;
}
