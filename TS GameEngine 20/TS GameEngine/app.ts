
var engine:TSE.Engine;

// 应用程序的主要入口点。
window.onload = function () {
    engine = new TSE.Engine();
    engine.start();
}

window.onresize = function () {
    engine.resize();
}