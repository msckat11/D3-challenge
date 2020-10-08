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
    .select("#scatter")
    .append("svg")
    .attr("height", svgHeight)
    .attr("width", svgWidth);

// Append a group to the SVG area and shift ('translate') it to the right and down to adhere
// to the margins set in the "chartMargin" object.
var chartGroup = svg.append("g")
    .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);


// Load data from data.csv
d3.csv("data.csv").then(function (journalData) {

    // // Print the tvData
    // console.log(journalData);

    // Step 1: Cast the healthcare and poverty value to a number for each state
    journalData.forEach(function (state) {
        state.healthcare = +state.healthcare;
        state.poverty = +state.poverty;
    });

    // Step 3: Create axis functions
    // ==============================
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // Step 4: Append Axes to the chart
    // ==============================
    chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);

    chartGroup.append("g")
        .call(leftAxis);

    // Step 5: Create Circles
    // ==============================
    var circlesGroup = chartGroup.selectAll("circle")
        .data(hairData)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(d.hair_length))
        .attr("cy", d => yLinearScale(d.num_hits))
        .attr("r", "15")
        .attr("fill", "pink")
        .attr("opacity", ".5");

}).catch(function (error) {
    console.log(error);
});