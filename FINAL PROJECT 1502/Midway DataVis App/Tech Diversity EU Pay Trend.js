function PayGapEUEmployment() {

  // Name for the visualisation to appear in the menu bar.
  this.name = 'Tech Diversity Series: EU Pay Trend';

  // Each visualisation must have a unique ID with no special
  // characters.
  this.id = 'EU pay gap timeseries';

  // Title to display above the plot.
  this.title = 'EU Wages Historical Trend';

    // Names for each axis.
  this.xAxisLabel = 'Year';
  this.yAxisLabel = 'Wages (USD)';
    
  this.colors=[];

  var marginSize = 40;

  // Layout object to store all common plot layout parameters and
  // methods.
  this.layout = {
    marginSize: marginSize,

    // Locations of margin positions. Left and bottom have double margin
    // size due to axis and tick labels.
    leftMargin: marginSize * 2,
    rightMargin: width - marginSize,
    topMargin: marginSize,
    bottomMargin: height - marginSize * 2,
    pad: 0,

    plotWidth: function() {
      return this.rightMargin - this.leftMargin;
    },

    plotHeight: function() {
      return this.bottomMargin - this.topMargin;
    },

    // Boolean to enable/disable background grid.
    grid: true,

    // Number of axis tick labels to draw so that they are not drawn on
    // top of one another.
    numXTickLabels: 25,
    numYTickLabels: 10,
  };

  // Property to represent whether data has been loaded.
  this.loaded = false;

  // Preload the data. This function is called automatically by the
  // gallery when a visualisation is added.
  this.preload = function() {
    var self = this;
    this.data = loadTable(
      './data/EU Tech Data/OECD Wages Gap 1990-2018 eu version.csv', 'csv', 'header',
      // Callback function to set the value
      // this.loaded to true.
      function(table) {
        self.loaded = true;
      });

  };

  this.setup = function() {
    // Font defaults.
    textSize(16);
      
    

    // Set min and max years: assumes data is sorted by date.
    this.startYear = Number(this.data.columns[1]);
    this.endYear = Number(this.data.columns[23]);
      
    for (var i=0; i<this.data.getRowCount(); i++)
        {
            
            this.colors.push(color(random(0,255),random(0,255),random(0,255)));
            
        }

    // Find min and max wages for mapping to canvas height.

            
    this.minWage = 6000;        
    this.maxWage = 65000;
            
            
        

  };

  this.destroy = function() {
  };

  this.draw = function() {
    if (!this.loaded) {
      console.log('Data not yet loaded');
      return;
    }

    // Draw the title above the plot.
    this.drawTitle();

    // Draw all y-axis labels.
    drawYAxisTickLabels(this.minWage,
                        this.maxWage,
                        this.layout,
                        this.mapPayGapToHeight.bind(this),
                        0);

    // Draw x and y axis.
    drawAxis(this.layout);

    // Draw x and y axis labels.
    drawAxisLabels(this.xAxisLabel,
                   this.yAxisLabel,
                   this.layout);

    // Plot all pay gaps between startYear and endYear using the width
    // of the canvas minus margins.
    
    var numYears = this.endYear - this.startYear;

    // Loop over all rows and draw a line from the previous value to
    // the current.
    for (var i = 0; i < this.data.getRowCount(); i++) {
        
        var row = this.data.getRow(i);
        var previous = null;
        
        var l=row.getString(0);
        
        for (var j=1; j < numYears; j++)
        {
        
            var current = {
            // Convert strings to numbers.
            'year': this.startYear + j - 1,
            'wage': row.getNum(j)
            };
            if (previous != null) {
                // Draw line segment connecting previous year to current
                // year pay gap.
                stroke(this.colors[i]);
                line(this.mapYearToWidth(previous.year),
                     this.mapPayGapToHeight(previous.wage),
                     this.mapYearToWidth(current.year),
                     this.mapPayGapToHeight(current.wage));

                // The number of x-axis labels to skip so that only
                // numXTickLabels are drawn.
                var xLabelSkip = ceil(numYears / this.layout.numXTickLabels);

                // Draw the tick label marking the start of the previous year.
                if (i % xLabelSkip == 0) {
                  drawXAxisTickLabel(previous.year, this.layout,
                                     this.mapYearToWidth.bind(this));
                }
            }
            else 
            {
                noStroke();
                fill(this.colors[i]);
                text(l,100,this.mapPayGapToHeight(current.wage));
                
            }
            // Assign current year to previous year so that it is available
            // during the next iteration of this loop to give us the start
            // position of the next line segment.
            previous = current;
        }

    }
  };

  this.drawTitle = function() {
    fill(0);
    noStroke();
    textAlign('center', 'center');

    text(this.title,
         (this.layout.plotWidth() / 2) + this.layout.leftMargin,
         this.layout.topMargin - (this.layout.marginSize / 2));
  };

  this.mapYearToWidth = function(value) {
    return map(value,
               this.startYear,
               this.endYear,
               this.layout.leftMargin,   // Draw left-to-right from margin.
               this.layout.rightMargin);
  };

  this.mapPayGapToHeight = function(value) {
    return map(value,
               this.minWage,
               this.maxWage,
               this.layout.bottomMargin, // Smaller pay gap at bottom.
               this.layout.topMargin);   // Bigger pay gap at top.
  };
}
