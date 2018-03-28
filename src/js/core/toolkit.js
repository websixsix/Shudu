//工具集
/*
矩阵工具
 */

const shuduToolkit = {
    makeRow(v = 0) {
        const array = new Array(9);
        array.fill(v);
        return array;
    },
    makeShudu(v = 0) {
        return Array.from({length:9},() => this.makeRow(v))
    },

    // 洗牌算法Fisher-Yates
    shuffle(array) {
        const endIndex = array.length - 2;
        const length = array.length;
        for(let i = 0;i <= endIndex;i++){
            const j = i + Math.floor(Math.random() * (length - i));
            [array[i],array[j]]=[array[j],array[i]];
        }
        return array;
    },
    //检查填写的数是否可以填写
    checkFill(shudu, n, rowIndex, colIndex){
        const row = shudu[rowIndex];
        const col = this.makeRow().map((v,i) => shudu[i][colIndex]);
        const { boxIndex } = boxToolkit.getboxNumber(rowIndex ,colIndex);
        const box = boxToolkit.getboxCells(shudu , boxIndex);
        for(let i = 0 ; i < 9 ; i++){
            if(row[i] === n
                || col[i] === n
                || box[i] === n){
                return false;
            }
        }
        return true;
    }
};

const boxToolkit = {
    //获取宫所有值
    getboxCells( shudu, boxIndex){
        const starRow = Math.floor(boxIndex / 3) * 3;
        const starCol = boxIndex % 3 * 3;
        const result = [];
        for(let cellIndex = 0; cellIndex < 9 ; cellIndex++){
            const rowIndex = starRow + Math.floor(cellIndex / 3);
            const colIndex = starCol + cellIndex % 3 ;
            result.push(shudu[rowIndex][colIndex]);
        }
        return result;
    },
    // 获取宫的位置信息及格子在宫内排序信息
    getboxNumber( rowIndex, colIndex){
        return {
            boxIndex : 3 * Math.floor(rowIndex / 3) + Math.floor(colIndex / 3),
            cellIndex : rowIndex % 3 * 3 + colIndex % 3
        }
    },
    //获取宫在大矩阵里的位置信息
    fromboxNumber(boxIndex ,cellIndex){
        return {
            rowIndex: Math.floor(boxIndex / 3) * 3 + Math.floor(cellIndex / 3) ,
            colIndex: boxIndex % 3 * 3 + cellIndex % 3
        }
    }
};

/*
宫坐标系工具
 */
module.exports = class Toolkit{
    // 矩阵相关工具
    static get shudu(){
        return shuduToolkit;
    }

    //宫坐标系工具
    static get box(){
        return boxToolkit;
    }
};