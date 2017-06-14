var webpack         = require('webpack');
var commonsPlugin   = new webpack.optimize.CommonsChunkPlugin('common.js');

module.exports = {
    //插件项
    plugins: [commonsPlugin],
    //页面入口文件配置
    entry: {
        index : './src/index.js'
    },
    //入口文件输出配置
    output: {
        path: 'dist/js/page',
        filename: '[name].js'
    },

    //  多入口数组形式
    //     entry: {
    //         page1: "./page1",
    //             //支持数组形式，将加载数组中的所有模块，但以最后一个模块作为输出
    //             page2: ["./entry1", "./entry2"]
    //     },
    //     output: {
    //         path: "dist/js/page",
    //             filename: "[name].bundle.js"
    //     }
    //


    //自定义配置
    // entry: {
    //     p1: "./page1",
    //     p2: "./page2",
    //     p3: "./page3",
    //     ap1: "./admin/page1",
    //     ap2: "./admin/page2"
    // },
    // output: {
    //     filename: "[name].js"
    // },
    // plugins: [
    //     new CommonsChunkPlugin("admin-commons.js", ["ap1", "ap2"]),
    //     new CommonsChunkPlugin("commons.js", ["p1", "p2", "admin-commons.js"])
    // ]

    module: {
        //加载器配置
        loaders: [
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            { test: /\.js$/, loader: 'jsx-loader?harmony' },
            { test: /\.scss$/, loader: 'style!css!sass?sourceMap'},
            { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}
        ]
    },
    //其它解决方案配置
    resolve: {
        root: 'E:/github/flux-example/src', //绝对路径
        extensions: ['', '.js', '.json', '.scss'],
        alias: {
            AppStore : 'js/stores/AppStores.js',
            ActionType : 'js/actions/ActionType.js',
            AppAction : 'js/actions/AppAction.js'
        }
    }
};