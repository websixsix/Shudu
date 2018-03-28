//检查数独解决方案

const Toolkit = require("./toolkit");
//输入：用户补充完成的九宫格 数独游戏 矩阵
//处理：把错误的数组元素添加error的class
//输出：alert成功或失败 并输出marks
module.exports = class Checker{
    constructor(shudu){
        this._shudu = shudu;
        this._shuduMarks = Toolkit.shudu.makeShudu(true);
    }
    //检查一个数组的方法
    checkArray(array){
        const length = array.length;
        const marks = new Array(length);
        marks.fill(true);
        for(let i = 0;i < length; i++){
            if(!marks[i]){
                continue;
            }
            const value = array[i];
            //检查值是否为零或已为false
            if(!value){
                marks[i] = false;
                continue;
            }
            //检查后面的值是否重复
            for(let j = i + 1;j < length ; j++){
                if(value === array[j]){
                    marks[i] = marks[j] = false ;
                }
            }
        }
        return marks;
    }

    get shuduMarks(){
        return this._shuduMarks;
    }
    get isSuccess(){
        return this._success;
    }
    check(){
        this.checkRows();
        this.checkCols();
        this.checkBoxes();
        this._success = this._shuduMarks.every((row => row.every(mark => mark)));
        return this._success;
    }
    checkRows(){
        for(let rowIndex = 0; rowIndex < 9; rowIndex ++){
            const rows = this._shudu[rowIndex];
            const marks = this.checkArray(rows);
            // 将marks转入大marks矩阵中
            for(let colIndex = 0; colIndex < marks.length ; colIndex++){
                if(!marks[colIndex]) {
                    this._shuduMarks[rowIndex][colIndex] = false;
                }
            }
        }
    }
    checkCols(){
        for(let colIndex = 0; colIndex < 9 ; colIndex++){
            const cols = [];
            for(let rowIndex = 0; rowIndex < 9 ; rowIndex++){
                cols[rowIndex] = this._shudu[rowIndex][colIndex];
            }
            const marks = this.checkArray(cols);
            for(let i = 0; i < marks.length; i++){
                if(!marks[i]){
                    this._shuduMarks[i][colIndex] = false;
                }
            }

        }
    }
    checkBoxes(){
        for(let boxIndex = 0;boxIndex < 9;boxIndex++){
            const boxes = Toolkit.box.getboxCells(this._shudu,boxIndex);
            const marks = this.checkArray(boxes);
            for(let cellIndex = 0;cellIndex < marks.length; cellIndex++){
                if(!marks[cellIndex]){
                    const { rowIndex, colIndex} = Toolkit.box.fromboxNumber(boxIndex, cellIndex);
                    this._shuduMarks[rowIndex][colIndex] = false;
                }
            }
        }
    }
};
/*
const Generator = require("./generator");
const gen = new Generator();
gen.generate();
const shudu = gen.shudu;
const checker = new Checker(shudu);
console.log("check result",checker.check());
console.log(checker.shuduMarks);

shudu[1][1] = 0;
shudu[2][2] = shudu[3][5] = 5;
const checker2 = new Checker(shudu);
console.log("check result",checker2.check());
console.log(shudu);
console.log(checker2.shuduMarks);
*/