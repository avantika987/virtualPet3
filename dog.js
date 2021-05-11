class Dog{
    constructor(x,y,width,height){
        this.body = Bodies.rectangle(x,y,width,height);
        this.height = height;
        this.width = width;
        World.add(world, this.body);

    }
display()
	{
			push()
			rectMode(CENTER)
			//strokeWeight(4);
			fill(128,128,128)
			rect(0,0,this.w, this.h);
			pop()
			
	}

}