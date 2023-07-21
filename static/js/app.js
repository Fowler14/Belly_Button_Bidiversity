let samples1 = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

function init() {
    d3.json(samples1).then((data) => {

        let idNames = data.names;

        let dropdownMenu = d3.select("#selDataset");
        idNames.forEach((id) => {
            dropdownMenu.append("option").text(id).property("value");
        });

        buildCharts(idNames[0]);
        buildDemographics(idNames[0]);
    });
}

function optionChanged(newId) {
    buildCharts(newId);
    buildDemographics(newId);
}

function buildCharts(id) {
    d3.json(samples1).then((data) => {
        let samples = data.samples.filter(sample => sample.id === id)[0];
        let otu_ids = samples.otu_ids;
        let otu_labels = samples.otu_labels;
        let sample_values = samples.sample_values;

        let trace1 = {
            type: 'bar',
            x: sample_values.slice(0,10).reverse(),
            y: otu_ids.slice(0,10).reverse().map(a=>"OTU "+a),
            text: otu_labels.slice(0,10).reverse(),
            orientation: 'h'
        };


        let layout1 = {
            title: 'Top 10 OTUs by Subject ID',
        }; 
        let data1 = [trace1];
        
        Plotly.newPlot('bar', data1, layout1);

        let trace2 = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: 'markers',
            marker: {
                color: otu_ids,
                size: sample_values
            }
        };

        let layout2 = {
            title: 'Belly Button Bubbles',
            showlegend: false,
            xaxis: {title: "OTU ID"},
            yaxis: {title: "Sample Values"},
            height: 600,
            width: 1200
        };
        let data2 = [trace2];

        Plotly.newPlot('bubble', data2, layout2);

        let metadata = data.metadata.filter(meta => meta.id == id)[0];
        let wfreq = metadata.wfreq;


        let trace3 = {
            type: "indicator",
            mode: "gauge+number",
            value: wfreq,
            title: {text: "Belly Button washing frequency", font: {size:24}},
            gauge: {
                axis: {range: [null, 9], tickwidth: 1, tickcolor: "darkblue"},
                bar: {color: "darkblue"},
                bgcolor: "white",
                borderwidth: 2, 
                bordercolor: "gray",
                steps: [
                    {range: [0, 1], color: "whitesmoke"},
                    {range: [1, 2], color: "mintcream"},
                    {range: [2, 3], color: "lightcyan"},
                    {range: [3, 4], color: "paleturquoise"},
                    {range: [4, 5], color: "darkseagreen"},
                    {range: [5, 6], color: "mediumseagreen"},
                    {range: [6, 7], color: "limegreen"},
                    {range: [7, 8], color: "forestgreen"},
                    {range: [8, 9], color: "darkgreen"},
                ],
            },
        };
        
        
        let layout3 = {
            width: 600,
            height: 500,
            margin: { t: 20, b: 40, l:100, r:100}
        };

        let data3 = [trace3];

        Plotly.newPlot("gauge", data3, layout3);
    });
}

function buildDemographics(id) {
    d3.json(samples1).then((data) => {
        let metadata = data.metadata.filter(meta => meta.id == id)[0];

        let panel = d3.select('#sample-metadata');

        panel.html("");

        Object.entries(metadata).forEach(([key, value]) => {
            panel.append("h6").text(`${key}: ${value}`);
        });
    });
}
init();