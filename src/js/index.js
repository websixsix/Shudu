const Grid = require("./ui/grid");
const Popupnumber = require("./ui/popupnumbers");

const grid = new Grid($("#container"));
const pop = new Popupnumber($("#popupNumbers"));
grid.build();
grid.layout();
grid.bindpop(pop);

$("#check").on("click",e => {
    grid.check();
});
$("#reset").on("click",e => {
    grid.reset();
});
$("#clear").on("click",e => {
    grid.clear();
});
$("#rebuild").on("click",e => {
    grid.rebuild();
});