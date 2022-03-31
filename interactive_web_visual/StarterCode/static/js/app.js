// get json file data
d3.json("samples.json").then(function(data) {
    console.log(data);


    // Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.Day3-Act9

    let ids = data.samples[0].otu_ids;
    // console.log(ids);
    let dataSamps = data.samples[0].sample_values;
    let values = data.samples[0].sample_values.slice(0, 10).reverse();
    console.log(values);
    let dataLabels = data.samples[0].otu_labels;
    let labels = data.samples[0].otu_labels.slice(0, 10);
    console.log(labels);
    let topTen = (data.samples[0].otu_ids.slice(0, 10)).reverse();
    console.log(topTen);

    // get the otu id's to the desired form for the plot
    let OTU_id = topTen.map(d => "OTU " + d);
    console.log(`OTU IDS: ${OTU_id}`);

    // get the top 10 labels for the plot
    console.log(`OTU_labels:${labels}`);

    // create layout variable to set plots layout
    var trace = {
        x: values,
        y: OTU_id,
        text: labels,
        marker: {
            color: 'blue'
        },
        type: 'bar',
        orientation: 'h',
    };
    let dataPlot = [trace];
    var layout = {
        title: 'Top 10 OTUs ',
        yaxis: {
            tickmode: 'linear'
        },
        margin: {
            l: 100,
            r: 100,
            t: 100,
            b: 30
        }
    };
    Plotly.newPlot('bar', dataPlot, layout);
    // set the layout for the bubble plot
    var trace1 = {
        x: ids,
        y: dataSamps,
        mode: 'markers',
        marker: {
            size: dataSamps,
            color: ids,
        },
        text: dataLabels
    };
    var layout1 = {
        xaxis: { title: 'OTU ID' },
        height: 600,
        width: 1000
    };
    let dataPlot1 = [trace1];
    Plotly.newPlot('bubble', dataPlot1, layout1)
});

function getPlots(id) {}

// create the function to get the necessary data

function getDemoData(id) {
    d3.json("samples.json").then((data) => {
        let metadata = data.metadata;
        // filter meta data info by id
        let result = metadata.filter(meta => meta.id.toString() === id)[0];
        // select demographic panel to put data.samples[0]
        let demoInfo = d3.select('#sample-metadata');
        demoInfo.html("");
        //get the necessary demographic data for id and append info to panel
        Object.entries(result).forEach(([key, value]) => {
            demoInfo.append('h5').text(`${key}: ${value}`);
        });
    });
}

function optionChanged(id) {
    getPlots(id)
    getDemoData(id)
}
// create the function for the initial data rendering
function init() {
    let dropdown = d3.select('#selDataset');
    d3.json('samples.json').then((data) => {
        data.names.forEach(function(name) {
            dropdown.append("option").text(name).property('value')
        });
        getPlots(data.names[0]);
        getDemoData(data.names[0]);
    });
}
init();


///****** use the D3 library to read in samples.json

// d3.json("samples.json").then(function(data) {
//     console.log(data);
// });

// d3.select("#selDataset").html("");
// Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual. Day3-Act#9

// function optionChanged(selectedID) {
//     console.log(selectedID)
// };

// let metadataInfo = data.metadata.forEach(item => {
//     d3.select("#selDataset").append('option').attr('value', item.id).text(item.id);
// });

// //Filter sample array for selected samples Day2-Act#5
// let idMetadata = data.metadata.filter(item => (item.id == selectedID));

// let idSamples = data.names.filter(item => parseInt(item.id) == selectedID);


// // Slice the first 10 objects for plotting
// let topTen = idData[0].slice(0, 10);

// // Reverse the array to accommodate Plotly's defaults
// let reversedData = slicedData.reverse();

// // Trace1 for the Greek Data
// let trace1 = {
//     x: reversedData.map(object => object.greekSearchResults),
//     y: reversedData.map(object => object.greekName),
//     text: reversedData.map(object => object.greekName),
//     name: "Greek",
//     type: "bar",
//     orientation: "h"
// };

// // Data array
// // `data` has already been defined, so we must choose a new name here:
// let traceData = [trace1];

// // Apply a title to the layout
// let layout = {
//     title: "Greek gods search results",
//     margin: {
//         l: 100,
//         r: 100,
//         t: 100,
//         b: 100
//     }
// };
// // Render the plot to the div tag with id "plot"
// // Note that we use `traceData` here, not `data`
// Plotly.newPlot("plot", traceData, layout);


// ***** STARTED NEW CODE *****
// Create an array of each country's numbers
// var sampleValues = Object.values(samples.names);
// var otuIds = Object.values(data.uk);
// var otuLables = Object.values(data.canada);

// // Create an array of music provider labels
// var labels = Object.keys(data.us);

// // Display the default plot
// function init() {
//     var data = [{
//         values: us,
//         labels: labels,
//         type: "pie"
//     }];

//     var layout = {
//         height: 600,
//         width: 800
//     };

//     Plotly.newPlot("pie", data, layout);
// }

// // On change to the DOM, call getData()
// d3.selectAll("#selDataset").on("change", getData);

// // Function called by DOM changes
// function getData() {
//     var dropdownMenu = d3.select("#selDataset");
//     // Assign the value of the dropdown menu option to a variable
//     var dataset = dropdownMenu.property("value");
//     // Initialize an empty array for the country's data
//     var data = [];

//     if (dataset == 'us') {
//         data = us;
//     } else if (dataset == 'uk') {
//         data = uk;
//     } else if (dataset == 'canada') {
//         data = canada;
//     }
//     // Call function to update the chart
//     updatePlotly(data);
// }

// // Update the restyled plot's values
// function updatePlotly(newdata) {
//     Plotly.restyle("pie", "values", [newdata]);
// }

// init();