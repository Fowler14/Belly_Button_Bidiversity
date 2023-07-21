# Belly_Button_Bidiversity

### Data Source: The data is loaded from a JSON file located at https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json.

### Initialization: The init function is responsible for initializing the webpage. It loads the JSON data, populates a dropdown menu with the names from the data, and builds the initial charts and demographics information.

### Dropdown Menu: The dropdown menu is populated with the names from the loaded data. When the selected option in the dropdown menu changes, the optionChanged function is called, which updates the charts and demographics information to reflect the new selected id.

### Charts: The buildCharts function builds the charts for the given id. It filters the samples array to find the sample with the matching id, and then creates and plots two charts: a horizontal bar chart of the top 10 OTUs and a bubble chart of all OTUs.

### Demographics Panel: The buildDemographics function builds the demographics information for the given id. It filters the metadata array to find the metadata with the matching id, and then displays each key-value pair from the metadata in the HTML element with the id sample-metadata
