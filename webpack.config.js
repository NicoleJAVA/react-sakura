const webpack = require('webpack');

module.exports = {
    entry:'./src/index.jsx',
    devtool:'source-map',
    module:{
        rules:[
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
              },
              //加载scss|less|css等样式文件
              {
                test: /\.(scss|less|css)$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
              },
        ]
    },
    resolve:{
        extensions:['*','.js','.jsx']
    },
    output:{
        path: __dirname + '/dist',
        publicPath:'/',
        filename:'samples.js'
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin(),
    ],
    devServer:{
        contentBase:'./dist',
        hot:true,
        host:'localhost',
        port:3000,
        proxy:{
            '/api':'http://localhost:8000',
            '/images':'http://localhost:8000',
        }
    }
}