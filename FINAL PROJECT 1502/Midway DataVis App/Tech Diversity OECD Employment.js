function TechDiversityEUEmployment() {

  // Name for the visualisation to appear in the menu bar.
  this.name = 'Tech Diversity Series: OECD Tech Employment';

  // Each visualisation must have a unique ID with no special
  // characters.
  this.id = 'tech-diversity-EUEmployment';

  // Property to represent whether data has been loaded.
  this.loaded = false;

  // Preload the data. This function is called automatically by the
  // gallery when a visualisation is added.
  this.preload = function() {
    var self = this;
    this.data = loadTable(
      './data/EU Tech Data/EU-TECH-EMPLOYMENTv2.csv', 'csv', 'header',
      // Callback function to set the value
      // this.loaded to true.
      function(table) {
        self.loaded = true;
      });
  };

  this.setup = function() {
    if (!this.loaded) {
      console.log('Data not yet loaded');
      return;
    }

    // Create a select DOM element.
    this.select = createSelect();
    this.select.position(350, 40);

    // Fill the options with all the countries names.
    var countries = this.data.columns;
    // First entry is empty.
    for (let i = 1; i < countries.length; i++) {
      this.select.option(countries[i]);
    }
  };

  this.destroy = function() {
    this.select.remove();
  };

  // Create a new pie chart object.
  this.pie = new PieChart(width / 2, height / 2, width * 0.4);

  this.draw = function() {
    if (!this.loaded) {
      console.log('Data not yet loaded');
      return;
    }

    // Get the value of the nation we're interested in from the
    // select item.
    var COUNTRY = this.select.value();

    // Get the column of raw data for COUNTRY.
    var col = this.data.getColumn(COUNTRY);

    // Convert all data strings to numbers.
    col = stringsToNumbers(col);

    // Copy the row labels from the table (the first item of each row).
    var labels = this.data.getColumn(0);
      
    // Colour to use for each category.
    
    var colours = ['blue', 'red', 'green', 'purple', 'yellow','brown','grey','black','white','orange'];
    
    

    // Make a title.
    var title = 'OECD Countries: Yearly Tech Employment for ' + COUNTRY;

    // Draw the pie chart!
    this.pie.draw(col, labels, colours, title);
      
    
  };
}
