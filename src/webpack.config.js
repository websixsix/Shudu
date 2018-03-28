

module.exports = {
    entry:{
        index:"./js/index"
    },
    output:{
        filename:"[name].js"
    },
    devtool:"source-map",
    resolve:{
        extensions:[".js"]
    },
    module:{
        rules:[
            {
                test:/\.js$/,
                use:"babel-loader",
                exclude:["Project.Sd/src/node_modules"]
            }
        ]
    }
};