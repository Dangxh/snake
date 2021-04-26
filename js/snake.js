var main = $("#main");
var showcanvas = false;//是否开启画布格子

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
                    a.style.background = '#CCC';//画布的高
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
    // this.flag.style.borderRadius = '50%';
    this.flag.style.position = 'absolute';
    this.flag.style.left = this.x * this.width + 'px';
    this.flag.style.top = this.y * this.height + 'px';

    map.canvas.appendChild(this.flag);
}

function Snake(map) {
    //设置蛇的宽，高
    this.width = map.atom;
    this.height = map.atom;
    //默认走的方向
    this.direction = 'right';
    this.body = [
        {x:2,y:0},//蛇头，第一点
        {x:1,y:0},//蛇脖子，第二点
        {x:0,y:0},//蛇尾，第三点
    ];

    //显示蛇
    this.display = function () {
        for(var i = 0; i < this.body.length; i ++){
            if(this.body[i].x != null){//当吃到食物时,x==null,不能新建，不然会在0,0处新建一个
                var s = document.createElement('div');
                //将节点保存到一个状态变量中，以便以后删除使用
                this.body[i].flag = s;

                //设置蛇的样式
                s.style.width = this.width + 'px';
                s.style.height = this.height + 'px';
                s.style.backgroundColor = "rgb("+ Math.floor(Math.random() * 200) + ", " + Math.floor(Math.random() * 200) + "," + Math.floor(Math.random() * 200) + ")";
                //设置位置
                s.style.position = "absolute";
                s.style.left = this.body[i].x * this.width + 'px';
                s.style.top = this.body[i].y * this.height + 'px';
                //添加到地图中
                map.canvas.appendChild(s);
            }
        }
    }

    this.run = function () {
        /*
        {x:2,y:0},//蛇头，第一点
        {x:1,y:0},//蛇脖子，第二点
        {x:0,y:0},//蛇尾，第三点
         */
        for (var i = this.body.length-1; i > 0; i --) {
            this.body[i].x = this.body[i - 1].x;
            this.body[i].y = this.body[i - 1].y;
        }
        this.body[0].y += 1;

        for(var i = 0; i < this.body.length; i ++){
            if(this.body[i].flag != null){//当吃到食物,flag
                map.canvas.removeChild(this.body[i].flag);
            }
        }
        this.display();
    }
}

//创建地图
var map = new Map(20, 40, 20);
map.create();//显示画布

//创建食物
var food = new Food(map);

//构造蛇对象
var snake = new Snake(map);
snake.display();

$(function () {
    var timer;

    $("#begin").click(function () {
        clearInterval(timer);
        timer = setInterval(function () {
            snake.run();
        }, 300);
    });

    $("#pause").click(function () {
        clearInterval(timer);
    })
});
