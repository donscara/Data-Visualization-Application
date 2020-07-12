function PayGapByJobBubble() {

  // Name for the visualisation to appear in the menu bar.
  this.name = 'Gender Pay Gap Series: Pay Gap by Job Type';

  // Each visualisation must have a unique ID with no special
  // characters.
  this.id = 'pay-gap-by-job-bubble';

  // Property to represent whether data has been loaded.
  this.loaded = false;

  // Graph properties.
  
  this.pad = 20;
  this.dotSizeMin = 20;
  this.dotSizeMax = 40;
  this.colours = ['magenta','red','green','purple','magenta','brown','grey','cyan','orange','blue']
  
  

  // Preload the data. This function is called automatically by the
  // gallery when a visualisation is added.
  this.preload = function() {
    var self = this;
    this.data = loadTable(
      './data/pay-gap/occupation-hourly-pay-by-gender-2017.csv', 'csv', 'header',
      // Callback function to set the value
      // this.loaded to true.
      function(table) {
        self.loaded = true;
      });

  };

  this.setup = function() {
      
  
      
  };

  this.destroy = function() {
  };

  this.draw = function() {
    if (!this.loaded) {
      console.log('Data not yet loaded');
      return;
    }

    // Draw the axes.
    this.addAxes();
    
    

    // Get data from the table object.
    var jobs = this.data.getColumn('job_subtype');
    var propFemale = this.data.getColumn('proportion_female');
    var payGap = this.data.getColumn('pay_gap');
    var numJobs = this.data.getColumn('num_jobs');
    var jobcode = this.data.getColumn('job_type_code');
      

    // Convert numerical data from strings to numbers.
    propFemale = stringsToNumbers(propFemale);
    payGap = stringsToNumbers(payGap);
    numJobs = stringsToNumbers(numJobs);

    // Set ranges for axes.
    //
    // Use full 100% for x-axis (proportion of women in roles).
    var propFemaleMin = 0;
    var propFemaleMax = 100;

    // For y-axis (pay gap) use a symmetrical axis equal to the
    // largest gap direction so that equal pay (0% pay gap) is in the
    // centre of the canvas. Above the line means men are paid
    // more. Below the line means women are paid more.
    var payGapMin = -20;
    var payGapMax = 20;

    // Find smallest and largest numbers of people across all
    // categories to scale the size of the dots.
    var numJobsMin = min(numJobs);
    var numJobsMax = max(numJobs);

    fill(255);
    stroke(0);
    strokeWeight(1);
    
  //create legend and graph explanation
      
  var x = 100;
  var y = 420;

  fill(0);
  noStroke();
  textAlign('left');
  textSize(12);
  text('Press Any Key to see data values for each point!',x+5,y+10);
  text('1: Salary Gap between male and female',x+5,y+30);
  text('2: Female Proportion',x+5,y+45);
  //text('3: Number of Jobs',x+5,y+55);

  text('For y-axis - (pay gap) use a symmetrical axis equal to the largest gap direction.',x+5,y+70);
  text('Equal pay (0% pay gap) is in the centre of the canvas.',x+5,y+80); 
  text('For x-axis - Above the line men are paid more. Below the line women are paid more.',x+5,y+90);
  fill('red');
  text('Job Type: Managers, directors and senior officials',x+5,y+110);
  fill('green');
  text('Job Type: Professional Occupations',x+5,y+125);    
  fill('purple');
  text('Job Type: Associate professional and technical occupations',x+5,y+140);
  fill('magenta');
  text('Job Type: Administrative and secretarial occupations',x+5,y+155);
  fill('brown');
  text('Job Type: Skilled trades occupations',x+5,y+170);
  fill('grey');
  text('Job Type: Caring, leisure and other service occupations',x+5,y+185);
  fill('cyan');
  text('Job Type: Sales and customer service occupations',x+5,y+200);
  fill('orange');
  text('Job Type: Process, plant and machine operatives',x+5,y+215);
  fill('blue');
  text('Job Type: Elementary occupations',x+5,y+230);
  
  

    
  
    
    for (i = 0; i < this.data.getRowCount(); i++) {
      // Draw an ellipse for each point.
      // x = propFemale
      // y = payGap
      // size = numJobs
      
      
      textAlign(CENTER);
      noStroke();
    
     //Assign a different color to each Job Code to differentiate Job Types 
 
      for (j = 0; j <=9; j++){
        if(jobcode[i] == j){
              
            fill(this.colours[j]);
          }
      }
      
      
        
        var e = ellipse(
        map(propFemale[i], propFemaleMin, propFemaleMax,
            this.pad, width - this.pad),
        map(payGap[i], payGapMin, payGapMax,
            height - this.pad, this.pad),
        map(numJobs[i], numJobsMin, numJobsMax,
            this.dotSizeMin, this.dotSizeMax));
               
       //Add figures for each ellipse showing the Pay Gap, Proportion of Female and Number of Jobs Data
        
        
        
        if (keyIsPressed === true){ 
        
        
        fill(0);
        textAlign(LEFT);
        textStyle(BOLD);
        text('1: ' + payGap[i],
        map(propFemale[i], propFemaleMin, propFemaleMax,
            this.pad, width - this.pad)+15,
        map(payGap[i], payGapMin, payGapMax,
            height - this.pad, this.pad)-10);
        text('2: '+ propFemale[i],
        map(propFemale[i], propFemaleMin, propFemaleMax,
            this.pad, width - this.pad)+15,
        map(payGap[i], payGapMin, payGapMax,
            height - this.pad, this.pad))-5;

        
            
        }
      
      }
      
    }
       
 

  this.addAxes = function () {
    stroke(200);

    // Add vertical line.
    line(width / 2,
         0 + this.pad,
         width / 2,
         height - this.pad);
    fill(0);
    text('Pay Gap',width/2,0+this.pad);

    // Add horizontal line.
    line(0 + this.pad,
         height / 2,
         width - this.pad,
         height / 2);
    fill(0);
    text('  Female Proportion',30+this.pad,height/2);
  };



};




