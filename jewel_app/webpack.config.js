const path = require('path');
const webpack = require("webpack");
const htmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

// 这个配置文件 起始就是一个js文件，通过node中的模块操作，向外暴露一个配置对象
module.exports = {
	entry: path.join(__dirname, './src/main.js'),	// 入口告诉 webpack打包那个文件
	//打包输出路径
	output: {
		path:path.join(__dirname, './dist'),
		filename: 'bundle.js',	 // 指定输出的文件名称
	},
	// 启动配置
	devServer: {
		open: true,
		port: 5000,
		contentBase: 'src',
		hot:true
		
	},
	// 配置插件的节点
	plugins:[
		new webpack.HotModuleReplacementPlugin(),	// new 一个热更新的模块对象
		new htmlWebpackPlugin({	// 创建一个生产html页面模板的插件
		 //  根据指定页面路径，去生成内存中的页面
			template: path.join(__dirname, './src/demo.html'),	// 指定模板页面
			filename: 'index.html'
		}),
		new VueLoaderPlugin()
	],
	// webpack 默认只能处理js 类型的文件，无法处理其他非JS类型的文件;
	// 如果非要处理 非js类型的文件,我们需要手动安装一些适合第三方的loader 加载器
	// 处理css文件,需要安装npm i style-css css-loader -D 
	module: { //这个节点,用于配置 所有的第三方加载器
		rules: [
            { test: /\.css$/, use: ['style-loader', 'css-loader'] }, // 处理 CSS 文件的 loader
            { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] }, // 处理 less 文件的 loader
            { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] }, // 处理 scss 文件的 loader
            { test: /\.(jpg|png|gif|bmp|jpeg)$/, use: 'url-loader?limit=7631&name=[hash:8]-[name].[ext]' }, // 处理 图片路径的 loader
            // limit 给定的值，是图片的大小，单位是 byte， 如果我们引用的 图片，大于或等于给定的 limit值，则不会被转为base64格式的字符串， 如果 图片小于给定的 limit 值，则会被转为 base64的字符串
            { test: /\.(ttf|eot|svg|woff|woff2)$/, use: 'url-loader' }, // 处理 字体文件的 loader
            { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ }, // 配置 Babel 来转换高级的ES语法
			 { test: /\.vue$/, use: 'vue-loader' },	// 处理.vue 文件的插件
		]
	},
    resolve: {
        alias: { // 修改 Vue 被导入时候的包的路径
            "vue$": "vue/dist/vue.js"
        }
    }
}