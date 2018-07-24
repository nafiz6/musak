var Particle = function () {
    this.init();
}

Particle.prototype.Draw = function (ctx) {
    ctx.fillStyle = "white";
    ctx.globalAlpha=Math.random();
    ctx.fillRect(this.x,this.y,2,2);
    ctx.globalAlpha=1;
}

Particle.prototype.Update = function () {
    this.x += this.vx;
    this.y += this.vy;
    if (this.y>winHeight){this.init()}
    if (this.x<winWidth/6.3 || this.x>49*winWidth/63)this.init();

}


Particle.prototype.init = function () {
    this.x = (180*4.5)* Math.random() + winWidth/6.3;
    this.y = 2.5*winHeight/3;
    this.vx = Math.random()-0.5;
    this.vy = Math.random()*2+1;
}

var LParticle = function () {
    this.init();
}

LParticle.prototype.init = function () {
    this.x = (180*4.5)* Math.random() + winWidth/6.3;
    this.y = (2*winHeight/3)*Math.random();
    this.vx = Math.random()-0.5;
    this.vy = Math.random()*2-0.5;
    this.opacity = Math.random()/1.25;
    this.mult = 1;
    this.radius = 2.5+Math.random()*2.5;
}

LParticle.prototype.update = function () {
    this.x += this.vx;
    this.y += this.vy;
    if (this.opacity<0.1)this.init();
    if (this.opacity>0.7)this.mult=-1;
    this.opacity+=0.01*this.mult;
}

LParticle.prototype.draw = function () {
    ctx.save();
    ctx.fillStyle = "white";
    ctx.shadowBlur=70;
    ctx.globalAlpha = this.opacity;
    ctx.shadowColor="#fff";
    ctx.beginPath();
    ctx.arc(this.x,this.y,this.radius,0,2*Math.PI);
    ctx.fill();
    ctx.globalAlpha=1;
    ctx.restore();
}
