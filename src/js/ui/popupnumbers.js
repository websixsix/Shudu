//弹出的操作面板

// 流程： Cell.onclick => pop.appear => pop.cell.onclick =>cell.fill n => pop.hidden

module.exports = class popupnumbers{
    constructor($pop){
        this._$pop = $pop.hide().removeClass("hidden");
        //回填数字 样式 及 空白
        this._$pop.on("click","span",e => {
            const $Cell = this._$Cell;
            const $span = $(e.target);
            if($span.hasClass("mark1")){
                if($Cell.hasClass("mark2")){
                    $Cell.removeClass("mark2");
                }
                if($Cell.hasClass("mark1")) {
                    $Cell.removeClass("mark1");
                }else{
                    $Cell.addClass("mark1");
                }
            }else if($span.hasClass("mark2")){
                if($Cell.hasClass("mark1")){
                    $Cell.removeClass("mark1");
                }
                if($Cell.hasClass("mark2")) {
                    $Cell.removeClass("mark2");
                }else{
                    $Cell.addClass("mark2");
                }
            }else if($span.hasClass("empty")){
                $Cell
                    .text(0)
                    .removeClass("mark2 mar1")
                    .addClass("empty");
            }else {
                //回填数字
                $Cell
                    .removeClass("empty")
                    .text($span.text());
            }
            this.hide();
        })
    }
    popup($Cell){
        this._$Cell = $Cell;
        const { left , top } = $Cell.position();
        const width = $(window).width();
        const height = $(window).height();
        this._$pop
            .css({
                left : `${width - left <130? width-130:left }px`,
                top : `${height - top <this._$pop.height()? height-this._$pop.height:top}px`
            })
            .show();
    }
    hide(){
        this._$pop.hide();
    }
};