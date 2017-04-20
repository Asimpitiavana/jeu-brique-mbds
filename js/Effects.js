//Particle effect from
//http://jsbin.com/baqopecine/edit?html,js,output


	var particles = [];
	
	function randomFloat (min, max)
	{
		return min + Math.random()*(max-min);
	}

function removeFromArray(array, object) {
    var idx = array.indexOf(object);
    if (idx !== -1) {
        array.splice(idx, 1);
    }
    return array;
}
	
	function Particle ()
	{
		this.scale = 1.0;
		this.x = 0;
		this.y = 0;
		this.radius = 20;
		this.color = "#000";
		this.velocityX = 0;
		this.velocityY = 0;
		this.scaleSpeed = 0.5;
		this.useGravity = false;
      
		this.update = function(ms)
		{
			// shrinking
          
			this.scale -= this.scaleSpeed * ms / 1000.0;
          
			if (this.scale <= 0)
			{
              // particle is dead, remove it
              removeFromArray(particles, this);
              
			}
			
			// moving away from explosion center
			this.x += this.velocityX * ms/1000.0;
			this.y += this.velocityY * ms/1000.0;
          if(this.useGravity) {
              this.velocityY += Math.random()*4 +4;
          }
		};
		
		this.draw = function(ctx)
		{
			// translating the 2D context to the particle coordinates
			ctx.save();
			ctx.translate(this.x, this.y);
			ctx.scale(this.scale, this.scale);
			
			// drawing a filled circle in the particle's local space
			ctx.beginPath();
			ctx.arc(0, 0, this.radius, 0, Math.PI*2, true);
			//ctx.closePath();
			
			ctx.fillStyle = this.color;
			ctx.fill();
			
			ctx.restore();
		};
	}
	

	
	/*
	 * Advanced Explosion effect
	 * Each particle has a different size, move speed and scale speed.
	 * 
	 * Parameters:
	 * 	x, y - explosion center
	 * 	color - particles' color
	 */
	function createExplosion(x, y, color)
	{
		var minSize = 10;
		var maxSize = 30;
		var count = 5;
		var minSpeed = 60.0;
		var maxSpeed = 200.0;
		var minScaleSpeed = 1.0;
		var maxScaleSpeed = 4.0;
		
		for (var angle=0; angle<360; angle += Math.round(360/count))
		{
			var particle = new Particle();
			
			particle.x = x;
			particle.y = y;
			
            // size of particle
			particle.radius = randomFloat(1, 3);
			
			particle.color = color;
			
            // life time, the higher the value the faster particle 
            // will die
			particle.scaleSpeed = randomFloat(0.3, 0.5);
          
            // use gravity
          particle.useGravity = true;
			
			var speed = randomFloat(minSpeed, maxSpeed);
			
			particle.velocityX = speed * Math.cos(angle * Math.PI / 180.0);
			particle.velocityY = speed * Math.sin(angle * Math.PI / 180.0);
			
			particles.push(particle);
		}
    
	}

// Delta = time between two consecutive frames,
// for time-based animation
function updateAndDrawParticules(delta,ctx) {
   for (var i = 0; i < particles.length; i++) {
	  var particle = particles[i];
			
	  particle.update(delta);
	  particle.draw(ctx);
   }
}

//------------- ANIMATION PART -------------------------
var delta, oldTime=0;

  function timer(currentTime) {
    var delta = currentTime - oldTime;
    oldTime = currentTime;
    return delta;
 
  }


	
	

function startDoubleExplosion(x, y,color) {
  		        createExplosion(x, y, color);
			    // On peut multiplier la densité en générant plusieurs 
                // explositons de couleurs différentes...
			    createExplosion(x, y, "white");
                //createExplosion(x, y, "green");

}

function createBonusExplosion(x, y){
	createExplosion(x, y, "#FBB735");
	createExplosion(x, y, "#E98931");
	createExplosion(x, y, "#EB403B");
	createExplosion(x, y, "#B32E37");
	createExplosion(x, y, "#6C2A6A");
	createExplosion(x, y, "#5C4399");
	createExplosion(x, y, "#274389");
}