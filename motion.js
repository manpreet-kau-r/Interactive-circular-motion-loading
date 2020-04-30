var canvas=document.querySelector('canvas');
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

var c=canvas.getContext('2d');

var mouse={
	x:innerWidth/2,
	y:innerHeight/2
}

var colorArray=['#eebdff','#4d39ce','#088eff'];

window.addEventListener('mousemove',function(event)
{
	mouse.x=event.x;
	mouse.y=event.y;
});

window.addEventListener('resize',function()
{
	canvas.width=window.innerWidth;
	canvas.height=window.innerHeight;
	init();
});

function getDistance(x1,y1,x2,y2)
{
	let xDistance=x2-x1;
	let yDistance=y2-y1;
	return Math.sqrt(Math.pow(xDistance,2)+Math.pow(yDistance,2));
}

function randomIntFromRange(min,max)
{
	return Math.floor(Math.random()*(max-min+1)+min);
}

function Particle(x,y,radius,color)
{
	this.x=x;
	this.y=y;
	this.velocity=0.05;
	this.radius=radius;
	this.color=colorArray[Math.floor(Math.random()*colorArray.length)];
	this.radians=Math.random()*Math.PI*2;
	this.distanceFromCenter=randomIntFromRange(50,120);
	this.lastMouse={x:x, y:y};
	this.draw=function(lastPoint)
				{
					c.beginPath();
					c.strokeStyle=this.color;
					c.lineWidth=this.radius;
					c.moveTo(lastPoint.x,lastPoint.y);
					c.lineTo(this.x,this.y);
					c.stroke();
					c.closePath();					
				}
	this.update=function(paricles)
				{	
					const lastPoint={ x: this.x, y: this.y };

					//move points over time
					this.radians+=this.velocity;

					//drag effect
					this.lastMouse.x+=(mouse.x-this.lastMouse.x)*0.05;
					this.lastMouse.y+=(mouse.y-this.lastMouse.y)*0.05;

					//circular motion
					this.x=this.lastMouse.x+Math.cos(this.radians)*this.distanceFromCenter;
					this.y=this.lastMouse.y+Math.sin(this.radians)*this.distanceFromCenter;
					this.draw(lastPoint);
				}
}

var particles;

function init()
{
	particles=[];
	for(let i=0;i<50;i++)
	{
		const radius=(Math.random()*2)+2;
		particles.push(new Particle(canvas.width/2,canvas.height/2,radius,'blue'));
	}
}

function animate()
{
	requestAnimationFrame(animate);
	c.fillStyle='rgba(255,255,255,0.05)';
	c.fillRect(0,0,innerWidth,innerHeight);
	particles.forEach(particle=>{particle.update(particles);});
}
init();
animate();