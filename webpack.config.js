const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, argv) => ({
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.[contenthash].js',
        clean: true, // 自动清理 dist 文件夹
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
            {
                test: /\.(css|scss)$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
        }),
    ],
    resolve: {
        extensions: ['.js', '.jsx'], // 自动解析扩展名
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
            serveIndex: false, // 替代原来的 devMiddleware.index
        },
        proxy: [
            {
                context: ['/api'],  // 使用context数组替代路径前缀
                target: 'http://localhost:3002',
                changeOrigin: true,
                pathRewrite: { '^/api': '/api' }  // 通常重写为去掉/api前缀
            }
        ],
        port: 3000,
        hot: true,
        historyApiFallback: true, // 支持 React Router
    },
});