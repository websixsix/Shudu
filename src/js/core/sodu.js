//生成数独游戏

// 1. 生成完成的解决方案 （√）
//2.随机去除一部分数据：按比例

const Generator = require("./generator");


module.exports = class Sodu{
    constructor(){
        const generator = new Generator();
        generator.generate();
        this.completeShudu =generator.shudu;
    }
    //随机挑出无值区域
    make(level){
        this.puzzleShudu = this.completeShudu.map(row => {
            return row.map(cell => Math.random() * 9 < level ? 0:cell);
        });
        /*
        this.puzzleShudu = this.completeShudu.map(row => row.map(cell => {
            return Math.random() * 9 < level 0 : cell;
        }));
        */
    }

};