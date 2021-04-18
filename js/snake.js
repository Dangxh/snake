var main = $("#main");
var showcanvas = true;//是否开启画布格子

/**
 * @name 地图对象构造
 * @param atom 原子大小宽和高一致
 * @param xnum X轴原子数量
 * @param ynum Y轴原子数量
 * @constructor
 */
function Map(atom, xnum, ynum){
    this.atom = atom;
    this.xnum = xnum;
    this.ynum = ynum;

    this.canvas = null;

    //创建画布的方法
    this.create = function(){
        this.canvas = document.createElement('div');
        this.canvas.style.cssText = "position: relative; top: 40px;border: 1px solid darkred;background: #FAFAFA;";
        this.canvas.style.width = this.atom * this.xnum + 'px';//画布的宽
        this.canvas.style.height = this.atom * this.ynum + 'px';//画布的高
        main.append(this.canvas);

        if(showcanvas){
            for(var x = 0; x < xnum; x ++){
                for(var y = 0; y < ynum; y ++){
                    var a = document.createElement('div');
                    a.style.cssText = "border: 1px solid yellow;";
                    a.style.width = this.atom + 'px';//画布的宽
                    a.style.height = this.atom + 'px';//画布的高
                    a.style.background = 'green';//画布的高
                    this.canvas.appendChild(a);
                    a.style.position = "absolute";
                    a.style.left = x * this.atom + "px";
                    a.style.top = y * this.atom + "px";
                }
            }
        }
    }
}

/**
 * 创建食物的构造方法
 * @param map
 * @constructor
 */
function Food(map){
    this.width = map.atom;
    this.height = map.atom;
    this.bgcolor = "rgb("+ Math.floor(Math.random() * 200) + ", " + Math.floor(Math.random() * 200) + "," + Math.floor(Math.random() * 200) + ")";

    this.x = Math.floor(Math.random() * map.xnum);
    this.y = Math.floor(Math.random() * map.ynum);

    this.flag = document.createElement('div')
    this.flag.style.width = this.width + 'px';
    this.flag.style.height = this.height + 'px';

    this.flag.style.backgroundColor = this.bgcolor;
    this.flag.style.borderRadius = '50%';
    this.flag.style.position = 'absolute';
    this.flag.style.left = this.x * this.width + 'px';
    this.flag.style.top = this.y * this.height + 'px';

    map.canvas.appendChild(this.flag);
}

//创建地图
var map = new Map(20, 40, 20);
map.create();//显示画布

//创建食物
var food = new Food(map);

$(function () {
    var timer;

    $("#begin").click(function () {
        clearInterval(timer);
        timer = setInterval(function () {

        }, 300);
    });

    $("#pause").click(function () {
        clearInterval(timer);
    })
});
