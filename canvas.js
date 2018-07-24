var block;
var allBlocks;
var winWidth = window.innerWidth;
var winHeight = 2*window.innerHeight/3;
var particles;
var lParticles;
var dispTime;
var sec,min;


function start() {
    if (window.innerHeight>window.innerWidth){
        winHeight = winWidth/1.8;
    }
    allBlocks = new Array();
    particles = new Array();
    lParticles = new Array();
    for (i=0;i<180;i++){
        block = new component(3,2,(winWidth/6.3)+i*4.5,2.5*winHeight/3,"black",i);
        allBlocks.push(block);
    }

    for (i=0;i<100;i++){
        particles.push(new Particle());
    }

    for (i=0;i<50;i++){
        lParticles.push(new LParticle());
    }
    canvasArea.start();
}

var canvasArea ={
    canvas: document.createElement("canvas"),
    div: document.getElementsByClassName("container"),

    start: function () {
        this.canvas.width = winWidth;
        this.canvas.height = winHeight;
        this.context = this.canvas.getContext("2d");
        document.getElementById("canvas").appendChild(this.canvas);
        this.frameNo = 0;
        this.interval = setInterval(updateCanvas,30 );
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function component(width, height, x, y, color,i) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speedY = 0;
    this.acc = 0.1;
    this.riseAcc = 0.2;
    this.ind = i;
    this.render = function () {
        ctx = canvasArea.context;
        ctx.save();
        ctx.fillStyle = "#fff";
        ctx.shadowBlur=50;
        ctx.shadowColor="#fff";
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.restore();
    }
    this.updatePos = function () {
        this.x = (winWidth/6.3)+this.ind*4.5;
        val = data[Math.round(this.ind*((data.length-300)/180))];
        val/=2;
        if (val<2)val=2;
        initY = this.y;
        /*this.y = (2.5*canvasArea.canvas.height/3) - val;
        this.height+=(initY-this.y);*/
        this.y = (2.5*canvasArea.canvas.height/3) - val/2;
        this.height = val;
    }

}

function updateCanvas() {
    canvasArea.clear();

    winWidth = window.innerWidth;
    winHeight = 2*window.innerHeight/3;
    if (window.innerHeight>window.innerWidth){
        winHeight = winWidth/1.8;
    }
    ctx=canvasArea.context;
    /*ctx.fillStyle = "#00b7ff";
    ctx.fillRect(0,0,canvasArea.canvas.width,canvasArea.canvas.height);*/
    var gradient = ctx.createLinearGradient(0,0,0,winHeight);
    gradient.addColorStop(0,"#00007c")
    gradient.addColorStop(2.5/3,"#0047FF");
    gradient.addColorStop(1,"#0035de");
    ctx.fillStyle = gradient;
    ctx.fillRect(0,0,canvasArea.canvas.width,canvasArea.canvas.height);
    ctx.fillStyle="white";
    ctx.font = "bold "+ winWidth/31+"px Calibri";
    ctx.fillText("BON IVER",10.5*winWidth/65,(winHeight/4) );

    ctx.font = "bold " + winWidth/51+"px Calibri";
    ctx.fillText("HOLOCENE",10.5*winWidth/65,(winHeight/4)+winWidth/47 );

    if (!playing)dispTime=pausedAt;
    else{
        dispTime = context.currentTime - startedAt;
        if (dispTime<0)dispTime=0;
    }
    dispTime = Math.min(dispTime,duration);

    songSlider.value=100*(dispTime/duration);
    dispTime=Math.round(dispTime);
    sec = dispTime%60;
    min = dispTime/60;
    ctx.fillText(("0"+Math.floor(min)).slice(-2)+":"+("0"+sec).slice(-2),winWidth/6.3+700,(winHeight/4)+winWidth/47)
    for (i=0;i<180;i++){
        allBlocks[i].updatePos();
        allBlocks[i].render();
    }


    for (i=0;i<100;i++){
        if (!playing)continue;
        particles[i].Update();
        particles[i].Draw(ctx);
    }
    for (i=0;i<50;i++){
        lParticles[i].update();
        lParticles[i].draw();
    }





}



