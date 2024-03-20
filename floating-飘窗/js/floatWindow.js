class Floating{
    constructor(option = {}){
        // 元素绑定
        this.el = option.el || null;
        this.elClose = this.el.querySelector("button");
        this.style = option.style;
        // 元素宽高
        this.clientWidth = this.el.clientWidth;
        this.clientHeight = this.el.clientHeight;
        // 元素位置
        this.x = 0;
        this.y = 0;
        // 元素移动方向
        this.vx = 2;
        this.vy = 2;
        // 元素绘制间隔
        this.speed = option.speed || 30;
        // 容器宽高
        this.contentWidth = window.innerWidth;
        this.contentHeight = window.innerHeight;
        // 定时器绑定
        this.timer = null;
        // 定时器阻断器
        this.timerStop = false;
        this.init();
    }

    // 初始化
    init(){
        // 初始化元素位置
        this.x = ~~(Math.random() * (this.contentWidth - this.clientWidth));
        this.y = ~~(Math.random() * (this.contentHeight - this.clientHeight));
        // 初始化CSS
        if(this.style){
            Object.keys(this.style).forEach(key=>{
                this.el.style[key] = this.style[key];
            })
        }
        // 初始化定时器与事件
        this.initTimer();
        this.initEvent();
    }

    // 定时器
    initTimer(){
        clearInterval(this.timer);
        this.timer = setInterval(()=>{
            if(!this.timerStop){
                if(this.x > this.contentWidth - this.clientWidth || this.x <= 0){
                    this.vx = -this.vx;
                }
                if(this.y > this.contentHeight - this.clientHeight || this.y <= 0){
                    this.vy = -this.vy;
                }
                this.x += this.vx;
                this.y += this.vy;
                this.update();
            }
        },this.speed)
    }

    // 事件绑定-元素的移入和移出
    initEvent(){
        this.el.addEventListener("mouseenter",(e)=>{
            e.stopPropagation();
            this.timerStop = true;
        })
        this.el.addEventListener("mouseleave",(e)=>{
            e.stopPropagation();
            this.timerStop = false;
        })
        this.elClose.addEventListener("click",()=>{
            this.destory();
        })
    }

    // 更新元素
    update(){
        console.log("a")
        this.el.style.transform = `translate(${this.x}px,${this.y}px)`
    }

    // 飘窗销毁
    destory(){
        // 销毁定时器，释放内存
        clearInterval(this.timer);
        this.timer = null;
        // 删除元素
        this.el.remove();
    }
}