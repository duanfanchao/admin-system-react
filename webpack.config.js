const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = (env, argv) => {
    const isProduction = argv.mode === 'production';
    return {
        mode: isProduction ? 'production' : 'development',
        entry: './src/index.js',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'bundle.[contenthash].js',
            clean: true, // 自动清理 dist 文件夹
            publicPath: '/',
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: 'babel-loader',
                },
                {
                    test: /\.s[ac]ss$/,
                    exclude: /\.module\.s[ac]ss$/,
                    use: ['style-loader', 'css-loader', 'sass-loader'],
                },
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader'], // 不要用 sass-loader 处理纯 CSS
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
            new Dotenv(),
        ],
        resolve: {
            extensions: ['.js', '.jsx'], // 自动解析扩展名
            alias: {
                '@': path.resolve(__dirname, 'src/'),
            },
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
    }
};