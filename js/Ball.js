class Ball extends ObjetGraphique {
  constructor(x, y, rayon, couleur, vx, vy,isBoss=false,isBonus=false) {
    super(x, y, couleur, vx, vy);
    this.rayon = rayon;
	this.isBonus=isBonus;
	if(isBonus){
		this.currentColor=0;
		this.up=true;
	}
	if(!isBoss)	this.hitBeforeBreak=2;
	else this.hitBeforeBreak=1;
  }

  
    draw(ctx) {
		super.draw(ctx);
		ctx.save(); 
		
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.rayon, 0, 2*Math.PI);
		
		if(this.isBonus){
			let couleurs=["#ffff","#fff"];
			ctx.fillStyle=couleurs[this.currentColor];
			this.updateBonusColor();
		}
		else ctx.fillStyle = this.couleur;
		ctx.fill();
		ctx.restore();
			
  }
  changeColor(){
		if(this.hitBeforeBreak==1)this.couleur="#ff1744";
		if(this.hitBeforeBreak==0)this.couleur="#d50000";
	}
	updateBonusColor(){
		if(this.currentColor==10&&this.up==true){
			this.up=false;
		}
		if(this.currentColor==0&&this.up==false){
			this.up=true;
		}
		if(this.up){
			this.currentColor++;
		}
	}
}
