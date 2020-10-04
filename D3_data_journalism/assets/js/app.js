// Define SVG area dimensions
var svgWidth = 960;
var svgHeight = 660;

// Define the chart's margins as an object
var chartMargin = {
    top: 30,
    right: 30,
    bottom: 30,
    left: 30
};

// Define dimensions of the chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// Select body, append SVG area to it, and set the dimensions
var svg = d3
    .select("body")
    .append("svg")
    .attr("height", svgHeight)
    .attr("width", svgWidth);

// Append a group to the SVG area and shift ('translate') it to the right and down to adhere
// to the margins set in the "chartMargin" object.
var chartGroup = svg.append("g")
    .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);


// Load data from data.csv
d3.csv("data.csv").then(function (journalData) {

    // Print the tvData
    console.log(journalData);

    // Cast the healthcare and poverty value to a number for each state
    journalData.forEach(function (state) {
        state.healthcare = +state.healthcare;
        state.poverty = +state.poverty;

    });

    // // Create code to build the bar chart using the tvData.
    // chartGroup.selectAll(".bar")
    //     .data(journalData)
    //     .enter()
    //     .append("rect")
    //     .classed("bar", true)
    //     .attr("width", d => barWidth)
    //     .attr("height", d => d.hours * scaleY)
    //     .attr("x", (d, i) => i * (barWidth + barSpacing))
    //     .attr("y", d => chartHeight - d.hours * scaleY);

}).catch(function (error) {
    console.log(error);
});