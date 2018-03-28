//生成数独de解决方案
const Toolkit = require("./toolkit");


module.exports = class Generator {
    generate(){
        while(!this.internalgenerate()){
          console.warn("tryed");
        }
    }

    internalgenerate(){
        // TODO 入口方法
        this.shudu = Toolkit.shudu.makeShudu();
        // 随机选择列
        this.orders = Toolkit.shudu.makeShudu()
            .map(row => row.map((v,i) => i ))
            .map(row => Toolkit.shudu.shuffle(row));

        //  every
        for(let n = 1; n <= 9 ; n++){
            if(!this.fillNumber(n)){
                return false;
            }
        }
        return true;
    }

    fillNumber(n){
        return this.fillRow(n,0);
    }
    fillRow(n,rowIndex){
        if(rowIndex > 8){
            return true;
        }

        const row = this.shudu[rowIndex];
        // 随机选择列
        const orders = this.orders[rowIndex];
        for(let i = 0;i < 9; i++){
            const colIndex = orders[i];
            // 如果这个位置有值
            if(row[colIndex]){
                continue;
            }

            // 检查这个位置是否可以填 n
            if(!Toolkit.shudu.checkFill(this.shudu ,n , rowIndex, colIndex)){
                continue;
            }
            row[colIndex] = n;

            if(!this.fillRow(n,rowIndex+1)){
                row[colIndex] = 0;
                continue;
            }
            return true;
        }
        return false;
    }
};