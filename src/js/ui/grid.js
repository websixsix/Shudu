//生成界面 面板

const Toolkit = require("../core/toolkit");
const Sodu = require("../core/sodu");
const popupNumbers = require("./popupnumbers");
const Checker = require("../core/checker");
// const Generator = require("../core/generator");

class Grid {
    constructor(container){
        this._$container = container;
    }

    build(){
        const sd = new Sodu();
        sd.make(5);
        //const gen = new Generator();
        //gen.generate();
        const shudu =sd.puzzleShudu;
        const rowGrupClasses = ["row_g_top","row_g_mid","row_g_bot"];
        const colGrupClasses = ["col_g_top","col_g_mid","col_g_bot"];

        const $cells = shudu.map(rowValues => rowValues.map((cellValue,colIndex) => {
            return $("<span>")
                .addClass(colGrupClasses [colIndex % 3])
                .addClass(cellValue ? "fixed":"empty")
                .text(cellValue);
        }));

        const $divArray = $cells.map(($spanArray,rowIndex) => {
            return $("<div>")
                .addClass("row")
                .addClass(rowGrupClasses [rowIndex % 3])
                .append($spanArray);
        });

        this._$container.append($divArray);
    }
    layout(){
        /* let sonObj = document.getElementsByClassName('row')[0].getElementsByTagName('span')[0];
        const width = sonObj.offsetWidth;*/

        const width = $("span:first",this._$container).width();
        $("span",this._$container)
            .height(width)
            .css({
                "line-height":`${width}px`,
                "font-weight": width < 32 ? `${width / 2 }px`:""
            })
    }
    //绑定弹出框
    bindpop(popupNumbers){
        this._$container.on("click","span",e => {
            const $Cell = $(e.target);
            if($Cell.hasClass("fixed")){
                return;
            }
            popupNumbers.popup($Cell);
        })
    }
    //检查按钮 =>  获取数组数据 => 检查 然后输出结果并 标记error
    check(){
        const data = this._$container.children()
            .map((rowIndex, div) => {
            return $(div).children().map((colIndex, span) =>
                parseInt($(span).text()) || 0)
            })
            .toArray()
            .map($data => $data.toArray());
       // console.log(data);
        const checker = new Checker(data);
        if(checker.check()){
            alert("全对，恭喜！")
            return true;
        }
        //标记错误
        const marks = checker.shuduMarks;
        //console.log(marks);
        this._$container.children()
            .each((rowIndex,div) => {
                $(div).children()
                    .each((colIndex, span) => {
                        if(marks[rowIndex][colIndex] || $(span).hasClass("fixed")){
                            $(span).removeClass("error");
                        }else {
                            $(span).addClass("error");
                        }
                    })
            })

    }
    //重置按钮 => 清除所有标记、数值 => 转化为empty
    reset(){
        this._$container.find("span:not(.fixed)")
            .removeClass("error mark1 mark2")
            .addClass("empty")
            .text(0);
        /*
        this._$container.children()
            .each((rowIndex ,div) => {
            $(div).children()
                .each((colIndex ,span) => {
                    if($(span).hasClass("fixed")){
                        return;
                    }
                    $(span).removeClass("error mark1 mark2")
                        .addClass("empty")
                        .text(0);
                })
        })
        */
    }
    //清理按钮 => 清除error标记及数值
    clear(){
        this._$container.find("span.error")
            .removeClass("error");
        /*
        this._$container.children()
            .each((rowIndex,div) => {
                $(div).children()
                    .removeClass("error");
            })
        */
    }
    //重建按钮 => 清除原矩阵 => 建立新矩阵
    rebuild(){
        this._$container.empty();
        this.build();
        this.layout();
    }
}
module.exports =  Grid ;
