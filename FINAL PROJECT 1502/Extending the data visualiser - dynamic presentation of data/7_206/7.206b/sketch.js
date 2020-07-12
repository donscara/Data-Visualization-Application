var data;
var bubbles = [];

function preload() 
{
	data = loadTable("foodData.csv", "csv", "header");
}

function setup()
{
	createCanvas(1000, 1000);

    var rows = data.getRows();
    for(var i = 0; i < rows.length; i++)
    {
        console.log(rows[i].get(0))
        if(rows[i].get(0) != "")
        {
            bubbles.push(new Bubble(rows[i].get(0)));
        }
        
    }
    
}


function draw() 
{
    background(100);
    
    translate(width/2, height * 3/4);
    for(var i = 0; i < bubbles.length; i++)
    {
        bubbles[i].draw();
    }
}

function Bubble(_name)
{
    this.size = 20;
    this.y = random(0, height *3/4);
    this.name = _name;
    this.color = color(random(0,255), random(0,255), random(0,255));
    
    this.draw = function()
    {
        noStroke();
        fill(this.color);
        ellipse(0, -this.y, this.size);
        fill(0);
        text(this.name,this.size,-this.y);
    }
    
    this.update = function()
    {
        
    }
}